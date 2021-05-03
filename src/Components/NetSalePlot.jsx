import React, { useState, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import { getNetSale } from "../Services/saleServices";
import LineGraph from "./SubComponents/LineGraph";

const NetSalePlot = () => {
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
  let netSaleCalculation = async (previous, prediction) => {
    try {
      setShowProgress(true);
      let { data } = await getNetSale(previous, prediction);
      setShowProgress(false);

      let date = data.Date.map((item) => {
        let dateValue = moment(item).format("MM/DD/yyyy");

        return dateValue;
      });
      setGraphDate(date);

      let index = date.indexOf(moment().format("MM/DD/yyyy"));

      setlegendData1(data.Data.Sales_3_Week_MA[index]);
      setlegendData2(data.Data.Sales_3_Week_YoY_MA[index]);
      setlegendData3(data.Data.Sales_9_Week_MA[index]);

      let newData = [
        {
          name: "Sale 3 Week MA ",
          data: data.Data.Sales_3_Week_MA,
          type: "line",
        },
        {
          name: "Sale 3 Week YoY MA",
          data: data.Data.Sales_3_Week_YoY_MA,
          type: "line",
        },
        {
          name: "Sale 9 Week MA",
          data: data.Data.Sales_9_Week_MA,
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
        _(data.Data.Sales_9_Week_MA).chain().filter(_.isNumber).min().value()
      );
      let maxNumber = Math.max(
        _(data.Data.Sales_3_Week_MA).chain().filter(_.isNumber).max().value(),
        _(data.Data.Sales_3_Week_YoY_MA)
          .chain()
          .filter(_.isNumber)
          .max()
          .value(),
        _(data.Data.Sales_9_Week_MA).chain().filter(_.isNumber).max().value()
      );

      setMinGraphNumber(
        parseInt(minNumber) === 0
          ? parseInt(minNumber)
          : parseInt(minNumber) - 20
      );

      setMaxGraphNumber(parseInt(maxNumber) + 20);
      setGraphData(newData);
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
        colors={["#0E83AE", "#75D2EB", "#FF0000"]}
        title="Net Sales"
        yAxisText="Sales"
        stroke={{
          width: [2, 1, 1],
          curve: ["smooth", "smooth", "smooth"],
          dashArray: [0, 5, 0],
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
