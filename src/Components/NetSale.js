import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import ReactApexChart from "react-apexcharts";
import { netSaleData, netSaleChange } from "../DummyData/NetSaleDummyData";
import moment from "moment";
import { getNetSale } from "../Services/saleServices";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const NetSale = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [graphDate, setGraphDate] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [graphDateChange, setGraphDateChange] = useState([]);
  const [graphDataChange, setGraphDataChange] = useState([]);
  const [buttonIndex, setButtonIndex] = useState(2);

  let getSaleData = async (timeFrame, numberOfMonth) => {
    try {
      setOpen(true);
      let { data } = await getNetSale(timeFrame, numberOfMonth);
      setOpen(false);
      if (data.Success) {
        let date = data.Date.map((item) => {
          let dateValue = moment(item).format("MM/DD/yyyy");

          return dateValue;
        });
        setGraphDate(date);

        let newData = [
          {
            name: "Sale 3 Week MA ",
            data: data.Sales_3_Week_MA,
          },
          {
            name: "Sale 3 Week YoY MA",
            data: data.Sales_3_Week_YoY_MA,
          },
          {
            name: "Sale 9 Week MA",
            data: data.Sales_9_Week_MA,
          },
        ];
        setGraphData(newData);
      }
    } catch (error) {
      setOpen(false);
    }
  };

  let convertDate = () => {
    let fullData = netSaleData.Date;
    let date = fullData.map((item) => {
      let dateValue = moment(item).format("MM/DD/yyyy");

      return dateValue;
    });
    setGraphDate(date);
  };

  let convertDateChange = () => {
    let fullData = netSaleChange.Date;
    let date = fullData.map((item) => {
      let dateValue = moment(item).format("MM/DD/yyyy");

      return dateValue;
    });
    setGraphDateChange(date);
  };

  let convertData = () => {
    let fullData = netSaleData.Sales3WeekYoYMA;
    let fullData2 = netSaleData.Sales9WeekMA;
    let fullData3 = netSaleData.Sales3WeekMA;

    // let data = fullData.filter((item) => {
    //   return !isNaN(item);
    // });

    // let data2 = fullData2.filter((item) => {
    //   return !isNaN(item);
    // });

    // let data3 = fullData3.filter((item) => {
    //   return !isNaN(item);
    // });

    let newData = [
      {
        name: "Sale 3 Week ",
        data: fullData3,
      },
      {
        name: "Sale 3 Week Yo Ma",
        data: fullData,
      },
      {
        name: "Sale 9 Week",
        data: fullData2,
      },
    ];
    setGraphData(newData);
  };

  let converDataChange = () => {
    let fullData = netSaleChange.Sales9Week3YoYDiff7;
    let fullData2 = netSaleChange.Sales3Week33YoYDiff7;

    // let data = fullData.filter((item) => {
    //   return !isNaN(item);
    // });

    // let data2 = fullData2.filter((item) => {
    //   return !isNaN(item);
    // });

    // let data3 = fullData3.filter((item) => {
    //   return !isNaN(item);
    // });

    let newData = [
      {
        name: "Sale Change 9 Week",
        type: "line",

        data: fullData,
      },
      {
        name: "Sale Change 3 Week",
        type: "column",
        data: fullData2,
      },
    ];
    setGraphDataChange(newData);
  };

  useEffect(() => {
    // convertDate();
    // convertData();
    // convertDateChange();
    // converDataChange();
    if (buttonIndex === 1) {
      getSaleData(3, 3);
    } else if (buttonIndex === 2) {
      getSaleData(6, 3);
    } else if (buttonIndex === 3) {
      getSaleData(12, 3);
    } else if (buttonIndex === 4) {
      getSaleData(18, 3);
    }
  }, [buttonIndex]);

  let options = {
    chart: {
      height: 350,
      type: "line",
      animations: {
        enabled: false,

        animateGradually: {
          enabled: false,
        },
        dynamicAnimation: {
          enabled: false,
          speed: 3000,
        },
      },
    },
    colors: ["#e5ff00", "#12db00", "#ff00d0"],

    stroke: {
      width: 5,
      curve: "smooth",
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
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
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

  let optionsChange = {
    chart: {
      height: 350,
      type: "line",
      animations: {
        enabled: false,
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: graphDateChange,
      tickAmount: 10,
      labels: {
        formatter: function (value, timestamp, opts) {
          return opts.dateFormatter(new Date(timestamp), "dd MMM");
        },
      },
    },
    title: {
      text: "Net Sale Change",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    markers: {
      size: 0,
    },
    yaxis: {
      min: 0,
      max: 100,
      title: {
        text: "Sale Change",
      },
    },
  };

  let style = {
    background: "#1976D2",
    color: "white",
  };

  return (
    <Grid container>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button
            style={buttonIndex === 1 ? style : null}
            onClick={() => setButtonIndex(1)}
          >
            Three Month
          </Button>
          <Button
            style={buttonIndex === 2 ? style : null}
            onClick={() => setButtonIndex(2)}
          >
            Six Month
          </Button>
          <Button
            style={buttonIndex === 3 ? style : null}
            onClick={() => setButtonIndex(3)}
          >
            One Year
          </Button>
          <Button
            style={buttonIndex === 4 ? style : null}
            onClick={() => setButtonIndex(4)}
          >
            One and Half Year
          </Button>
        </ButtonGroup>
        <div style={{ position: "relative" }}>
          <div>
            <ReactApexChart
              options={options}
              series={graphData}
              type="line"
              height={500}
            />
          </div>
          <div style={{ position: "absolute", top: "40%", left: "50%" }}>
            <CircularProgress color="inherit" />
          </div>
        </div>
        <br />
        <br />

        <ReactApexChart
          options={optionsChange}
          series={graphDataChange}
          type="line"
          height={500}
        />
      </Grid>
    </Grid>
  );
};

export default NetSale;
