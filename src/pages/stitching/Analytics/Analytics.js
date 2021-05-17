import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import ActiveViolation from "../../../components/analytics/ActiveViolation";
import MachineLine from "../../../components/analytics/MachineLine";
import MachineUtilisation from "../../../components/analytics/MachineUtilisation";
import Unresolved from "../../../components/analytics/Unresolved";
import "./Analytics.scss";

function Analytics() {
  return (
    <Grid container className="Analytics_Container">
      <Grid item container md={6} style={{ padding: "12px" }}>
        <Grid item container md={12} component={Paper} elevation={4}>
          <Grid container item md={12}>
            <Typography
              style={{ margin: "12px auto", color: "#0e4a7b" }}
              variant="h4"
            >
              Active Violations
            </Typography>
            <Grid container item md={12} style={{ margin: "auto" }}>
              <ActiveViolation />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container md={6} style={{ padding: "12px" }}>
        <Grid item container md={12} component={Paper} elevation={4}>
          <Grid container item md={12}>
            <Typography
              style={{ margin: "12px auto", color: "#0e4a7b" }}
              variant="h4"
            >
              No. Of Unresolved By Type
            </Typography>
            <Grid container item md={12} style={{ margin: "auto" }}>
              <Unresolved />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container md={12}>
        <Grid item container md={7} style={{ padding: "12px" }}>
          <Grid
            item
            container
            md={12}
            style={{ padding: "12px" }}
            component={Paper}
            elevation={4}
          >
            <MachineLine />
          </Grid>
        </Grid>
        <Grid item container md={5} style={{ padding: "12px" }}>
          <Grid
            item
            container
            md={12}
            style={{
              padding: "12px 16px 12px 32px",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
            component={Paper}
            elevation={4}
          >
            <Typography style={{ color: "#0e4a7b" }} variant="h4">
              Maximum number of
            </Typography>
            <Typography style={{ color: "#0e4a7b" }} variant="h5">
              Feed UA = <span style={{ fontWeight: "700" }}>23</span> at time.
            </Typography>
            <Typography style={{ color: "#0e4a7b" }} variant="h5">
              Worker UA = <span style={{ fontWeight: "700" }}>15</span> at time.
            </Typography>
            <Typography style={{ color: "#0e4a7b" }} variant="h5">
              Machine Down = <span style={{ fontWeight: "700" }}>37</span> at
              time.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container md={12}>
        <Grid item container md={5} style={{ padding: "12px" }}>
          <Grid
            item
            container
            md={12}
            style={{
              padding: "12px 16px 12px 32px",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
            component={Paper}
            elevation={4}
          >
            <Typography style={{ color: "#0e4a7b" }} variant="h4">
              Lowest Utilisation
            </Typography>
            <Typography style={{ color: "#0e4a7b" }} variant="h5">
              Machine With Lowest Utilization, Machine Id{" "}
              <span style={{ fontWeight: "700" }}>23</span>.
            </Typography>
          </Grid>
        </Grid>
        <Grid item container md={7} style={{ padding: "12px" }}>
          <Grid
            item
            container
            md={12}
            style={{ padding: "12px" }}
            component={Paper}
            elevation={4}
          >
            <MachineUtilisation />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Analytics;
