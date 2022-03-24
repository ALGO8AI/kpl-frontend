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
  checkingHomeByTable,
  checkingHomeDate,
  checkingHomeWorker,
  checkingWorkerUtilizationData,
  defectChartData,
  getAllTableId,
} from "../../../services/api.service";
import { useDispatch } from "react-redux";
import { CheckingContext } from "../../../context/CheckingContext";
import { weekRange } from "../../../Utility/DateRange";
import Styles from "./HomeV2.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  openSnackbar_FROM,
  openSnackbar_TO,
} from "../../../redux/CommonReducer/CommonAction";
import { theme } from "../../../Utility/constants";
import ReactApexChart from "react-apexcharts";
import Loader from "../../../components/loader/Loader";
import AreaChartChecking from "../../../components/areaChart/AreaChartChecking";

export default function HomeV2() {
  // context
  const { state, dispatch } = React.useContext(CheckingContext);
  // State
  const [clpCtr, setClpCtr] = useState([]);
  const [machineID, setMachineID] = useState([]);
  const [inputCTR, setInputCTR] = useState([]);
  const [inputMACHINEid, setInputMACHINEid] = useState([]);
  const [inputSHIFT, setInputSHIFT] = useState([]);
  const [typeOfRange, setTypeOfRange] = useState("weekly");

  // React dispatch
  const Dispatch = useDispatch();

  // Functions

  // handle date range
  const handleDateRange = (value) => {
    var myDate = new Date();
    var newDateWeekBack = new Date(myDate.getTime() - 60 * 60 * 24 * 7 * 1000);
    var newDateMonthBack = new Date(
      myDate.getTime() - 60 * 60 * 24 * 30 * 1000
    );
    setTypeOfRange(value);
    switch (value) {
      case "weekly":
        dispatch({
          type: "FROM",
          payload: newDateWeekBack.toISOString().slice(0, 10),
        });
        dispatch({
          type: "TO",
          payload: myDate.toISOString().slice(0, 10),
        });
        break;
      case "monthly":
        dispatch({
          type: "FROM",
          payload: newDateMonthBack.toISOString().slice(0, 10),
        });
        dispatch({
          type: "TO",
          payload: myDate.toISOString().slice(0, 10),
        });
        break;
      case "custom":
        dispatch({
          type: "FROM",
          payload: weekRange()[0],
        });
        dispatch({
          type: "TO",
          payload: weekRange()[1],
        });
        break;
      default:
        return null;
    }
  };

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
      const defect = await defectChartData();
      dispatch({
        type: "DEFECT_CHART",
        payload: {
          data: defect,
          loading: false,
        },
      });

      const y = await checkingWorkerUtilizationData();
      dispatch({
        type: "WORKER_UTILIZATION",
        payload: {
          data: y.workerUtilization,
          loading: false,
        },
      });

      const z = await crowdingInstanceCheckingData();
      dispatch({
        type: "CROWDING_INSTANCE",
        payload: {
          data: z.crowdingInstancesData,
          loading: false,
        },
      });

      const homeWorkerTable = await checkingHomeWorker();
      dispatch({
        type: "HOME_WORKER_TABLE",
        payload: {
          data: homeWorkerTable?.detailedSummaryByWorker,
          loading: false,
        },
      });

      const homeDateTable = await checkingHomeDate();
      dispatch({
        type: "HOME_DATE_TABLE",
        payload: {
          data: homeDateTable.detailedSummaryByDate,
          loading: false,
        },
      });

      const homeMachineTable = await checkingHomeByTable();
      dispatch({
        type: "HOME_MACHINE_TABLE",
        payload: {
          data: homeMachineTable?.detailedSummaryByTableId,
          loading: false,
        },
      });

      const homeCTRTable = await detailedSummaryByClpCtrChecking();
      dispatch({
        type: "HOME_CTR_TABLE",
        payload: {
          data: homeCTRTable?.data,
          loading: false,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // load ctr filter dropdown data
  const load_ctr_table = async () => {
    try {
      const ctr = await ctr_machineID();
      const tableIds = await getAllTableId();
      setClpCtr(ctr?.clpctr);
      setMachineID(tableIds?.data);
      dispatch({
        type: "TABLE_ID",
        payload: tableIds?.data,
      });
      dispatch({
        type: "CTR",
        payload: ctr?.clpctr,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // load initial table data
  const loadData = async () => {
    try {
      if (state?.defectChart?.loading) {
        const defect = await defectChartData();
        console.log(defect);
        Boolean(defect) &&
          dispatch({
            type: "DEFECT_CHART",
            payload: {
              data: defect,
              loading: false,
            },
          });
      }

      if (state?.workerUtilization?.loading) {
        const y = await checkingWorkerUtilizationData();
        console.log(y);
        Boolean(y?.workerUtilization) &&
          dispatch({
            type: "WORKER_UTILIZATION",
            payload: {
              data: y?.workerUtilization,
              loading: false,
            },
          });
      }

      if (state?.crowdingInstance?.loading) {
        const z = await crowdingInstanceCheckingData();
        console.log(z);
        Boolean(z?.crowdingInstancesData) &&
          dispatch({
            type: "CROWDING_INSTANCE",
            payload: {
              data: z?.crowdingInstancesData,
              loading: false,
            },
          });
      }

      if (state?.homeWorkerTable?.loading) {
        const homeWorkerTable = await checkingHomeWorker();
        console.log(homeWorkerTable);
        Boolean(homeWorkerTable?.detailedSummaryByWorker) &&
          dispatch({
            type: "HOME_WORKER_TABLE",
            payload: {
              data: homeWorkerTable?.detailedSummaryByWorker,
              loading: false,
            },
          });
      }

      if (state?.homeDateTable?.loading) {
        const homeDateTable = await checkingHomeDate();
        console.log(homeDateTable);
        Boolean(homeDateTable?.detailedSummaryByDate) &&
          dispatch({
            type: "HOME_DATE_TABLE",
            payload: {
              data: homeDateTable?.detailedSummaryByDate,
              loading: false,
            },
          });
      }

      if (state?.homeCTRTable?.loading) {
        const homeCTRTable = await detailedSummaryByClpCtrChecking();
        console.log(homeCTRTable);
        Boolean(homeCTRTable?.data) &&
          dispatch({
            type: "HOME_CTR_TABLE",
            payload: {
              data: homeCTRTable?.data,
              loading: false,
            },
          });
      }
      if (state.homeMachineTable.loading) {
        const homeMachineTable = await checkingHomeByTable();
        console.log(homeMachineTable);
        Boolean(homeMachineTable?.detailedSummaryByTableId) &&
          dispatch({
            type: "HOME_MACHINE_TABLE",
            payload: {
              data: homeMachineTable?.detailedSummaryByTableId,
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
        const defect = await defectChartData(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.tableId),
          inputSHIFT
        );
        dispatch({
          type: "DEFECT_CHART",
          payload: {
            data: defect,
            loading: false,
          },
        });
        const x = await checkingWorkerUtilizationData(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.tableId),
          inputSHIFT
        );
        dispatch({
          type: "WORKER_UTILIZATION",
          payload: {
            data: x?.workerUtilization,
            loading: false,
          },
        });

        const y = await crowdingInstanceCheckingData(
          state.from,
          state.to,
          inputSHIFT
        );
        dispatch({
          type: "CROWDING_INSTANCE",
          payload: {
            data: y?.crowdingInstancesData,
            loading: false,
          },
        });

        const homeWorkerTable = await checkingHomeWorker(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.tableId),
          inputSHIFT
        );
        if (homeWorkerTable !== "no data") {
          dispatch({
            type: "HOME_WORKER_TABLE",
            payload: {
              data: homeWorkerTable?.detailedSummaryByWorker,
              loading: false,
            },
          });
        }

        const homeDateTable = await checkingHomeDate(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.tableId),
          inputSHIFT
        );
        if (homeDateTable.detailedSummaryByDate !== "no data") {
          dispatch({
            type: "HOME_DATE_TABLE",
            payload: {
              data: homeDateTable?.detailedSummaryByDate,
              loading: false,
            },
          });
        }

        const homeMachineTable = await checkingHomeByTable(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.tableId),
          inputSHIFT
        );
        if (homeMachineTable?.detailedSummaryByTableId !== "no data") {
          dispatch({
            type: "HOME_MACHINE_TABLE",
            payload: {
              data: homeMachineTable?.detailedSummaryByTableId,
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
            : machineID.map((item) => item.tableId),
          inputSHIFT
        );
        if (homeCTRTable !== "no data") {
          dispatch({
            type: "HOME_CTR_TABLE",
            payload: {
              data: homeCTRTable?.data,
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
    dispatch({
      type: "FROM",
      payload: weekRange()[0],
    });

    dispatch({
      type: "TO",
      payload: weekRange()[1],
    });
    load_ctr_table();
    loadData();
  }, []);
  return (
    <Grid
      sm={12}
      container
      alignItems="center"
      style={{ padding: "18px 6px 4px 6px" }}
    >
      {/* filter */}
      <Grid container item xs={12}>
        <Grid
          container
          item
          xs={6}
          sm={4}
          lg={typeOfRange === "custom" ? 1 : 2}
          style={{ justifyContent: "center" }}
        >
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginRight: "6px" }}
          >
            <InputLabel keyid="demo-simple-select-outlined-label">
              CTR
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              multiple
              value={inputCTR}
              onChange={(e) => setInputCTR(e.target.value)}
              label="CTR"
              // multiple
            >
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
          xs={6}
          sm={4}
          lg={typeOfRange === "custom" ? 1 : 2}
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
              {machineID &&
                machineID
                  ?.sort((a, b) => (a?.tableId > b?.tableId ? 1 : -1))
                  .map((item, index) => (
                    <MenuItem value={item.tableId} key={index}>
                      {item.tableId}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          container
          item
          xs={6}
          sm={4}
          lg={2}
          style={{
            justifyContent: "center",
            marginRight: "8px",
          }}
        >
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginRight: "6px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Date Range
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={typeOfRange}
              onChange={(e) => handleDateRange(e.target.value)}
              label="Machine ID"
              // multiple
            >
              <MenuItem value={"weekly"}>Weekly</MenuItem>
              <MenuItem value={"monthly"}>Monthly</MenuItem>
              <MenuItem value={"custom"}>Custom</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {typeOfRange === "custom" && (
          <>
            <Grid
              container
              item
              xs={6}
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
                // onChange={(e) => dispatch({ type: "FROM", payload: e.target.value })}
                onChange={(e) => {
                  e.target.value > state.to
                    ? Dispatch(openSnackbar_FROM())
                    : dispatch({
                        type: "FROM",
                        payload: e.target.value,
                      });
                }}
                fullWidth
              />
            </Grid>

            <Grid
              container
              item
              xs={6}
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
                // onChange={(e) => dispatch({ type: "TO", payload: e.target.value })}

                onChange={(e) => {
                  e.target.value < state.from
                    ? Dispatch(openSnackbar_TO())
                    : dispatch({
                        type: "TO",
                        payload: e.target.value,
                      });
                }}
                fullWidth
              />
            </Grid>
          </>
        )}

        <Grid
          container
          item
          xs={4}
          sm={4}
          lg={typeOfRange === "custom" ? 1 : 2}
          style={{ justifyContent: "center" }}
        >
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
              value={inputSHIFT}
              onChange={(e) => setInputSHIFT(e.target.value)}
              label="Shift"
              // multiple
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          container
          item
          // sm={12}
          xs={4}
          sm={4}
          lg={1}
          style={{ justifyContent: "center" }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: theme.BLUE,
              margin: "10px",
              color: "white",
            }}
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
          xs={4}
          sm={4}
          lg={1}
          style={{ justifyContent: "center" }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: theme.BLUE,
              margin: "10px",
              color: "white",
            }}
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
      </Grid>
      {/* charts */}
      <Grid container item xs={12} sm={12} lg={12}>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          <RepairedBahgDonut />
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          <DefectPercentageDonut />
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          <Top5Defects />
        </Grid>
        <Grid
          className={Styles.ChartContainer}
          xs={12}
          sm={12}
          md={3}
          lg={3}
        ></Grid>
        <Grid
          className={Styles.ChartContainer}
          xs={12}
          sm={12}
          md={4}
          lg={4}
        ></Grid>
        <Grid
          className={Styles.ChartContainer}
          xs={12}
          sm={12}
          md={4}
          lg={4}
        ></Grid>
        <Grid
          className={Styles.ChartContainer}
          xs={12}
          sm={12}
          md={4}
          lg={4}
        ></Grid>
      </Grid>
    </Grid>
  );
}

// components

// Chart 1
function RepairedBahgDonut() {
  const series = [8, 12, 80];
  const options = {
    colors: ["#094573", "#ffce38", "#ffa643"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    chart: {
      type: "donut",
    },
    labels: ["Repaired", "Rejected", "Okay"],
  };
  return (
    <div className={Styles.Card}>
      <h3>Repaired Bags %</h3>
      <div className={Styles.Content}>
        <div className={Styles.Left}>
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width={200}
          />
        </div>
        <div className={Styles.Right2}>
          <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Total Bags</p>
            <p style={{ color: "grey" }}>100</p>
          </div>
          <hr />
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#094573",
              }}
            ></div>
            <p style={{ color: "#094573" }}>Repaired Bags</p>
            <p style={{ color: "#094573" }}>8</p>
          </div>
          <hr />
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#ffce38",
              }}
            ></div>
            <p style={{ color: "#ffce38" }}>Rejected Bags</p>
            <p style={{ color: "#ffce38" }}>12</p>
          </div>
          <hr />
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#ffa643",
              }}
            ></div>
            <p style={{ color: "#ffa643" }}>Okay Bags</p>
            <p style={{ color: "#ffa643" }}>80</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// chart 2
function DefectPercentageDonut() {
  const series = [13, 87];
  const options = {
    colors: ["#094573", "#ffce38", "#ffa643"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    chart: {
      type: "donut",
    },
    labels: ["Defected", "Not Defected"],
  };
  return (
    <div className={Styles.Card}>
      <h3>Defect %</h3>
      <div className={Styles.Content}>
        <div className={Styles.Left}>
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width={200}
          />
        </div>
        <div className={Styles.Right2}>
          <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Total Bags</p>
            <p style={{ color: "grey" }}>100</p>
          </div>
          <hr />
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#094573",
              }}
            ></div>
            <p style={{ color: "#094573" }}>Defected</p>
            <p style={{ color: "#094573" }}>13</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// chart 3
function Top5Defects() {
  const series = [13, 87];
  const options = {
    colors: ["#094573", "#ffce38", "#ffa643"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    chart: {
      type: "donut",
    },
    labels: ["Defected", "Not Defected"],
  };
  return (
    <div className={Styles.Card}>
      <h3>Top 5</h3>
      <div className={Styles.Content}>
        <div className={Styles.Center}>
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width={200}
          />
        </div>
      </div>
    </div>
  );
}
