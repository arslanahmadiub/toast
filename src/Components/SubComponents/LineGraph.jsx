import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const LineGraph = ({
  previousMonth,
  predictionMonth,
  graphDate,
  graphData,
  colors,
}) => {
  let buttonGroup = {
    border: "1px solid #9BBB59",
    color: "#9BBB59",
  };
  let buttonGroupActive = {
    border: "1px solid #9BBB59",
    color: "white",
    background: "#9BBB59",
  };

  let options = {
    chart: {
      height: 350,
      type: "line",
      foreColor: "#9BBB59",
      animations: {
        enabled: false,
      },
    },
    colors: colors,

    stroke: {
      width: [1, 1, 1],
      curve: ["smooth", "smooth", "stepline"],
      dashArray: [0, 0, 6],
    },
    xaxis: {
      type: "datetime",
      categories: graphDate,
      tickAmount: 20,
      labels: {
        formatter: function (value, timestamp, opts) {
          return opts.dateFormatter(new Date(timestamp), "dd MMM");
        },
      },
    },
    title: {
      text: "Net Sale",
      align: "center",
      style: {
        fontSize: "16px",
        color: "#9BBB59",
      },
    },

    markers: {
      size: 0,
    },
    yaxis: {
      min: 450,
      max: 2600,
      title: {
        text: "Sale",
      },
    },
  };

  const [activeButtonPreviousText, setActiveButtonPreviousText] = useState(
    "6M"
  );
  const [activeButtonPerductionText, setActiveButtonPerductionText] = useState(
    "6M"
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          paddingBottom: "2%",
        }}
      >
        <ButtonGroup>
          {previousMonth.map((item, index) => {
            return (
              <Button
                style={
                  activeButtonPreviousText === item.text
                    ? buttonGroupActive
                    : buttonGroup
                }
                onClick={() => setActiveButtonPreviousText(item.text)}
              >
                {item.text}
              </Button>
            );
          })}
        </ButtonGroup>
        <ButtonGroup>
          {predictionMonth.map((item, index) => {
            return (
              <Button
                style={
                  activeButtonPerductionText === item.text
                    ? buttonGroupActive
                    : buttonGroup
                }
                onClick={() => setActiveButtonPerductionText(item.text)}
              >
                {item.text}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>

      <ReactApexChart
        options={options}
        series={graphData}
        type="line"
        height={500}
      />
    </div>
  );
};

export default LineGraph;
