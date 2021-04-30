import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { sendEmail } from "../../Services/saleServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailButton = () => {
  const [loading, setloading] = useState(false);
  const SuccessMessage = () => toast.success("Email Sent!");
  const ErrorMessage = () => toast.error("Email Sending Failed...");

  let handelSendEmail = async () => {
    try {
      setloading(true);
      await sendEmail();
      setTimeout(() => {
        setloading(false);
        SuccessMessage();
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setloading(false);
        ErrorMessage();
      }, 2000);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <Button
        style={{
          background: "#9BBB59",
          color: "white",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
        startIcon={
          <CircularProgress
            style={{
              color: "white",
              width: "20px",
              height: "20px",
              display: loading ? "flex" : "none",
            }}
            disableShrink
          />
        }
        onClick={handelSendEmail}
      >
        Send Email
      </Button>
      <ToastContainer />
    </div>
  );
};

export default EmailButton;
