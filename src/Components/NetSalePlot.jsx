import React, { useState, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import { getNetSale } from "../Services/saleServices";
import LineGraph from "./SubComponents/LineGraph";
const { JSDOM } = require("jsdom");

const NetSalePlot = () => {
  const { window } = new JSDOM();

  const [graphDate, setGraphDate] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [predictionMonthValue, setPredictionMonth] = useState("1");
  const [previousMonthValue, setPreviousMonth] = useState("3");

  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    netSaleCalculation(previousMonthValue, predictionMonthValue);
  }, [previousMonthValue, predictionMonthValue]);

  let previousMonth = [
    {
      text: "1M",
      value: "1",
    },
    {
      text: "3M",
      value: "3",
    },
    {
      text: "12M",
      value: "12",
    },
    {
      text: "18M",
      value: "18",
    },
  ];

  let predictionMonth = [
    {
      text: "0M",
      value: "0",
    },
    {
      text: "1M",
      value: "1",
    },
    {
      text: "6M",
      value: "6",
    },
  ];

  const [minGraphNumber, setMinGraphNumber] = useState(0);
  const [maxGraphNumber, setMaxGraphNumber] = useState(3000);

  const [legendData1, setlegendData1] = useState("");
  const [legendData2, setlegendData2] = useState("");
  const [legendData3, setlegendData3] = useState("");

  const [predictionData, setPredictionData] = useState(null);

  let netSaleCalculation = async (previous, prediction) => {
    try {
      setShowProgress(true);
      let { data } = await getNetSale(previous, prediction);
      console.log(data);
      let predictionDate = moment(data.Prediction.Date).format("MM/DD/yyyy");

      let predictionObject = {
        date: predictionDate,
        value: data.Prediction.Value,
      };

      let indexOfDate = data.Date.indexOf(data.Last_week_dates[0]);

      let sampleArray = [];
      for (let i = 0; i < data.Date.length; i++) {
        sampleArray.push(null);
      }

      for (let i = 0; i < data.Last_week_data.length; i++) {
        sampleArray[indexOfDate + i] = data.Last_week_data[i];
      }

      setPredictionData(predictionObject);
      let date = data.Date.map((item) => {
        let dateValue = moment(item).format("MM/DD/yyyy");

        return dateValue;
      });

      setGraphDate(date);

      let index = date.indexOf(moment().format("MM/DD/yyyy"));

      let yesterday = moment().subtract(1, "days");

      let lastDayIndex = date.indexOf(moment(yesterday).format("MM/DD/yyyy"));

      let l1 = _.without(data.Data.Sales_3_Week_MA, "");

      let l2 = _.without(data.Data.Sales_3_Week_YoY_MA, "");
      let l3 = _.without(data.Data.Sales_9_Week_MA, "");

      setlegendData1(l1[l1.length - 1]);
      setlegendData2(l2[l2.length - 1]);
      setlegendData3(l3[l3.length - 1]);

      let newData = [
        {
          name: "Sales 3 Week MA ",
          data: data.Data.Sales_3_Week_MA,
          type: "line",
        },
        {
          name: "Sales 3 Week YoY MA",
          data: data.Data.Sales_3_Week_YoY_MA,
          type: "line",
        },
        {
          name: "Sales 9 Week MA",
          data: data.Data.Sales_9_Week_MA,
          type: "line",
        },
        {
          name: "Sales Last Week",
          data: sampleArray,
          type: "line",
        },
      ];

      let minNumber = Math.min(
        _(data.Data.Sales_3_Week_MA).chain().filter(_.isNumber).min().value(),
        _(data.Data.Sales_3_Week_YoY_MA)
          .chain()
          .filter(_.isNumber)
          .min()
          .value(),
        _(data.Data.Sales_9_Week_MA).chain().filter(_.isNumber).min().value(),
        _(data.Last_week_data).chain().filter(_.isNumber).min().value()
      );
      let maxNumber = Math.max(
        _(data.Data.Sales_3_Week_MA).chain().filter(_.isNumber).max().value(),
        _(data.Data.Sales_3_Week_YoY_MA)
          .chain()
          .filter(_.isNumber)
          .max()
          .value(),
        _(data.Data.Sales_9_Week_MA).chain().filter(_.isNumber).max().value(),
        _(data.Last_week_data).chain().filter(_.isNumber).max().value()
      );

      setMinGraphNumber(
        parseInt(minNumber) === 0
          ? parseInt(minNumber)
          : parseInt(minNumber) - 20
      );

      setMaxGraphNumber(parseInt(maxNumber) + 20);
      setGraphData(newData);
      setShowProgress(false);
    } catch (error) {
      console.log(error);
      setShowProgress(false);
    }
  };

  return (
    <div>
      <LineGraph
        previousMonth={previousMonth}
        predictionMonth={predictionMonth}
        graphDate={graphDate}
        graphData={graphData}
        predictionData={predictionData}
        colors={["#0E83AE", "#75D2EB", "#FF0000", "#00FF00"]}
        title="Net Sales"
        yAxisText="Sales"
        stroke={{
          width: [2, 1, 1, 2],
          curve: ["smooth", "smooth", "smooth", "smooth"],
          dashArray: [0, 5, 0, 0],
        }}
        progress={showProgress}
        setPrediction={(e) => setPredictionMonth(e)}
        setPrevious={(e) => setPreviousMonth(e)}
        min={parseInt(minGraphNumber)}
        max={parseInt(maxGraphNumber)}
        defaultPreviousText={previousMonthValue + "M"}
        defaultPreviousValue={previousMonthValue}
        defaultPredictionValue={predictionMonthValue}
        defaultPredictionText={predictionMonthValue + "M"}
        legendData={[
          {
            value1: "3W",
            value2: "$" + legendData1,
            color: "#0E83AE",
          },
          {
            value1: "9W",
            value2: "$" + legendData3,
            color: "#75D2EB",
          },
          {
            value1: "3W-YOY",
            value2: "$" + legendData2,
            color: "#FF0000",
          },
        ]}
      />
    </div>
  );
};

export default NetSalePlot;
