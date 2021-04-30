import React, { useState, useEffect } from "react";
import moment from "moment";
import { netSaleData } from "../DummyData/NetSaleDummyData";

import LineGraph from "./SubComponents/LineGraph";
import MixGraph from "./SubComponents/MixGraph";

const SaleChangePlot = () => {
  const [graphDate, setGraphDate] = useState([]);
  const [graphData, setGraphData] = useState([]);

  let getSaleData = () => {
    let date = netSaleData.Date.map((item) => {
      let dateValue = moment(item).format("MM/DD/yyyy");

      return dateValue;
    });
    setGraphDate(date);

    let newData = [
      {
        name: "Sale 3 Week MA ",
        data: netSaleData.Sales3WeekMA,
        type: "bar",
      },
      {
        name: "Sale 3 Week YoY MA",
        data: netSaleData.Sales3WeekYoYMA,
        type: "line",
      },
    ];
    setGraphData(newData);
  };

  useEffect(() => {
    getSaleData();
  }, []);
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

  return (
    <div>
      <MixGraph
        previousMonth={previousMonth}
        graphDate={graphDate}
        graphData={graphData}
        colors={["#0E83AE", "#FF0000"]}
        title="Sale Change Plot"
        yAxisText="% of Sales"
        stroke={{
          width: [1, 1],
          curve: ["smooth", "smooth"],
        }}
        min={0}
        max={3000}
      />
    </div>
  );
};

export default SaleChangePlot;
