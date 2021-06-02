import { Button, Grid } from "@material-ui/core";
import React from "react";
import { CheckingContext } from "../../../context/CheckingContext";
import "./BarCode.scss";

function BarCodePrint() {
  const { state, dispatch } = React.useContext(CheckingContext);
  const print = React.useRef(null);

  const printDiv = () => {
    var printContents = document.getElementById(print.current.id).innerHTML;
    console.log(printContents);
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };

  return (
    <div container style={{ padding: "24px" }}>
      <div
        style={{ display: "flex", flexDirection: "column", padding: "1.5rem" }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#0e4a7b",
            color: "#FFF",
            whiteSpace: "nowrap",
            width: "100%",
            height: "fit-content",
            border: "1px solid #0e4a7b",
          }}
          id="no-print"
          onClick={() => window.print()}
          //   onClick={() => printDiv("printBarCode")}
          //   onClick={() => history.push("/checking/print")}
        >
          PRINT
        </Button>
      </div>
      <div
        container
        item
        id="printBarCode"
        ref={print}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "377px",
          height: "188px",
        }}
      >
        {state.bagDataPrint.data.map((item) => (
          <div style={{ width: "377px", height: "auto", marginBottom: "32px" }}>
            <img
              style={{ width: "100%", height: "188px" }}
              key={item.bagId}
              src={item.barcode}
              alt={item.bagId}
            />
            <p style={{ pageBreakBefore: "always" }}></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarCodePrint;
