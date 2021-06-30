import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  detailedSummaryByClpCtrChecking,
  crowdingInstanceCheckingData,
  ctr_machineID,
  homepageData,
  machineBreakdownData,
  detailedSummaryByTableChecking,
  summaryByViolationData,
  detailedSummaryByWorkerChecking,
  checkingWorkerUtilizationData,
} from "../../../services/api.service";
import GraphData from "./GraphData";
import TableData from "./TableData";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import Loader from "../../../components/loader/Loader";
import DonutChartSimple from "../../../components/donutChartSimple/DonutChartSimple";
import DonutChart from "../../../components/donutChart/DonutChart";
import AreaChart from "../../../components/areaChart/AreaChart";
import DefectChart from "../../../components/barChart/DefectChart";
import { CheckingContext } from "../../../context/CheckingContext";
import DonutChartChecking from "../../../components/donutChart/DonutChartChecking";
import AreaChartChecking from "../../../components/areaChart/AreaChartChecking";

export default function Home() {
  // context
  const { state, dispatch } = React.useContext(CheckingContext);
  // State
  const [clpCtr, setClpCtr] = useState([]);
  const [machineID, setMachineID] = useState([]);
  const [inputCTR, setInputCTR] = useState([]);
  const [inputMACHINEid, setInputMACHINEid] = useState([]);
  const [inputSHIFT, setInputSHIFT] = useState([]);

  // Functions

  // refresh
  const refreshData = async () => {
    var myDate = new Date();
    var newDateWeekBack = new Date(myDate.getTime() - 60 * 60 * 24 * 7 * 1000);

    dispatch({
      type: "FROM",
      payload: newDateWeekBack.toISOString().slice(0, 10),
    });

    dispatch({
      type: "TO",
      payload: myDate.toISOString().slice(0, 10),
    });

    try {
      const y = await checkingWorkerUtilizationData();
      dispatch({
        type: "WORKER_UTILIZATION",
        payload: { data: y.workerUtilization, loading: false },
      });

      const z = await crowdingInstanceCheckingData();
      dispatch({
        type: "CROWDING_INSTANCE",
        payload: { data: z.crowdingInstancesData, loading: false },
      });

      const homeWorkerTable = await detailedSummaryByWorkerChecking();
      dispatch({
        type: "HOME_WORKER_TABLE",
        payload: {
          data: homeWorkerTable,
          loading: false,
        },
      });

      const homeDateTable = await summaryByViolationData();
      dispatch({
        type: "HOME_DATE_TABLE",
        payload: {
          data: homeDateTable.detailedSummaryByViolation.violationSummary,
          loading: false,
        },
      });

      const homeMachineTable = await detailedSummaryByTableChecking();
      dispatch({
        type: "HOME_MACHINE_TABLE",
        payload: {
          data:
            homeMachineTable.detailedSummaryByMachineId
              .violationSummaryByMachineId,
          loading: false,
        },
      });

      const homeCTRTable = await detailedSummaryByClpCtrChecking();
      dispatch({
        type: "HOME_CTR_TABLE",
        payload: {
          data: homeCTRTable,
          loading: false,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  // get week days function
  const getFirstDay_LastDay = async () => {
    var myDate = new Date();
    var newDateWeekBack = new Date(myDate.getTime() - 60 * 60 * 24 * 7 * 1000);

    if (Boolean(!state.from)) {
      dispatch({
        type: "FROM",
        payload: newDateWeekBack.toISOString().slice(0, 10),
      });
    }

    if (Boolean(!state.to)) {
      dispatch({ type: "TO", payload: myDate.toISOString().slice(0, 10) });
    }
  };

  // load ctr filter dropdown data
  const load_ctr_machine = async () => {
    try {
      const ctr = await ctr_machineID();
      setClpCtr(ctr.clpctr);
      setMachineID(ctr.machineID);
    } catch (err) {
      console.log(err.message);
    }
  };

  // load initial table data
  const loadData = async () => {
    try {
      if (state.workerUtilization.loading) {
        const y = await checkingWorkerUtilizationData();
        console.log(y);
        dispatch({
          type: "WORKER_UTILIZATION",
          payload: { data: y.workerUtilization, loading: false },
        });
      }

      if (state.crowdingInstance.loading) {
        const z = await crowdingInstanceCheckingData();
        console.log(z);
        dispatch({
          type: "CROWDING_INSTANCE",
          payload: { data: z.crowdingInstancesData, loading: false },
        });
      }

      if (state.homeWorkerTable.loading) {
        const homeWorkerTable = await detailedSummaryByWorkerChecking();
        console.log(homeWorkerTable);
        dispatch({
          type: "HOME_WORKER_TABLE",
          payload: {
            data: homeWorkerTable,
            loading: false,
          },
        });
      }

      if (state.homeDateTable.loading) {
        const homeDateTable = await summaryByViolationData();
        console.log(homeDateTable);
        dispatch({
          type: "HOME_DATE_TABLE",
          payload: {
            data: homeDateTable.detailedSummaryByViolation.violationSummary,
            loading: false,
          },
        });
      }

      if (state.homeMachineTable.loading) {
        const homeMachineTable = await detailedSummaryByTableChecking();
        console.log(homeMachineTable);
        dispatch({
          type: "HOME_MACHINE_TABLE",
          payload: {
            data: homeMachineTable,
            loading: false,
          },
        });
      }

      if (state.homeCTRTable.loading) {
        const homeCTRTable = await detailedSummaryByClpCtrChecking();
        console.log(homeCTRTable);
        dispatch({
          type: "HOME_CTR_TABLE",
          payload: {
            data: homeCTRTable,
            loading: false,
          },
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  // load filtered data
  const dateFilter = async () => {
    if (!state.from) alert("From Date not Selected!");
    else if (!state.to) alert("To Date not Selected!");
    else {
      try {
        const x = await checkingWorkerUtilizationData(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID),
          inputSHIFT
        );
        dispatch({
          type: "WORKER_UTILIZATION",
          payload: { data: x.workerUtilization, loading: false },
        });

        const y = await crowdingInstanceCheckingData(state.from, state.to);
        dispatch({
          type: "CROWDING_INSTANCE",
          payload: { data: y.crowdingInstancesData, loading: false },
        });

        const homeWorkerTable = await detailedSummaryByWorkerChecking(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID)
          // inputSHIFT
        );
        if (homeWorkerTable !== "no data") {
          dispatch({
            type: "HOME_WORKER_TABLE",
            payload: {
              data: homeWorkerTable,
              loading: false,
            },
          });
        }

        const homeDateTable = await summaryByViolationData(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID)
          // inputSHIFT
        );
        if (
          homeDateTable.detailedSummaryByViolation.violationSummary !==
          "no data"
        ) {
          dispatch({
            type: "HOME_DATE_TABLE",
            payload: {
              data: homeDateTable.detailedSummaryByViolation.violationSummary,
              loading: false,
            },
          });
        }

        const homeMachineTable = await detailedSummaryByTableChecking(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID)
          // inputSHIFT
        );
        if (
          homeMachineTable.detailedSummaryByMachineId
            .violationSummaryByMachineId !== "no data"
        ) {
          dispatch({
            type: "HOME_MACHINE_TABLE",
            payload: {
              data:
                homeMachineTable.detailedSummaryByMachineId
                  .violationSummaryByMachineId,
              loading: false,
            },
          });
        }

        const homeCTRTable = await detailedSummaryByClpCtrChecking(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID)
          // inputSHIFT
        );
        if (homeCTRTable !== "no data") {
          dispatch({
            type: "HOME_CTR_TABLE",
            payload: {
              data: homeCTRTable,
              loading: false,
            },
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // Use Effects
  useEffect(() => {
    getFirstDay_LastDay();
    load_ctr_machine();
    loadData();
  }, []);

  return (
    <Grid
      sm={12}
      container
      alignItems="center"
      style={{ padding: "18px 6px 4px 6px" }}
    >
      <Grid
        container
        item
        xs={12}
        sm={4}
        lg={2}
        style={{ justifyContent: "center" }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginRight: "6px" }}
        >
          <InputLabel keyid="demo-simple-select-outlined-label">CTR</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            multiple
            value={inputCTR}
            onChange={(e) => setInputCTR(e.target.value)}
            label="CTR"
            // multiple
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {clpCtr &&
              clpCtr.map((item, index) => (
                <MenuItem value={item.ctrs} key={index}>
                  {item.ctrs}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        container
        item
        xs={12}
        sm={4}
        lg={2}
        style={{ justifyContent: "center" }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginRight: "6px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Table ID
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            multiple
            value={inputMACHINEid}
            onChange={(e) => setInputMACHINEid(e.target.value)}
            label="Machine ID"
            // multiple
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {machineID &&
              machineID.map((item, index) => (
                <MenuItem value={item.machineID} key={index}>
                  {item.machineID}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        container
        item
        xs={12}
        sm={4}
        lg={2}
        style={{ justifyContent: "center" }}
      >
        <TextField
          key="from"
          id="fromDate"
          label="From"
          value={state.from}
          type="date"
          style={{ marginRight: "6px" }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e) => dispatch({ type: "FROM", payload: e.target.value })}
          fullWidth
        />
      </Grid>

      <Grid
        container
        item
        xs={12}
        sm={4}
        lg={2}
        style={{ justifyContent: "center" }}
      >
        <TextField
          key="to"
          id="toDate"
          label="To"
          type="date"
          value={state.to}
          style={{ marginRight: "6px" }}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => dispatch({ type: "TO", payload: e.target.value })}
          fullWidth
        />
      </Grid>

      <Grid
        container
        item
        xs={12}
        sm={4}
        lg={2}
        style={{ justifyContent: "center" }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginRight: "6px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Shift</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            multiple
            value={inputSHIFT}
            onChange={(e) => setInputSHIFT(e.target.value)}
            label="Shift"
            // multiple
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid
        container
        item
        // sm={12}
        xs={6}
        sm={4}
        lg={1}
        style={{ justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={dateFilter}
        >
          <FilterListIcon />
          Filter
        </Button>
      </Grid>
      <Grid
        container
        item
        // sm={12}
        xs={6}
        sm={4}
        lg={1}
        style={{ justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="primary"
          // style={{ margin: "10px" }}
          // onClick={dateFilter}
          onClick={() => {
            refreshData();
            setInputCTR([]);
            setInputMACHINEid([]);
            setInputSHIFT([]);
          }}
        >
          <RefreshIcon />
          Refresh
        </Button>
      </Grid>
      {/* <GraphData
        workerUtilization={workerUtilization}
        crowdingInstance={crowdingInstance}
      /> */}

      <Grid container xs={12} spacing={2} style={{ padding: "12px 16px" }}>
        <Grid container item xs={12} sm={6} lg={4}>
          <Paper
            style={{ width: "100%", padding: "8px", minHeight: "280px" }}
            elevation={5}
          >
            {/* {breakdownData.loading ? (
              <Loader />
            ) : (
              <DonutChartSimple data={breakdownData.data} />
            )} */}
            <DefectChart />
          </Paper>
        </Grid>
        <Grid container item xs={12} sm={6} lg={4}>
          <Paper
            style={{
              width: "100%",
              padding: "8px",
              minHeight: "280px",
            }}
            elevation={5}
          >
            {state.workerUtilization.loading ? (
              <Loader />
            ) : (
              <DonutChartChecking
                totalTime={state?.workerUtilization?.data?.totalTime}
                idleDueToWorkerUnavailable={
                  state?.workerUtilization?.data?.idleDueToWorkerUnavailable
                }
                feedUnavailibilityDuration={
                  state?.workerUtilization?.data?.feedUnavailibilityDuration
                }
                other={state?.workerUtilization?.data?.other}
                utilizationPercentage={
                  state?.workerUtilization?.data?.utilizationPercentage
                }
                payload_data={1}
                link={"/checking/violationLog"}
              />
            )}
          </Paper>
        </Grid>
        <Grid container item xs={12} sm={12} lg={4}>
          <Paper
            elevation={5}
            style={{
              width: "100%",
              padding: "8px",
              minHeight: "280px",
              overflow: "hidden",
            }}
          >
            {state.crowdingInstance.loading ? (
              <Loader />
            ) : (
              <AreaChartChecking
                payload_data={0}
                link={"/checking/violationLog"}
                data={state.crowdingInstance.data}
              />
            )}
          </Paper>
        </Grid>
      </Grid>

      <TableData
        homeWorkerTable={state.homeWorkerTable.data}
        homeDateTable={state.homeDateTable.data}
        homeMachineTable={state.homeMachineTable.data}
        homeCTRTable={state.homeCTRTable.data}
      />
    </Grid>
  );
}
