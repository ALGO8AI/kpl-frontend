// import React from "react";
// import "./Graph.css";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Charts from "./Chart";

// function Graph({ title, current, last, today }) {
//   return (
//     <div className="graph">
//       <div>
//         <div className="graphr1">
//           <div className="graphTitle">{title}</div>
//           <div>This Week</div>
//           <div className="center1">
//             <CircularProgress
//               variant="determinate"
//               value={75}
//               style={{ color: "#f68f1d" }}
//             />
//             &nbsp;{current}
//           </div>
//         </div>
//         <div className="graphr1 r2">
//           <div>Today's</div>
//           <div>Last Week</div>
//           <div className="center1">
//             {" "}
//             <CircularProgress
//               variant="determinate"
//               value={75}
//               style={{ color: "#f68f1d" }}
//             />
//             &nbsp;{last}
//           </div>
//         </div>
//         <div className="graphr1">
//           <div className="graphTitle center2">
//             <CircularProgress
//               variant="determinate"
//               value={75}
//               style={{ color: "#f68f1d" }}
//             />
//             &nbsp;{today}%
//           </div>
//           <div></div>
//           <div></div>
//         </div>
//       </div>
//       <div style={{ marginTop: "10px" }}>
//         {/*Canvas Js Graph goes here*/}
//         {/* <RawGraph/> */}
//         <Charts />
//       </div>
//     </div>
//   );
// }

// export default Graph;
import { CircularProgress, Grid, Paper, Typography } from "@material-ui/core";
import Charts from "./Chart";
import React from "react";

function Graph({ title, week, month, today }) {
  return (
    <Grid xs={12} component={Paper} elevation={3}>
      <h3
        style={{
          backgroundColor: "#f68f1d",
          width: "min-content",
          whiteSpace: "nowrap",
          padding: "8px 12px",
          margin: "auto",
          color: "white",
          fontWeight: "500",
          borderRadius: "4px",
          marginTop: "12px",
        }}
      >
        {title}
      </h3>
      <Grid
        container
        item
        xs={12}
        style={{ padding: "12px", alignItems: "center" }}
      >
        <Grid container item xs={7} style={{ flexDirection: "column" }}>
          <p style={{ fontSize: "18px", marginBottom: "8px" }}>Today</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CircularProgress
              variant="determinate"
              value={today}
              style={{ color: "#f68f1d" }}
              size={60}
            />
            <p
              style={{
                fontWeight: "bold",
                fontSize: "32px",
                marginLeft: "8px",
              }}
            >
              {today} %
            </p>
          </div>
        </Grid>
        <Grid container item xs={5} style={{}}>
          <Grid
            container
            item
            xs={12}
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <p>This Week</p>
            <CircularProgress
              variant="determinate"
              value={week}
              style={{ color: "#f68f1d", margin: "0 8px" }}
              size={32}
            />
            <p>{week} %</p>
          </Grid>
          <Grid
            xs={12}
            style={{
              padding: "1px",
              backgroundColor: "#0e4a7b",
              margin: "10px 0",
            }}
          ></Grid>
          <Grid
            container
            item
            xs={12}
            style={{ alignItems: "center", justifyContent: "flex-end" }}
          >
            <p>This Month</p>
            <CircularProgress
              variant="determinate"
              value={month}
              style={{ color: "#f68f1d", margin: "0 8px" }}
              size={32}
            />
            <p>{month} %</p>
          </Grid>
        </Grid>
      </Grid>
      <Charts />
    </Grid>
  );
}

export default Graph;
