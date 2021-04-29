import React, { useState, useEffect } from "react";
import moment from "moment";
import { netSaleData } from "../DummyData/NetSaleDummyData";

import LineGraph from "./SubComponents/LineGraph";

const NetSalePlot = () => {
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
        type: "line",
      },
      {
        name: "Sale 3 Week YoY MA",
        data: netSaleData.Sales3WeekYoYMA,
        type: "line",
      },
      {
        name: "Sale 9 Week MA",
        data: netSaleData.Sales9WeekMA,
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
      <LineGraph
        previousMonth={previousMonth}
        predictionMonth={predictionMonth}
        graphDate={graphDate}
        graphData={graphData}
        colors={["#0E83AE", "#75D2EB", "#FF0000"]}
      />
    </div>
  );
};

export default NetSalePlot;
