import React from "react";
import "./Graph.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Charts from "./Chart";

function Graph({ title, current, last, today }) {
  return (
    <div className="graph">
      <div>
        <div className="graphr1">
          <div className="graphTitle">{title}</div>
          <div>This Week</div>
          <div className="center1">
            <CircularProgress
              variant="determinate"
              value={75}
              style={{ color: "#f0f075" }}
            />
            &nbsp;{current}
          </div>
        </div>
        <div className="graphr1 r2">
          <div>Today's</div>
          <div>Last Week</div>
          <div className="center1">
            {" "}
            <CircularProgress
              variant="determinate"
              value={75}
              style={{ color: "#f0f075" }}
            />
            &nbsp;{last}
          </div>
        </div>
        <div className="graphr1">
          <div className="graphTitle center2">
            <CircularProgress
              variant="determinate"
              value={75}
              style={{ color: "#f0f075" }}
            />
            &nbsp;{today}%
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        {/*Canvas Js Graph goes here*/}
        {/* <RawGraph/> */}
        <Charts />
      </div>
    </div>
  );
}

export default Graph;
