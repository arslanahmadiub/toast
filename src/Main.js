import React from "react";
import DailyOrdersPlot from "./Components/DailyOrdersPlot";
import FridaysPlot from "./Components/FridaysPlot";
import LaborPlot from "./Components/LaborPlot";
import NetSalePlot from "./Components/NetSalePlot";
import OrderChangePlot from "./Components/OrderChangePlot";
import SaleChangePlot from "./Components/SaleChangePlot";
import EmailButton from "./Components/SubComponents/EmailButton";

const Main = () => {
  return (
    <>
      <EmailButton />
      <div className="main-home">
        <br />
        <NetSalePlot />
        <br />
        <DailyOrdersPlot />
        <br />
        <SaleChangePlot />
        <br />
        <OrderChangePlot />
        <br />
        <FridaysPlot />
        <br />
        <LaborPlot />
      </div>
    </>
  );
};

export default Main;
