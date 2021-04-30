import React from "react";
import NetSalePlot from "./Components/NetSalePlot";
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
        <SaleChangePlot />
      </div>
    </>
  );
};

export default Main;
