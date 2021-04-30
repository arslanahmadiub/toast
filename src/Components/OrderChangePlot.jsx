import React, { useState, useEffect } from "react";
import moment from "moment";
import { getOrderChange } from "../Services/saleServices";
import MixGraph from "./SubComponents/MixGraph";

const OrderChangePlot = () => {
  const [graphDate, setGraphDate] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const [previousMonthValue, setPreviousMonth] = useState("12");
  const [predictionMonthValue, setPredictionMonth] = useState("6");

  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    netSaleCalculation(previousMonthValue);
  }, [previousMonthValue]);

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

  const [minGraphNumber, setMinGraphNumber] = useState(0);
  const [maxGraphNumber, setMaxGraphNumber] = useState(3000);

  let netSaleCalculation = async (previous) => {
    try {
      setShowProgress(true);
      let { data } = await getOrderChange(previous);

      setShowProgress(false);

      let date = data.Date.map((item) => {
        let dateValue = moment(item).format("MM/DD/yyyy");

        return dateValue;
      });
      setGraphDate(date);

      let newData = [
        {
          name: "Sale 3 Week YoY Diff 7",
          data: data.Data.Orders_3Week_3_YoY_Diff_7,
          type: "bar",
        },
        {
          name: "Sale 9 Week YoY Diff 7",
          data: data.Data.Orders_9Week_3_YoY_Diff_7,
          type: "line",
        },
      ];
      setGraphData(newData);

      let maxNumber = Math.max(
        Math.max(...data.Data.Orders_3Week_3_YoY_Diff_7),
        Math.max(...data.Data.Orders_9Week_3_YoY_Diff_7)
      );
      let minNumber = Math.min(
        Math.min(...data.Data.Orders_3Week_3_YoY_Diff_7),
        Math.min(...data.Data.Orders_9Week_3_YoY_Diff_7)
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
      <MixGraph
        previousMonth={previousMonth}
        graphDate={graphDate}
        graphData={graphData}
        colors={["#0E83AE", "#FF0000"]}
        title="YOY Orders % Change"
        yAxisText="% of Orders"
        stroke={{
          width: [0.7, 1],
          curve: ["smooth", "smooth"],
        }}
        min={0}
        max={3000}
        progress={showProgress}
        setPrevious={(e) => setPreviousMonth(e)}
        setPrediction={(e) => setPredictionMonth(e)}
        min={parseInt(minGraphNumber)}
        max={parseInt(maxGraphNumber)}
        defaultPreviousText={previousMonthValue + "M"}
        defaultPreviousValue={previousMonthValue}
        defaultPredictionValue={predictionMonthValue}
        defaultPredictionText={predictionMonthValue + "M"}
        legendData={[
          {
            value1: "3W",
            value2: "-9%",
            color: "#0E83AE",
          },
          {
            value1: "9W",
            value2: "3%",
            color: "#FF0000",
          },
        ]}
      />
    </div>
  );
};

export default OrderChangePlot;
