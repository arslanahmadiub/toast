import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";

const LineGraph = ({
  previousMonth,
  predictionMonth,
  graphDate,
  graphData,
  colors,
  title,
  yAxisText,
  stroke,
  min,
  max,
  progress,
  ...props
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

    stroke: stroke,
    xaxis: {
      type: "datetime",
      categories: graphDate,
      tickAmount: 10,
      labels: {
        formatter: function (value, timestamp, opts) {
          return opts.dateFormatter(new Date(timestamp), "dd MMM yyyy");
        },
      },
    },
    title: {
      text: title,
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
      min: min,
      max: max,
      title: {
        text: yAxisText,
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
  };

  const [activeButtonPreviousText, setActiveButtonPreviousText] = useState(
    "6M"
  );
  const [activeButtonPreviousValue, setActiveButtonPreviousValue] = useState(
    "6"
  );
  const [activeButtonPerductionText, setActiveButtonPerductionText] = useState(
    "6M"
  );
  const [
    activeButtonPerductionValue,
    setActiveButtonPerductionValue,
  ] = useState("6");

  useEffect(() => {
    props.setPrevious(activeButtonPreviousValue);
  }, [activeButtonPreviousValue]);

  useEffect(() => {
    props.setPrediction(activeButtonPerductionValue);
  }, [activeButtonPerductionValue]);

  let handelPreviousMonth = (text, value) => {
    setActiveButtonPreviousText(text);
    setActiveButtonPreviousValue(value);
  };
  let handelPreductionMonth = (text, value) => {
    setActiveButtonPerductionText(text);
    setActiveButtonPerductionValue(value);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          paddingBottom: "2%",
        }}
      >
        <ButtonGroup>
          {previousMonth &&
            previousMonth.map((item, index) => {
              return (
                <Button
                  style={
                    activeButtonPreviousText === item.text
                      ? buttonGroupActive
                      : buttonGroup
                  }
                  onClick={() => handelPreviousMonth(item.text, item.value)}
                  key={index}
                >
                  {item.text}
                </Button>
              );
            })}
        </ButtonGroup>
        <ButtonGroup>
          {predictionMonth &&
            predictionMonth.map((item, index) => {
              return (
                <Button
                  style={
                    activeButtonPerductionText === item.text
                      ? buttonGroupActive
                      : buttonGroup
                  }
                  onClick={() => handelPreductionMonth(item.text, item.value)}
                  key={index}
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
      <CircularProgress
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          color: "#9BBB59",
          display: progress ? "flex" : "none",
        }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            width: "25%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ color: colors[0] }}>3W</p>
            <p style={{ color: colors[0] }}>$2134</p>
          </div>
          <div>
            <p style={{ color: colors[1] }}>9W</p>
            <p style={{ color: colors[1] }}>$1876</p>
          </div>
          <div>
            <p style={{ color: colors[2] }}>3W-YOY</p>
            <p style={{ color: colors[2] }}>$1577</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineGraph;
