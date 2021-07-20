// import { Button, Grid } from "@material-ui/core";
// import React from "react";
// import { CheckingContext } from "../../../context/CheckingContext";
// import "./BarCode.scss";

// function BarCodePrint() {
//   const { state, dispatch } = React.useContext(CheckingContext);

//   const printDiv = (divName) => {
//     var printContents = document.getElementById(divName).innerHTML;
//     var originalContents = document.body.innerHTML;
//     document.body.innerHTML = printContents;
//     window.print();
//     document.body.innerHTML = originalContents;
//   };

//   const btn_style = {
//     backgroundColor: "#0e4a7b",
//     color: "#FFF",
//     whiteSpace: "nowrap",
//     width: "100%",
//     height: "fit-content",
//     border: "1px solid #0e4a7b",
//   };
//   const BarCodeStyle = {
//     display: "flex",
//     flexDirection: "column",
//     textAlign: "center",
//     margin: "20px",
//     padding: "20px",
//   };

//   return (
//     <div className="print_page">
//       <Button
//         variant="contained"
//         style={btn_style}
//         id="no-print"
//         onClick={() => printDiv("printBarCode")}
//       >
//         PRINT
//       </Button>
//       <div id="printBarCode" style={BarCodeStyle}>
//         {state.bagDataPrint.data.map((item, key) => (
//           <div className="page_printBreack" key={key}>
//             <img key={item.bagId} src={item.barcode} alt={item.bagId} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BarCodePrint;
import { Button, Grid } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { CheckingContext } from "../../../context/CheckingContext";
import "./BarCode.scss";

function BarCodePrint() {
  const { state, dispatch } = React.useContext(CheckingContext);

  const printDiv = (divName) => {
    var panel = document.getElementById(divName);

    var printWindow = window.open();

    printWindow.document.write(`<html><head>
    <style >
    *{
      padding: 0;
    margin: 0;
    box-sizing: border-box;
    }
    p{
      font-size:18px;
    }
  
    @page {
  size: 10cm 5cm;
  margin:0;
}
</style>
    `);

    printWindow.document.write(
      "</head><body style=display:flex;flex-wrap:wrap;height:100% >"
    );

    printWindow.document.write(panel.innerHTML);

    printWindow.document.write("</body></html>");
    console.log(printWindow.document);
    printWindow.document.close();

    setTimeout(function() {
      printWindow.print();
      // printWindow.close();
    }, 500);

    return false;
  };

  const btn_style = {
    backgroundColor: "#0e4a7b",
    color: "#FFF",
    whiteSpace: "nowrap",
    width: "100%",
    height: "fit-content",
    border: "1px solid #0e4a7b",
  };
  const BarCodeStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    margin: "20px",
    padding: "20px",
    pageBreakAfter: "always",
    // width: "100%",
    // height: "100%",
  };

  return (
    <div className="print_page">
      <Button
        id="no-print"
        variant="contained"
        style={btn_style}
        id="no-print"
        onClick={() => printDiv("printBarCode")}
      >
        PRINT
      </Button>
      <div
        container
        item
        id="printBarCode"
        className="printBarCodes"
        style={BarCodeStyle}
        // style={{ width: "auto", height: "auto" }}
      >
        {state.bagDataPrint.data.map((item, key) => (
          <div
            // style={{ }}
            // className="page_printBreack"
            style={{
              pageBreakAfter: key % 2 === 0 ? "auto" : "always",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              height: "100%",
              margin: "auto",
              boxSizing: "border-box",
              // border: "1px solid red",
              padding: "12px",
            }}
            key={key}
          >
            <img
              style={{ width: "90%" }}
              key={item.bagId}
              src={item.barcode}
              alt={item.bagId}
            />
            <div
              style={{
                width: "90%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: "18px" }}>{item.tableId}</p>
                {/* <p style={{ margin: 0, fontSize: "12px" }}>{item.bagId}</p> */}
                <p style={{ margin: 0, fontSize: "18px" }}>
                  {moment(item.date).format("DD-MM-YYYY")}
                </p>
                {/* <p style={{ margin: 0, fontSize: "12px" }}>Time {item.time}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarCodePrint;
