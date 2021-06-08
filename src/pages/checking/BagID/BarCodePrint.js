import { Button, Grid } from "@material-ui/core";
import React from "react";
import { CheckingContext } from "../../../context/CheckingContext";
import "./BarCode.scss";

function BarCodePrint() {
  const { state, dispatch } = React.useContext(CheckingContext);

  const printDiv = (divName) => {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const btn_style =
  {
    backgroundColor: "#0e4a7b",
    color: "#FFF",
    whiteSpace: "nowrap",
    width: "100%",
    height: "fit-content",
    border: "1px solid #0e4a7b",
  }
  const BarCodeStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: 'center',
    margin: '20px',
    padding: '20px'
  }

  return (
    <div className="print_page">
      <Button variant="contained" style={btn_style} id="no-print" onClick={() => printDiv("printBarCode")}>
        PRINT
       </Button>
      <div
        id="printBarCode"
        style={BarCodeStyle}
      >
        {state.bagDataPrint.data.map((item, key) => (
          <div className="page_printBreack" key={key}>
            <img
              key={item.bagId}
              src={item.barcode}
              alt={item.bagId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarCodePrint;
