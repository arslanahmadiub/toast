import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import ReactApexChart from "react-apexcharts";
import { netSaleData } from "../DummyData/NetSaleDummyData";
import moment from "moment";

const NetSale = () => {
  const [graphDate, setGraphDate] = useState([]);
  const [graphData, setGraphData] = useState([]);

  let convertDate = () => {
    let fullData = netSaleData.Date;
    let date = fullData.map((item) => {
      let dateValue = moment(item).format("MM/DD/yyyy");

      return dateValue;
    });
    setGraphDate(date);
  };

  let convertData = () => {
    let fullData = netSaleData.Sales3WeekYoYMA;
    let data = fullData.map((item) => {
      return item;
    });

    let fullData2 = netSaleData.Sales9WeekMA;
    let data2 = fullData2.map((item) => {
      return item;
    });

    let fullData3 = netSaleData.Sales3WeekMA;
    let data3 = fullData3.map((item) => {
      return item;
    });

    let newData = [
      {
        name: "Sale 3 Week ",
        data: data3,
      },
      {
        name: "Sale 3 Week Yo Ma",
        data: data,
      },
      {
        name: "Sale 9 Week",
        data: data2,
      },
    ];
    setGraphData(newData);
  };

  useEffect(() => {
    convertDate();
    convertData();
  }, []);

  let options = {
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: 7,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: graphDate,
      tickAmount: 10,
      labels: {
        formatter: function (value, timestamp, opts) {
          return opts.dateFormatter(new Date(timestamp), "dd MMM");
        },
      },
    },
    title: {
      text: "Net Sale",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#00a329", "#0022ff", "#ff8800"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    markers: {
      size: 4,
      colors: ["#FFA41B"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    yaxis: {
      min: 1000,
      max: 1800,
      title: {
        text: "Sale",
      },
    },
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <h1>Net Sale</h1>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <ReactApexChart
          options={options}
          series={graphData}
          type="line"
          height={500}
        />
      </Grid>
    </Grid>
  );
};

export default NetSale;
