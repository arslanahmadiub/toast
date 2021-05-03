import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import CircularProgressGraph from "./CircularProgressGraph";

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

  const [activeButtonPreviousText, setActiveButtonPreviousText] = useState("");
  const [activeButtonPreviousValue, setActiveButtonPreviousValue] = useState(
    ""
  );
  const [activeButtonPerductionText, setActiveButtonPerductionText] = useState(
    ""
  );
  const [
    activeButtonPerductionValue,
    setActiveButtonPerductionValue,
  ] = useState("");

  useEffect(() => {
    setActiveButtonPerductionText(props.defaultPredictionText);
    setActiveButtonPerductionValue(props.defaultPredictionValue);
    setActiveButtonPreviousValue(props.defaultPreviousValue);
    setActiveButtonPreviousText(props.defaultPreviousText);
  }, []);

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
      {/* <CircularProgress
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          color: "#9BBB59",
          display: progress ? "flex" : "none",
        }}
      /> */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          display: progress ? "flex" : "none",
        }}
      >
        <CircularProgressGraph />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          position: "absolute",
          top: "85px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            paddingLeft: "30%",
            paddingRight: "30%",
          }}
        >
          {props.legendData &&
            props.legendData.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p style={{ color: item.color, fontSize: "11px" }}>
                    {item.value1}
                  </p>
                  <p style={{ color: item.color, fontSize: "11px" }}>
                    {item.value2}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default LineGraph;
