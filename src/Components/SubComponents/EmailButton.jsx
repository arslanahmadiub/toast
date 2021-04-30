import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const EmailButton = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <Button
        style={{ background: "#9BBB59", color: "white" }}
        startIcon={
          <CircularProgress
            style={{
              color: "white",
              width: "20px",
              height: "20px",
              display: "none",
            }}
            disableShrink
          />
        }
      >
        Send Email
      </Button>
    </div>
  );
};

export default EmailButton;
