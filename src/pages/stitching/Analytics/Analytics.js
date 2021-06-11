import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import CountUp from "react-countup";
import React, { useState, useEffect } from "react";
import ActiveViolation from "../../../components/analytics/ActiveViolation";
import LineUtilisation from "../../../components/analytics/LineUtilisation";
import MachineLine from "../../../components/analytics/MachineLine";
import MachineStatus from "../../../components/analytics/MachineStatus";
import MachineUtilisation from "../../../components/analytics/MachineUtilisation";
import Unresolved from "../../../components/analytics/Unresolved";
import ViolationType from "../../../components/analytics/ViolationType";
import {
  analyticsTotalViolation,
  analyticsTotaUnresolvedlViolation,
  analyticsMostUnresolvedlViolation,
  analyticsMostUnresolvedlViolationInstance,
  analyticsTotalViolationByType,
  analyticsMaxVioCount,
  analyticsDurationOfViolationType,
  analyticsMachineStatus,
  analyticsMachineStatusByDuration,
  analyticsMachineStatusByDurationAndMachineID,
  analyticsMachineStatusByOperation,
  ctr_machineID,
} from "../../../services/api.service";
import "./Analytics.scss";

function Analytics() {
  // data states
  const [totalVio, setTotalVio] = useState();
  const [totalUnresolvedVio, setTotalUnresolvedVio] = useState();
  const [mostUnresolvedVio, setMostUnresolvedVio] = useState();
  const [mostUnresolvedVioIns, setMostUnresolvedVioIns] = useState();
  const [totalVioByType, setTotalVioByType] = useState();
  const [maxVioCount, setMaxVioCount] = useState();
  const [totalVioByTime, setTotalVioByTime] = useState();
  const [machineStatus, setMachineStatus] = useState();
  const [machineStatusDuration, setMachineStatusDuration] = useState();
  const [machineStatusDurationID, setMachineStatusDurationID] = useState();
  const [machineStatusOperation, setMachineStatusOperation] = useState();
  const [machineID, setMachineID] = useState();

  // input states
  const [filterDateTo, setFilterDateTo] = useState();
  const [filterDateFrom, setFilterDateFrom] = useState();
  const [wing, setWing] = useState();
  const [line, setLine] = useState();
  const [shift, setShift] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [machineId, setMachineId] = useState([]);

  const loadData = async () => {
    try {
      // FILTERS
      const ctr = await ctr_machineID();
      setMachineID(ctr.machineID);

      // total violation
      const TOTAL_VIO = await analyticsTotalViolation();
      setTotalVio(TOTAL_VIO.data);

      // total unresolved
      const TOTAL_UNRESOLVED = await analyticsTotaUnresolvedlViolation();
      setTotalUnresolvedVio(TOTAL_UNRESOLVED.data);

      // most unresolved
      const MOST_UNRESOLVED = await analyticsMostUnresolvedlViolation();
      setMostUnresolvedVio(MOST_UNRESOLVED.data);

      // most unresolved by instance
      const MOST_UNRESOLVED_INSTANCE = await analyticsMostUnresolvedlViolationInstance();
      setMostUnresolvedVioIns(MOST_UNRESOLVED_INSTANCE.data);

      // total violation by type
      const TOTAL_VIO_TYPE = await analyticsTotalViolationByType();
      setTotalVioByType(TOTAL_VIO_TYPE);

      // maximum violation counts
      const MAX_VIO_COUNT = await analyticsMaxVioCount();
      setMaxVioCount(MAX_VIO_COUNT);

      // total violation by time
      const TOTAL_VIO_DURATION = await analyticsDurationOfViolationType();
      setTotalVioByTime(TOTAL_VIO_DURATION);

      // machine status
      const MACHINE_STATUS = await analyticsMachineStatus();
      setMachineStatus(MACHINE_STATUS.machineBreakdownData);

      // machine status by duration
      const MACHINE_STATUS_DURATION = await analyticsMachineStatusByDuration();
      setMachineStatusDuration(MACHINE_STATUS_DURATION);

      // machine status by duration & ID
      const MACHINE_DURATION_ID = await analyticsMachineStatusByDurationAndMachineID();
      setMachineStatusDurationID(MACHINE_DURATION_ID);

      // machine status by operation
      const MACHINE_OPERATION = await analyticsMachineStatusByOperation();
      setMachineStatusOperation(
        MACHINE_OPERATION.machineBreakdownMaxTimeAndIdData
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const FilterData = async () => {
    try {
      // total violation
      const TOTAL_VIO = await analyticsTotalViolation(
        filterDateTo,
        filterDateFrom,
        wing,
        line,
        shift,
        supervisor
      );
      setTotalVio(TOTAL_VIO.data);

      // total unresolved
      const TOTAL_UNRESOLVED = await analyticsTotaUnresolvedlViolation(
        filterDateTo,
        filterDateFrom,
        wing,
        line,
        shift,
        supervisor
      );
      setTotalUnresolvedVio(TOTAL_UNRESOLVED.data);

      // most unresolved
      const MOST_UNRESOLVED = await analyticsMostUnresolvedlViolation(
        filterDateTo,
        filterDateFrom,
        wing,
        line,
        shift,
        supervisor
      );
      setMostUnresolvedVio(MOST_UNRESOLVED?.data);

      // most unresolved by instance
      const MOST_UNRESOLVED_INSTANCE = await analyticsMostUnresolvedlViolationInstance(
        filterDateTo,
        filterDateFrom,
        wing,
        line,
        shift,
        supervisor
      );
      setMostUnresolvedVioIns(MOST_UNRESOLVED_INSTANCE?.data);

      // total violation by type
      const TOTAL_VIO_TYPE = await analyticsTotalViolationByType(
        filterDateTo,
        filterDateFrom,
        wing,
        line,
        shift,
        supervisor
      );
      setTotalVioByType(TOTAL_VIO_TYPE);

      // maximum violation counts
      const MAX_VIO_COUNT = await analyticsMaxVioCount(
        filterDateTo,
        filterDateFrom,
        wing,
        line,
        shift,
        supervisor
      );
      setMaxVioCount(MAX_VIO_COUNT);

      // total violation by time
      const TOTAL_VIO_DURATION = await analyticsDurationOfViolationType(
        filterDateTo,
        filterDateFrom,
        wing,
        line,
        shift,
        supervisor
      );
      setTotalVioByTime(TOTAL_VIO_DURATION);

      // machine status
      const MACHINE_STATUS = await analyticsMachineStatus(
        filterDateTo,
        filterDateFrom,
        wing,
        line,
        shift,
        supervisor,
        machineId
      );
      setMachineStatus(MACHINE_STATUS?.machineBreakdownData);

      // machine status by duration
      const MACHINE_STATUS_DURATION = await analyticsMachineStatusByDuration(
        filterDateTo,
        filterDateFrom,
        wing,
        line,
        shift,
        supervisor,
        machineId
      );
      setMachineStatusDuration(MACHINE_STATUS_DURATION);

      // machine status by duration & ID
      const MACHINE_DURATION_ID = await analyticsMachineStatusByDurationAndMachineID(
        filterDateTo,
        filterDateFrom,
        wing,
        line,
        shift,
        supervisor,
        machineId
      );
      setMachineStatusDurationID(MACHINE_DURATION_ID);

      // machine status by operation
      const MACHINE_OPERATION = await analyticsMachineStatusByOperation(
        filterDateTo,
        filterDateFrom,
        wing,
        line,
        shift,
        supervisor,
        machineId
      );
      setMachineStatusOperation(
        MACHINE_OPERATION?.machineBreakdownMaxTimeAndIdData
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container className="Analytics_Container">
      <Grid container item xs={12}>
        <Grid container item className={"Grid_Padding"} md={2}>
          <TextField
            key="from"
            id="fromDate"
            label="From"
            value={filterDateFrom}
            type="date"
            style={{ marginRight: "6px" }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(e) => setFilterDateFrom(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid container item className={"Grid_Padding"} md={2}>
          <TextField
            key="from"
            id="fromDate"
            label="To"
            value={filterDateTo}
            type="date"
            style={{ marginRight: "6px" }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(e) => setFilterDateTo(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* <Grid container item className={"Grid_Padding"} md={2}>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginRight: "6px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Supervisor
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              multiple
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              label="Supervisor"
           
            >
  
              {["Sanjay Dassamanta", "RP Yadav"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}

        <Grid container item className={"Grid_Padding"} md={2}>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginRight: "6px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Shift
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              multiple
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              label="Shift"
            >
              {["A", "B"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid container item className={"Grid_Padding"} md={1}>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginRight: "6px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">Line</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              // multiple
              value={line}
              onChange={(e) => setLine(e.target.value)}
              label="Line"
              // multiple
            >
  
              {["U+2", "Baffle", "Circular", "Two Row"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}

        <Grid container item className={"Grid_Padding"} md={1}>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginRight: "6px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">Wing</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              // multiple
              value={wing}
              onChange={(e) => setWing(e.target.value)}
              label="Wing"
            >
              {["FG2"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container item className={"Grid_Padding"} md={1}>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            onClick={FilterData}
          >
            <FilterListIcon />
            Filter
          </Button>
        </Grid>

        <Grid container item className={"Grid_Padding"} md={1}>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            onClick={loadData}
          >
            <RefreshIcon />
            Refresh
          </Button>
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
          <ActiveViolation
            chartData={totalVio}
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            filter={FilterData}
          />
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
            <Typography variant="h4">
              {totalUnresolvedVio && (
                <CountUp end={totalUnresolvedVio[0]?.count} duration={4} />
              )}
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
            <Typography variant="h5">MOST UNRESOLVED VIOLATION</Typography>
            <Typography variant="h4">
              {mostUnresolvedVio && (
                <CountUp end={mostUnresolvedVio[0]?.count} duration={4} />
              )}
            </Typography>
            <Typography variant="h6">
              {mostUnresolvedVio && mostUnresolvedVio[0]?.instance}
            </Typography>
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
          <Unresolved
            chartData={mostUnresolvedVioIns}
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            filter={FilterData}
          />
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
          <ViolationType
            chartData={totalVioByType}
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            machineID={machineID}
            filter={FilterData}
          />
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
              {maxVioCount && (
                <CountUp
                  end={maxVioCount?.workerUnavailableData[0]?.id}
                  duration={4}
                />
              )}
              (mins.)
            </Typography>
            <Typography variant="h6">
              on (
              {maxVioCount &&
                new Date(
                  maxVioCount?.workerUnavailableData[0]?.date
                ).toDateString()}
              )
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
              {maxVioCount && (
                <CountUp
                  end={maxVioCount?.feedUnavailableData[0]?.id}
                  duration={4}
                />
              )}
              (mins.)
            </Typography>
            <Typography variant="h6">
              on (
              {maxVioCount &&
                new Date(
                  maxVioCount?.feedUnavailableData[0]?.date
                ).toDateString()}
              )
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
              {maxVioCount && (
                <CountUp end={maxVioCount?.crowdingData[0]?.id} duration={4} />
              )}
              (mins.)
            </Typography>
            <Typography variant="h6">
              on (
              {maxVioCount &&
                new Date(maxVioCount?.crowdingData[0]?.date).toDateString()}
              )
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid
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
        </Grid> */}
      </Grid>
      {/* SECTION 3 */}
      {/* <Grid container item md={2} className={"Grid_Padding"}>
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
      </Grid> */}

      {/* <Grid container item md={2} className={"Grid_Padding"}> */}
      {/* <Grid
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
        </Grid> */}
      {/* <Grid
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
        </Grid> */}
      {/* </Grid> */}
      <Grid container item md={12} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          component={Paper}
          elevation={4}
          className={"Grid_Container"}
        >
          <MachineLine
            chartData={totalVioByTime}
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            machineID={machineID}
            filter={FilterData}
          />
        </Grid>
      </Grid>
      {/* SECTION 4 */}
      <Grid container item md={10} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          component={Paper}
          elevation={4}
          className={"Grid_Container"}
        >
          <MachineStatus
            chartData={machineStatus}
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            machineID={machineID}
            filter={FilterData}
          />
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
            <Typography variant="h5">MAXIMUM BREAKDOWN DURATION</Typography>
            <Typography variant="h4" style={{ fontSize: "28px" }}>
              {machineStatusDuration &&
                machineStatusDuration?.machineBreakdownMaxTimeData[0]?.[
                  "machineID"
                ]}
            </Typography>
            <Typography variant="h6">
              {machineStatusDuration && (
                <CountUp
                  end={
                    machineStatusDuration?.machineBreakdownMaxTimeData[0][
                      "max(timeDuration)"
                    ]
                  }
                  duration={4}
                />
              )}
              (mins.)
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
            <Typography variant="h5">MINIMUM BREAKDOWN DURATION</Typography>
            <Typography variant="h4" style={{ fontSize: "28px" }}>
              {machineStatusDuration &&
                machineStatusDuration?.machineBreakdownMinTimeData[0]?.[
                  "machineID"
                ]}
            </Typography>
            <Typography variant="h6">
              {machineStatusDuration && (
                <CountUp
                  end={
                    machineStatusDuration?.machineBreakdownMinTimeData[0][
                      "min(timeDuration)"
                    ]
                  }
                  duration={4}
                />
              )}
              (mins.)
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid container item md={2} className={"Grid_Padding"}></Grid> */}
      {/* SECTION 5 */}
      {/* <Grid container item md={2} className={"Grid_Padding"}></Grid> */}
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
            <Typography variant="h4" style={{ fontSize: "28px" }}>
              {machineStatusDurationID &&
                machineStatusDurationID?.machineBreakdownMaxTimeAndIdData[0]
                  ?.machineId}
            </Typography>
            <Typography variant="h6">
              {machineStatusDurationID && (
                <CountUp
                  end={
                    machineStatusDurationID?.machineBreakdownMaxTimeAndIdData[0]
                      ?.timeDuration
                  }
                  duration={4}
                />
              )}
              (mins.)
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
            <Typography variant="h5">LOWEST UTILISED MACHINE</Typography>
            <Typography variant="h4" style={{ fontSize: "28px" }}>
              {machineStatusDurationID &&
                machineStatusDurationID?.machineBreakdownMinTimeAndIdData[0]
                  ?.machineId}
            </Typography>
            <Typography variant="h6">
              {machineStatusDurationID && (
                <CountUp
                  end={
                    machineStatusDurationID?.machineBreakdownMinTimeAndIdData[0]
                      ?.timeDuration
                  }
                  duration={4}
                />
              )}
              (mins.)
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item md={10} className={"Grid_Padding"}>
        <Grid
          container
          item
          md={12}
          component={Paper}
          elevation={4}
          className={"Grid_Container"}
        >
          <MachineUtilisation
            chartData={machineStatusOperation}
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            machineID={machineID}
            filter={FilterData}
          />
        </Grid>
      </Grid>
      {/* SECTION 6 */}
      {/* <Grid container item md={8} className={"Grid_Padding "}>
        <Grid
          container
          item
          md={12}
          component={Paper}
          elevation={4}
          className={"Grid_Container Cover"}
        >
          <LineUtilisation />
        </Grid>
      </Grid> */}

      {/* <Grid container item md={2} className={"Grid_Padding"}>
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
      </Grid> */}
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
