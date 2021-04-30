import React, { useState, useEffect } from "react";
import moment from "moment";
import { getDailyOrder } from "../Services/saleServices";
import LineGraph from "./SubComponents/LineGraph";

const DailyOrdersPlot = () => {
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
      value: "6 ",
    },
  ];

  const [minGraphNumber, setMinGraphNumber] = useState(0);
  const [maxGraphNumber, setMaxGraphNumber] = useState(3000);

  let netSaleCalculation = async (previous, prediction) => {
    try {
      setShowProgress(true);
      let { data } = await getDailyOrder(previous, prediction);

      setShowProgress(false);

      let date = data.Date.map((item) => {
        let dateValue = moment(item).format("MM/DD/yyyy");

        return dateValue;
      });
      setGraphDate(date);

      let newData = [
        {
          name: "Orders 3 Week MA ",
          data: data.Data.Orders_3_Week_MA,
          type: "line",
        },
        {
          name: "Orders 3 Week YoY MA",
          data: data.Data.Orders_3_Week_YoY_MA,
          type: "line",
        },
        {
          name: "Orders 9 Week MA",
          data: data.Data.Orders_9_Week_MA,
          type: "line",
        },
      ];
      setGraphData(newData);

      let maxNumber = Math.max(
        Math.max(...data.Data.Orders_3_Week_MA),
        Math.max(...data.Data.Orders_3_Week_YoY_MA),
        Math.max(...data.Data.Orders_9_Week_MA)
      );
      let minNumber = Math.min(
        Math.min(...data.Data.Orders_3_Week_MA),
        Math.min(...data.Data.Orders_3_Week_YoY_MA),
        Math.min(...data.Data.Orders_9_Week_MA)
      );
      setMinGraphNumber(
        parseInt(minNumber) === 0
          ? parseInt(minNumber)
          : parseInt(minNumber) - 10
      );

      setMaxGraphNumber(parseInt(maxNumber) + 10);
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
        title="Daily Orders"
        yAxisText="Orders"
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
            value2: "104",
            color: "#0E83AE",
          },
          {
            value1: "9W",
            value2: "97",
            color: "#FF0000",
          },
        ]}
      />
    </div>
  );
};

export default DailyOrdersPlot;
