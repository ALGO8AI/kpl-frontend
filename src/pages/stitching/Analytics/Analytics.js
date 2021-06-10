import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import ActiveViolation from "../../../components/analytics/ActiveViolation";
import LineUtilisation from "../../../components/analytics/LineUtilisation";
import MachineLine from "../../../components/analytics/MachineLine";
import MachineStatus from "../../../components/analytics/MachineStatus";
import MachineUtilisation from "../../../components/analytics/MachineUtilisation";
import Unresolved from "../../../components/analytics/Unresolved";
import ViolationType from "../../../components/analytics/ViolationType";
import "./Analytics.scss";

function Analytics() {
  return (
    <Grid container className="Analytics_Container">
      <Grid container item md={5} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          component={Paper}
          elevation={4}
          className={"Grid_Container"}
        >
          <ActiveViolation />
        </Grid>
      </Grid>
      <Grid container item md={2} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">TOTAL UNRESOLVED VIOLATION</Typography>
            <Typography variant="h4">10</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">MOST UNRESOLVED VIOLATION</Typography>
            <Typography variant="h4">10</Typography>
            <Typography variant="h6">Worker Unavailable</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item md={5} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          component={Paper}
          elevation={4}
          className={"Grid_Container"}
        >
          <Unresolved />
        </Grid>
      </Grid>
      {/* SECTION 2 */}
      <Grid container item md={8} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          component={Paper}
          elevation={4}
          className={"Grid_Container"}
        >
          <ViolationType />
        </Grid>
      </Grid>
      <Grid container item md={2} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">WORKER UNAVAILABLE (MAX.)</Typography>
            <Typography variant="h4">
              25{" "}
              <span style={{ fontSize: "16px", color: "#0e4a7b" }}>
                (on 24th May)
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">FEED UNAVAILABLE (MAX.)</Typography>
            <Typography variant="h4">
              25{" "}
              <span style={{ fontSize: "16px", color: "#0e4a7b" }}>
                (on 24th May)
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item md={2} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">CROWDING (MAX.)</Typography>
            <Typography variant="h4">
              25{" "}
              <span style={{ fontSize: "16px", color: "#0e4a7b" }}>
                (on 24th May)
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">MACHINE DOWNTIME (MAX.)</Typography>
            <Typography variant="h4">
              25{" "}
              <span style={{ fontSize: "16px", color: "#0e4a7b" }}>
                (on 24th May)
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* SECTION 3 */}
      <Grid container item md={2} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">MACHINE DOWNTIME (MAX.)</Typography>
            <Typography variant="h4">
              25{" "}
              <span style={{ fontSize: "16px", color: "#0e4a7b" }}>
                (on 24th May)
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item md={2} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">MACHINE DOWNTIME (MAX.)</Typography>
            <Typography variant="h4">
              25{" "}
              <span style={{ fontSize: "16px", color: "#0e4a7b" }}>
                (on 24th May)
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">MACHINE DOWNTIME (MAX.)</Typography>
            <Typography variant="h4">
              25{" "}
              <span style={{ fontSize: "16px", color: "#0e4a7b" }}>
                (on 24th May)
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item md={8} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          component={Paper}
          elevation={4}
          className={"Grid_Container"}
        >
          <MachineLine />
        </Grid>
      </Grid>
      {/* SECTION 4 */}
      <Grid container item md={8} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          component={Paper}
          elevation={4}
          className={"Grid_Container"}
        >
          <MachineStatus />
        </Grid>
      </Grid>
      <Grid container item md={2} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">MAXIMUM DURATION</Typography>
            <Typography variant="h4">U+2</Typography>
            <Typography variant="h6">20 hrs</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">MINIMUM DURATION</Typography>
            <Typography variant="h4">U+2</Typography>
            <Typography variant="h6">20 hrs</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item md={2} className={"Grid_Padding"}></Grid>
      {/* SECTION 5 */}
      <Grid container item md={2} className={"Grid_Padding"}></Grid>
      <Grid container item md={2} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">HIGHEST UTILISED MACHINE</Typography>
            <Typography variant="h4">5</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">LOWEST UTILISED MACHINE</Typography>
            <Typography variant="h4">2</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item md={8} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          component={Paper}
          elevation={4}
          className={"Grid_Container"}
        >
          <MachineUtilisation />
        </Grid>
      </Grid>
      {/* SECTION 6 */}
      <Grid container item md={8} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          component={Paper}
          elevation={4}
          className={"Grid_Container"}
        >
          <LineUtilisation />
        </Grid>
      </Grid>

      <Grid container item md={2} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">HIGHEST LINE MACHINE</Typography>
            <Typography variant="h4">5</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={12}
          className={"Grid_Container Data"}
          component={Paper}
          elevation={4}
        >
          <Grid container item md={12} style={{ flexDirection: "column" }}>
            <Typography variant="h5">LOWEST LINE MACHINE</Typography>
            <Typography variant="h4">2</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item md={2} className={"Grid_Padding"}></Grid>
    </Grid>
    // <Grid container className="Analytics_Container">
    //   <Grid item container md={6} style={{ padding: "12px" }}>
    //     <Grid item container md={12} component={Paper} elevation={4}>
    //       <Grid container item md={12}>
    //         <Typography
    //           style={{ margin: "12px auto", color: "#0e4a7b" }}
    //           variant="h4"
    //         >
    //           Active Violations
    //         </Typography>
    //         <Grid container item md={12} style={{ margin: "auto" }}>
    //           <ActiveViolation />
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Grid item container md={6} style={{ padding: "12px" }}>
    //     <Grid item container md={12} component={Paper} elevation={4}>
    //       <Grid container item md={12}>
    //         <Typography
    //           style={{ margin: "12px auto", color: "#0e4a7b" }}
    //           variant="h4"
    //         >
    //           No. Of Unresolved By Type
    //         </Typography>
    //         <Grid container item md={12} style={{ margin: "auto" }}>
    //           <Unresolved />
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Grid
    //     className="GraphContainer"
    //     item
    //     container
    //     md={12}
    //     component={Paper}
    //     elevation={4}
    //   >
    //     <Grid item container md={7} style={{ padding: "12px" }}>
    //       <Grid
    //         item
    //         container
    //         md={12}
    //         style={{ padding: "12px" }}
    //         // component={Paper}
    //         // elevation={4}
    //       >
    //         <MachineLine />
    //       </Grid>
    //     </Grid>
    //     <Grid item container md={5} style={{ padding: "12px" }}>
    //       <Grid
    //         item
    //         container
    //         md={12}
    //         style={{
    //           padding: "12px 16px 12px 32px",
    //           flexDirection: "column",
    //           justifyContent: "space-evenly",
    //         }}
    //         // component={Paper}
    //         // elevation={4}
    //       >
    //         <Typography style={{ color: "#0e4a7b" }} variant="h4">
    //           Maximum number of
    //         </Typography>
    //         <Typography style={{ color: "#0e4a7b" }} variant="h5">
    //           Feed UA = <span style={{ fontWeight: "700" }}>23</span> at{" "}
    //           {new Date().toLocaleTimeString()}.
    //         </Typography>
    //         <Typography style={{ color: "#0e4a7b" }} variant="h5">
    //           Worker UA = <span style={{ fontWeight: "700" }}>15</span> at{" "}
    //           {new Date().toLocaleTimeString()}.
    //         </Typography>
    //         <Typography style={{ color: "#0e4a7b" }} variant="h5">
    //           Machine Down = <span style={{ fontWeight: "700" }}>37</span> at{" "}
    //           {new Date().toLocaleTimeString()}.
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Grid
    //     className="GraphContainer"
    //     item
    //     container
    //     md={12}
    //     component={Paper}
    //     elevation={4}
    //   >
    //     <Grid item container md={5} style={{ padding: "12px" }}>
    //       <Grid
    //         item
    //         container
    //         md={12}
    //         style={{
    //           padding: "12px 16px 12px 32px",
    //           flexDirection: "column",
    //           justifyContent: "space-evenly",
    //         }}
    //         // component={Paper}
    //         // elevation={4}
    //       >
    //         <Typography style={{ color: "#0e4a7b" }} variant="h4">
    //           Description
    //         </Typography>
    //         <Typography style={{ color: "#0e4a7b" }} variant="h5">
    //           y-Axis = Working amount of time.
    //         </Typography>
    //         <Typography style={{ color: "#0e4a7b" }} variant="h5">
    //           x-Axis = Time interval.
    //         </Typography>
    //         <Typography style={{ color: "#0e4a7b" }} variant="h5">
    //           Each line representing different machine id.
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //     <Grid item container md={7} style={{ padding: "12px" }}>
    //       <Grid
    //         item
    //         container
    //         md={12}
    //         style={{ padding: "12px" }}
    //         // component={Paper}
    //         // elevation={4}
    //       >
    //         <MachineLine />
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Grid
    //     className="GraphContainer"
    //     item
    //     container
    //     md={12}
    //     component={Paper}
    //     elevation={4}
    //   >
    //     <Grid item container md={7} style={{ padding: "12px" }}>
    //       <Grid
    //         item
    //         container
    //         md={12}
    //         style={{ padding: "12px" }}
    //         // component={Paper}
    //         // elevation={4}
    //       >
    //         <MachineUtilisation />
    //       </Grid>
    //     </Grid>
    //     <Grid item container md={5} style={{ padding: "12px" }}>
    //       <Grid
    //         item
    //         container
    //         md={12}
    //         style={{
    //           padding: "12px 16px 12px 32px",
    //           flexDirection: "column",
    //           justifyContent: "space-evenly",
    //         }}
    //         // component={Paper}
    //         // elevation={4}
    //       >
    //         <Typography style={{ color: "#0e4a7b" }} variant="h4">
    //           Lowest Utilisation
    //         </Typography>
    //         <Typography style={{ color: "#0e4a7b" }} variant="h5">
    //           Machine With Lowest Utilization, Machine Id{" "}
    //           <span style={{ fontWeight: "700" }}>23</span>.
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Grid>

    //   <Grid
    //     className="GraphContainer"
    //     item
    //     container
    //     md={12}
    //     component={Paper}
    //     elevation={4}
    //   >
    //     <Grid item container md={5} style={{ padding: "12px" }}>
    //       <Grid
    //         item
    //         container
    //         md={12}
    //         style={{
    //           padding: "12px 16px 12px 32px",
    //           flexDirection: "column",
    //           justifyContent: "space-evenly",
    //         }}
    //         // component={Paper}
    //         // elevation={4}
    //       >
    //         <Typography style={{ color: "#0e4a7b" }} variant="h4">
    //           Most Number Of Violation For
    //         </Typography>
    //         <Typography style={{ color: "#0e4a7b" }} variant="h5">
    //           Worker UA = <span style={{ fontWeight: "700" }}>23</span> on{" "}
    //           {new Date().toLocaleDateString()}.
    //         </Typography>
    //         <Typography style={{ color: "#0e4a7b" }} variant="h5">
    //           Feed UA = <span style={{ fontWeight: "700" }}>15</span> on{" "}
    //           {new Date().toLocaleDateString()}.
    //         </Typography>
    //         <Typography style={{ color: "#0e4a7b" }} variant="h5">
    //           Crowding = <span style={{ fontWeight: "700" }}>37</span> on{" "}
    //           {new Date().toLocaleDateString()}.
    //         </Typography>
    //         <Typography style={{ color: "#0e4a7b" }} variant="h5">
    //           Machine Downtime = <span style={{ fontWeight: "700" }}>37</span>{" "}
    //           on {new Date().toLocaleDateString()}.
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //     <Grid item container md={7} style={{ padding: "12px" }}>
    //       <Grid
    //         item
    //         container
    //         md={12}
    //         style={{ padding: "12px" }}
    //         // component={Paper}
    //         // elevation={4}
    //       >
    //         <ViolationType />
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
  );
}

export default Analytics;
