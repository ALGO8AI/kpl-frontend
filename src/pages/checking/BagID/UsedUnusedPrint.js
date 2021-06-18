// // import { Button, Grid } from "@material-ui/core";
// // import React from "react";
// // import { CheckingContext } from "../../../context/CheckingContext";
// // import "./BarCode.scss";

// // function UsedUnusedPrint() {
// //   const { state, dispatch } = React.useContext(CheckingContext);

// //   const printDiv = (divName) => {
// //     var printContents = document.getElementById(divName).innerHTML;
// //     var originalContents = document.body.innerHTML;
// //     document.body.innerHTML = printContents;
// //     window.print();
// //     document.body.innerHTML = originalContents;
// //   };

// //   const btn_style = {
// //     backgroundColor: "#0e4a7b",
// //     color: "#FFF",
// //     whiteSpace: "nowrap",
// //     width: "100%",
// //     height: "fit-content",
// //     border: "1px solid #0e4a7b",
// //   };
// //   const BarCodeStyle = {
// //     display: "flex",
// //     flexDirection: "column",
// //     textAlign: "center",
// //     margin: "20px",
// //     padding: "20px",
// //   };

// //   return (
// //     <div className="print_page">
// //       <Button
// //         variant="contained"
// //         style={btn_style}
// //         id="no-print"
// //         onClick={() => printDiv("printBarCode")}
// //       >
// //         PRINT
// //       </Button>
// //       <div id="printBarCode" style={BarCodeStyle}>
// //         {state.bagDataPrint.data.map((item, key) => (
// //           <div className="page_printBreack" key={key}>
// //             <img key={item.bagId} src={item.barcode} alt={item.bagId} />
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default UsedUnusedPrint;
// import { Button, Grid } from "@material-ui/core";
// import React from "react";
// import { CheckingContext } from "../../../context/CheckingContext";
// import "./BarCode.scss";

// function UsedUnusedPrint() {
//   const { state, dispatch } = React.useContext(CheckingContext);

//   const printDiv = (divName) => {
//     var panel = document.getElementById(divName);

//     var printWindow = window.open();

//     printWindow.document.write(`<html><head>
//     <style >

//     @page {
//   size: 10cm 5cm;
// }
// </style>
//     `);

//     printWindow.document.write("</head><body >");

//     printWindow.document.write(panel.innerHTML);

//     printWindow.document.write("</body></html>");
//     console.log(printWindow.document);
//     printWindow.document.close();

//     setTimeout(function() {
//       printWindow.print();
//       // printWindow.close();
//     }, 500);

//     return false;
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
//         id="no-print"
//         variant="contained"
//         style={btn_style}
//         id="no-print"
//         onClick={() => printDiv("printBarCode")}
//       >
//         PRINT
//       </Button>
//       <div
//         container
//         item
//         id="printBarCode"
//         className="printBarCodes"
//         style={BarCodeStyle}
//       >
//         {state.bagData.data
//           .filter((item) => item.assigned === 0)
//           .map((item, key) => (
//             <div className="page_printBreack" key={key}>
//               <img
//                 style={{ width: "auto", height: "auto" }}
//                 key={item.bagId}
//                 src={item.barcode}
//                 alt={item.bagId}
//               />
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default UsedUnusedPrint;

// import { Button, Grid } from "@material-ui/core";
// import React from "react";
// import { CheckingContext } from "../../../context/CheckingContext";
// import "./BarCode.scss";

// function UsedUnusedPrint() {
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

// export default UsedUnusedPrint;
import { Button, Grid } from "@material-ui/core";
import React from "react";
import { CheckingContext } from "../../../context/CheckingContext";
import "./BarCode.scss";

function UsedUnusedPrint() {
  const { state, dispatch } = React.useContext(CheckingContext);

  const printDiv = (divName) => {
    var panel = document.getElementById(divName);

    var printWindow = window.open();

    printWindow.document.write(`<html><head>
    <style >
  
    @page {
  size: 10cm 5cm;
}
</style>
    `);

    printWindow.document.write("</head><body >");

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
        {state.bagData.data.map((item, key) => (
          <div
            // style={{ }}
            // className="page_printBreack"
            style={{
              pageBreakAfter: "always",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            key={key}
          >
            <img
              style={{ width: "50%", height: "auto" }}
              key={item.bagId}
              src={item.barcode}
              alt={item.bagId}
            />
            <div
              style={{
                width: "50%",
                // height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>Table No. {item.tableId}</h3>
                <h4 style={{ margin: 0 }}>Bag Id {item.bagId}</h4>
                <h5 style={{ margin: 0 }}>Date {item.date}</h5>
                <h5 style={{ margin: 0 }}>Time {item.time}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsedUnusedPrint;
