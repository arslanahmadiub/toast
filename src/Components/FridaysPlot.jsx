import React, { useState, useEffect } from "react";
import moment from "moment";
import { getWeekSale } from "../Services/saleServices";
import LineGraph from "./SubComponents/LineGraph";
import _ from "lodash";

const FridaysPlot = () => {
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

  const [day, setDay] = useState("");

  let netSaleCalculation = async (previous, prediction) => {
    try {
      setShowProgress(true);
      let { data } = await getWeekSale(previous, prediction);
      setDay(data.WeekDay);

      let date = data.Date.map((item) => {
        let dateValue = moment(item).format("MM/DD/yyyy");

        return dateValue;
      });
      setGraphDate(date);

      let index = date.indexOf(moment().format("MM/DD/yyyy"));

      let l1 = _.without(data.Data.Gross_Sales, "");

      let l2 = _.without(data.Data.Sales_7_Day_YoY_MA, "");
      let l3 = _.without(data.Data.Sales_7_Day_MA, "");

      setlegendData1(l1[l1.length - 1]);
      setlegendData2(l2[l2.length - 1]);

      setlegendData3(l3[l3.length - 1]);

      let newData = [
        {
          name: "Gross Sales",
          data: data.Data.Gross_Sales,
          type: "line",
        },
        {
          name: "Sale 7 Days YoY MA",
          data: data.Data.Sales_7_Day_YoY_MA,
          type: "line",
        },
        {
          name: "Sale 7 Days MA",
          data: data.Data.Sales_7_Day_MA,
          type: "line",
        },
      ];

      let maxNumber = Math.max(
        _(data.Data.Gross_Sales).chain().filter(_.isNumber).max().value(),
        _(data.Data.Sales_7_Day_YoY_MA)
          .chain()
          .filter(_.isNumber)
          .max()
          .value(),
        _(data.Data.Sales_7_Day_MA).chain().filter(_.isNumber).max().value()
      );

      let minNumber = Math.min(
        _(data.Data.Gross_Sales).chain().filter(_.isNumber).min().value(),
        _(data.Data.Sales_7_Day_YoY_MA)
          .chain()
          .filter(_.isNumber)
          .min()
          .value(),
        _(data.Data.Sales_7_Day_MA).chain().filter(_.isNumber).min().value()
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
        colors={["#0E83AE", "#75D2EB", "#FF0000"]}
        title={`"DOW Sales Averages" ${day}`}
        yAxisText="Sales"
        stroke={{
          width: [2, 1, 1],
          curve: ["smooth", "smooth", "smooth"],
          dashArray: [3, 5, 0],
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
            value1: "Gross Sales",
            value2: "$" + legendData1,
            color: "#0E83AE",
          },
          {
            value1: "7D-YOY",
            value2: "$" + legendData2,
            color: "#75D2EB",
          },
          {
            value1: "7D",
            value2: "$" + legendData3,
            color: "#FF0000",
          },
        ]}
      />
    </div>
  );
};

export default FridaysPlot;
