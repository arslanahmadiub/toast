import React, { useState, useEffect } from "react";
import moment from "moment";
import { getLabor } from "../Services/saleServices";
import LineGraph from "./SubComponents/LineGraph";
import _ from "lodash";

const LaborPlot = () => {
  const [graphDate, setGraphDate] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [predictionMonthValue, setPredictionMonth] = useState("6");
  const [previousMonthValue, setPreviousMonth] = useState("1");

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

  const [legendData1, setlegendData1] = useState("");
  const [legendData2, setlegendData2] = useState("");
  const [legendData3, setlegendData3] = useState("");

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

      let index = date.indexOf(moment().format("MM/DD/yyyy"));

      setlegendData1(data.Data.Labor_1Week_MA[index]);
      setlegendData2(data.Data.Labor_yoy[index]);
      setlegendData3(data.Data.Labor_5Week_MA[index]);

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

      let minNumber = Math.min(
        _(data.Data.Labor_1Week_MA).chain().filter(_.isNumber).min().value(),
        _(data.Data.Labor_yoy).chain().filter(_.isNumber).min().value(),
        _(data.Data.Labor_5Week_MA).chain().filter(_.isNumber).min().value()
      );
      let maxNumber = Math.max(
        _(data.Data.Labor_1Week_MA).chain().filter(_.isNumber).max().value(),
        _(data.Data.Labor_yoy).chain().filter(_.isNumber).max().value(),
        _(data.Data.Labor_5Week_MA).chain().filter(_.isNumber).max().value()
      );

      setMinGraphNumber(
        parseInt(minNumber) === 0
          ? parseInt(minNumber)
          : parseInt(minNumber) - 2
      );

      setMaxGraphNumber(parseInt(maxNumber) + 2);
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
        title="Labor Averages"
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
        defaultPreviousText={previousMonthValue + "M"}
        defaultPreviousValue={previousMonthValue}
        defaultPredictionValue={predictionMonthValue}
        defaultPredictionText={predictionMonthValue + "M"}
        legendData={[
          {
            value1: "1W",
            value2: legendData1 + "%",
            color: "#0E83AE",
          },
          {
            value1: "5W-YOY ",
            value2: legendData2 + "%",
            color: "#75D2EB",
          },
          {
            value1: "5W",
            value2: legendData3 + "%",
            color: "#FF0000",
          },
        ]}
      />
    </div>
  );
};

export default LaborPlot;
