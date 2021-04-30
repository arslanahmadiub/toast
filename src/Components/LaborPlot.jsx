import React, { useState, useEffect } from "react";
import moment from "moment";
import { getLabor } from "../Services/saleServices";
import LineGraph from "./SubComponents/LineGraph";

const LaborPlot = () => {
  const [graphDate, setGraphDate] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [predictionMonthValue, setPredictionMonth] = useState("6");
  const [previousMonthValue, setPreviousMonth] = useState("6");

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
      text: "6M",
      value: "6",
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
      text: "1M",
      value: "1",
    },
    {
      text: "6M",
      value: "6",
    },
    {
      text: "12M",
      value: "12",
    },
  ];

  const [minGraphNumber, setMinGraphNumber] = useState(0);
  const [maxGraphNumber, setMaxGraphNumber] = useState(3000);

  let netSaleCalculation = async (previous) => {
    try {
      setShowProgress(true);
      let { data } = await getLabor(previous);
      setShowProgress(false);

      let date = data.Date.map((item) => {
        let dateValue = moment(item).format("MM/DD/yyyy");

        return dateValue;
      });
      setGraphDate(date);

      let newData = [
        {
          name: "Labor 1 Week MA",
          data: data.Data.Labor_1Week_MA,
          type: "line",
        },
        {
          name: "Labor 5 Week YoY",
          data: data.Data.Labor_yoy,
          type: "line",
        },
        {
          name: "Labor 5 Week MA",
          data: data.Data.Labor_5Week_MA,
          type: "line",
        },
      ];
      let maxNumber = Math.max(
        Math.max(...data.Data.Labor_1Week_MA),
        Math.max(...data.Data.Labor_yoy),
        Math.max(...data.Data.Labor_5Week_MA)
      );
      let minNumber = Math.min(
        Math.min(...data.Data.Labor_1Week_MA),
        Math.min(...data.Data.Labor_yoy),
        Math.min(...data.Data.Labor_5Week_MA)
      );
      setMinGraphNumber(
        parseInt(minNumber) === 0
          ? parseInt(minNumber)
          : parseInt(minNumber) - 10
      );

      setMaxGraphNumber(parseInt(maxNumber) + 10);
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
        graphDate={graphDate}
        graphData={graphData}
        colors={["#0E83AE", "#75D2EB", "#FF0000"]}
        title="Labor"
        yAxisText="% of Labor"
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
      />
    </div>
  );
};

export default LaborPlot;
