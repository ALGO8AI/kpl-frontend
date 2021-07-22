import { Grid, Paper } from "@material-ui/core";
import React from "react";
import AreaChart from "../../../components/areaChart/AreaChart";
import DonutChart from "../../../components/donutChart/DonutChart";
import DonutChartSimple from "../../../components/donutChartSimple/DonutChartSimple";
// import Loader from "../../../components/loader/Loader";

function GraphData({ workerUtilization, crowdingInstance }) {
  return (
    <Grid container xs={12} spacing={2} style={{ padding: "12px 16px" }}>
      <Grid container item xs={12} sm={6} lg={3}>
        <Paper style={{ width: "100%", padding: "8px" }} elevation={5}>
          <DonutChartSimple />
        </Paper>
      </Grid>
      <Grid container item xs={12} sm={6} lg={4}>
        <Paper style={{ width: "100%", padding: "8px" }} elevation={5}>
          <DonutChart
            totalTime={workerUtilization.totalTime}
            idleDueToWorkerUnavailable={
              workerUtilization.idleDueToWorkerUnavailable
            }
            feedUnavailibilityDuration={
              workerUtilization.feedUnavailibilityDuration
            }
            other={workerUtilization.other}
            utilizationPercentage={workerUtilization.utilizationPercentage}
          />
        </Paper>
      </Grid>
      <Grid container item xs={12} sm={12} lg={5}>
        <Paper elevation={5} style={{ width: "100%", padding: "8px" }}>
          <AreaChart data={crowdingInstance} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default GraphData;
