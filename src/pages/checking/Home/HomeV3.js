/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
  getDynamicClpCtrList,
  getDynamicMachineList,
  getDynamicTableList,
  getDynamicClpCtrListChecking,
} from "../../../services/api.service";
import { useDispatch, useSelector } from "react-redux";
import { CheckingContext } from "../../../context/CheckingContext";
import { weekRange } from "../../../Utility/DateRange";
import Styles from "./HomeV2.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  openSnackbar_FROM,
  openSnackbar_TO,
} from "../../../redux/CommonReducer/CommonAction";
import { stitchingLines, theme } from "../../../Utility/constants";
import ReactApexChart from "react-apexcharts";
import TableData from "./TableData";
import Loader from "../../../components/loader/Loader";
import {
  byClpCtrTableV3,
  byDateTableV3,
  byWorkerTableV3,
  checkerEfficiencyV3,
  checkerPerformanceV3,
  defectTrendV3,
  getAllTableIdV3,
  getCurrentCTRV3,
  homeDefectChartV3,
  homeRepairedChartV3,
  top3DefectesV3,
  top5DefectesV3,
  wingwiseSummaryV3,
} from "../../../redux/CheckingReducer/CheckingV3Action";
import { toBeValid } from "@testing-library/jest-dom/dist/matchers";
import { wingListV3, wingWiseLine } from "../../../services/checking.api";

export default function HomeV2() {
  // context
  const { state, dispatch } = React.useContext(CheckingContext);
  // State
  const [clpCtr, setClpCtr] = useState([]);
  const [machineID, setMachineID] = useState([]);
  const [inputCTR, setInputCTR] = useState([]);
  const [inputMACHINEid, setInputMACHINEid] = useState([]);
  const [inputSHIFT, setInputSHIFT] = useState([]);
  const [inputLINE, setInputLINE] = useState([]);
  const [typeOfRange, setTypeOfRange] = useState("custom");
  const [loading, setLoading] = useState(false);
  const [localFilter, setLocalFilter] = useState(false);
  const [lineList, setLineList] = useState([]);

  // React dispatch
  const Dispatch = useDispatch();
  // React Selector
  const {
    allTableId,
    defectedbags,
    top5Defectes,
    byWorkerTable,
    byClpCtrTable,
    byDateTable,
    repairedbags,
    top3Defectes,
    defectTrends,
    checkerEfficiency,
    checkerPerformance,
    wingWiseSummary,
    selectedWing,
  } = useSelector((state) => state?.CheckV3);

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
    setLocalFilter(true);
    setInputCTR([]);
    setInputMACHINEid([]);
    setInputSHIFT([]);
    Dispatch({
      type: "SET_SELECTED_WING",
      payload: "",
    });

    setInputLINE([]);
    Dispatch({
      type: "DISABLE_HOME_FILTER",
    });
    setTypeOfRange("custom");
    dispatch({
      type: "FROM",
      payload: weekRange()[1],
    });

    dispatch({
      type: "TO",
      payload: weekRange()[1],
    });
    loadData();
    setTimeout(() => {
      setLocalFilter(false);
    }, 3000);
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
    setLoading(true);
    Dispatch(getAllTableIdV3());
    Dispatch(homeRepairedChartV3());
    Dispatch(homeDefectChartV3());
    Dispatch(checkerEfficiencyV3());
    Dispatch(top5DefectesV3());
    Dispatch(top3DefectesV3());
    Dispatch(wingwiseSummaryV3());
    Dispatch(byWorkerTableV3());
    Dispatch(byClpCtrTableV3());
    Dispatch(byDateTableV3());
    Dispatch(defectTrendV3());
    Dispatch(checkerPerformanceV3());
    setLoading(false);
  };
  // load filtered data
  const dateFilter = async () => {
    console.log("Filter Enabled");
    setLocalFilter(true);
    setLoading(true);
    Dispatch({
      type: "ENABLE_HOME_FILTER",
    });
    Dispatch(
      homeRepairedChartV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT,
        inputLINE,
        Boolean(selectedWing) ? selectedWing : localStorage.getItem("kpl_wing")
      )
    );
    Dispatch(wingwiseSummaryV3(state.from, state.to));
    Dispatch(
      homeDefectChartV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT,
        inputLINE,
        Boolean(selectedWing) ? selectedWing : localStorage.getItem("kpl_wing")
      )
    );
    Dispatch(
      checkerPerformanceV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT,
        inputLINE,
        Boolean(selectedWing) ? selectedWing : localStorage.getItem("kpl_wing")
      )
    );

    Dispatch(
      checkerEfficiencyV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT,
        inputLINE,
        Boolean(selectedWing) ? selectedWing : localStorage.getItem("kpl_wing")
      )
    );

    Dispatch(
      top5DefectesV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT,
        inputLINE,
        Boolean(selectedWing) ? selectedWing : localStorage.getItem("kpl_wing")
      )
    );
    Dispatch(
      byWorkerTableV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT,
        inputLINE,
        Boolean(selectedWing) ? selectedWing : localStorage.getItem("kpl_wing")
      )
    );
    Dispatch(
      byClpCtrTableV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT,
        inputLINE,
        Boolean(selectedWing) ? selectedWing : localStorage.getItem("kpl_wing")
      )
    );
    Dispatch(
      byDateTableV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT,
        inputLINE,
        Boolean(selectedWing) ? selectedWing : localStorage.getItem("kpl_wing")
      )
    );
    setLoading(false);
    setTimeout(() => {
      setLocalFilter(false);
    }, 3000);
  };

  // Use Effects
  useEffect(() => {
    dispatch({
      type: "FROM",
      payload: weekRange()[1],
    });

    dispatch({
      type: "TO",
      payload: weekRange()[1],
    });
    // load_ctr_table();
  }, []);

  // use selector
  const filterEnable = useSelector((state) => state?.Stitch?.homeFilterEnable);

  useEffect(() => {
    function callAPI() {
      console.log("API CALL");
      loadData();
    }
    function getAlerts() {
      !filterEnable && callAPI();
    }
    getAlerts();
    const interval = setInterval(() => getAlerts(), 60000);
    return () => {
      clearInterval(interval);
    };
  }, [filterEnable]);

  const getTableDynamic = async () => {
    console.log("DYNAMIC MACHINE FILTER CALL");
    const body = {
      filterDateFrom: state?.from,
      filterDateTo: state?.to,
      shift: inputSHIFT,
      line: inputLINE,
    };

    try {
      const resp = await getDynamicTableList(body);
      setMachineID(resp?.allMachines);
    } catch (e) {}
  };

  const getCTRDynamic = async () => {
    try {
      console.log("DYNAMIC CLPFILTER CALL");
      const body = {
        tableId: inputMACHINEid,
        filterDateFrom: state?.from,
        filterDateTo: state?.to,
      };
      const resp = await getDynamicClpCtrListChecking(body);
      setClpCtr(resp?.clpctr);
    } catch (e) {}
  };

  const getLineDynamic = async (wing) => {
    try {
      // console.log("DYNAMIC CLPFILTER CALL");

      const resp = await wingWiseLine(wing);
      setLineList(resp?.data);
    } catch (e) {}
  };

  useEffect(() => {
    getCTRDynamic();
  }, [state?.from, state?.to, inputMACHINEid]);

  useEffect(() => {
    Dispatch(
      getCurrentCTRV3(
        selectedWing,
        inputLINE?.length === 0 ? lineList[0]?.line : inputLINE[0]
      )
    );
  }, [selectedWing, lineList, inputLINE]);

  useEffect(() => {
    getLineDynamic(selectedWing);
  }, [selectedWing]);

  useEffect(() => {
    getTableDynamic();
  }, [state?.from, state?.to, inputSHIFT, inputLINE]);

  useEffect(() => {
    loadData();
    // return () => {
    //   Dispatch({
    //     type: "SET_SELECTED_WING",
    //     payload: "",
    //   });
    // };
  }, [selectedWing]);

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
            <InputLabel id="demo-simple-select-outlined-label">Line</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              multiple
              value={inputLINE}
              onChange={(e) => setInputLINE(e.target.value)}
              label="Line"
              // multiple
            >
              {lineList?.map((item, index) => (
                <MenuItem key={index} value={item?.line}>
                  {item?.line}
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
          lg={1}
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
              style={{
                justifyContent: "center",
              }}
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
              style={{
                justifyContent: "center",
              }}
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
              <MenuItem value="C">C</MenuItem>
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
              {machineID?.length > 0 &&
                machineID.map((item, index) => (
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
                  <MenuItem value={item.ctr} key={index}>
                    {item.ctr}
                  </MenuItem>
                ))}
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
          {repairedbags?.length === 0 ? (
            <Loader />
          ) : (
            <RepairedBagDonut
              data={repairedbags}
              loading={loading}
              defectedbags={defectedbags}
              localFilter={localFilter}
            />
          )}
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          {defectedbags?.length === 0 ? (
            <Loader />
          ) : (
            <DefectPercentageDonut
              data={defectedbags}
              loading={loading}
              localFilter={localFilter}
              data2={repairedbags}
            />
          )}
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          {top5Defectes?.length === 0 ? (
            <Loader />
          ) : (
            <Top5Defects
              data={top5Defectes}
              loading={loading}
              localFilter={localFilter}
            />
          )}
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          {top3Defectes?.length === 0 ? (
            <Loader />
          ) : (
            <Top3Defects
              data={top3Defectes}
              loading={loading}
              localFilter={localFilter}
            />
          )}
        </Grid>

        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          {checkerEfficiency?.length === 0 ? (
            <Loader />
          ) : (
            <CheckingEfficiency
              loading={loading}
              data={checkerEfficiency}
              localFilter={localFilter}
            />
          )}
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          {defectTrends?.length === 0 ? (
            <Loader />
          ) : (
            <DefectTrend
              loading={loading}
              data={defectTrends}
              localFilter={localFilter}
            />
          )}
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          {checkerPerformance?.length === 0 ? (
            <Loader />
          ) : (
            <CheckingPerformance
              loading={loading}
              data={checkerPerformance}
              localFilter={localFilter}
            />
          )}
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          <PDIdefect loading={loading} />
        </Grid>
      </Grid>
      {/* comparison table */}
      <Grid container item xs={12} style={{ padding: "12px" }}>
        <Grid
          component={Paper}
          elevation={5}
          item
          xs={12}
          style={{ padding: "8px" }}
          className={Styles.SummaryTable_Container}
        >
          {/* <div className={Styles.Overlap}>
            <h3 className={Styles.overlapTitle}>Coming Soon</h3>
          </div> */}
          <Typography variant="h6">
            Wing-wise comparative summary{" "}
            <span>{localFilter && <Loader />}</span>
          </Typography>
          {/* table */}
          {wingWiseSummary?.length === 0 ? (
            <Loader />
          ) : (
            <WingWiseTable data={wingWiseSummary} localFilter={localFilter} />
          )}
        </Grid>
      </Grid>
      {/* tab view */}
      <TableData
        homeWorkerTable={byWorkerTable}
        homeDateTable={byDateTable}
        homeMachineTable={state.homeMachineTable.data}
        homeCTRTable={byClpCtrTable}
      />
    </Grid>
  );
}

// components

// Chart 1
function RepairedBagDonut({ data, loading, defectedbags, localFilter }) {
  const options = {
    colors: ["#094573", "#ffce38", "#ffa643", "#c47171"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    chart: {
      type: "donut",
    },
    labels: ["Repaired", "Rejected", "Not Repaired"],
  };
  return (
    <div className={Styles.Card}>
      <h3>
        Repaired Bags % <span>{localFilter && <Loader />}</span>
      </h3>
      {loading && <Loader />}
      <div className={Styles.Content}>
        <div className={Styles.Left}>
          <ReactApexChart
            options={options}
            series={[
              Boolean(data) ? data[1]?.noo : 0,
              Boolean(data) ? data[2]?.noo : 0,
              Boolean(data) ? data[0]?.noo : 0,
            ]}
            type="donut"
            width={200}
          />
        </div>
        <div className={Styles.Right2}>
          <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Bags For Repairing</p>
            <p style={{ color: "grey" }}>
              {data && data[0]?.noo + data[1]?.noo + data[2]?.noo}
            </p>
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
            <p style={{ color: "#094573" }}>{data && data[1]?.noo}</p>
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
            <p style={{ color: "#ffce38" }}>{data && data[2]?.noo}</p>
          </div>
          <hr />
          {/* <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#ffa643",
              }}
            ></div>
            <p style={{ color: "#ffa643" }}>Okay Bags</p>
            <p style={{ color: "#ffa643" }}>{data[3]?.noo}</p>
          </div>
          <hr /> */}
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#ffa643",
              }}
            ></div>
            <p style={{ color: "#ffa643" }}>Not Repaired</p>
            <p style={{ color: "#ffa643" }}>{data && data[0]?.noo}</p>
          </div>
        </div>
      </div>
      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Repaired Bags %{" "}
        {data &&
          (
            ((data[0]?.noo + data[1]?.noo + data[2]?.noo) /
              (data[0]?.noo + data[1]?.noo + data[2]?.noo + data[3]?.noo)) *
            100
          ).toFixed(2)}
      </h3>
    </div>
  );
}

// chart 2
function DefectPercentageDonut({ data, loading, localFilter, data2 }) {
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
    labels: ["Okay Bags", "Defective", "Total Bags Checked"],
  };
  return (
    <div className={Styles.Card}>
      <h3>
        Defect % <span>{localFilter && <Loader />}</span>
      </h3>
      {loading && <Loader />}

      <div className={Styles.Content}>
        <div className={Styles.Left}>
          <ReactApexChart
            options={options}
            series={[
              Boolean(data) ? Number(data[1][0]["Total Bags"]) : 0,
              Boolean(data) ? Number(data[0][0]["Total Defects"]) : 0,
              Boolean(data)
                ? Number(data[1][0]["Total Bags"]) +
                  Number(data2[0]?.noo) +
                  Number(data2[1]?.noo) +
                  Number(data2[2]?.noo)
                : 0,

              // Boolean(props.data?.totalBagsChecked)
              //   ? props.data?.totalBagsChecked
              //   : 0,
              // Boolean(props.data?.defectCount) ? props?.data?.defectCount : 0,
              // Boolean(props.data?.totalBagsChecked)
              //   ? props.data?.totalBagsChecked - props.data?.defectCount
              //   : 0,
            ]}
            type="donut"
            width={200}
          />
        </div>
        <div className={Styles.Right2}>
          {/* <div className={Styles.Data}>
            <p style={{ color: "grey" }}>% Defects</p>
            <p style={{ color: "grey" }}>
              {props.data?.totalDefectPercentage + "%"}
            </p>
          </div> */}
          <hr />
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#094573",
              }}
            ></div>
            <p style={{ color: "#094573" }}>Okay Bags</p>
            <p style={{ color: "#094573" }}>
              {data && data[1][0]["Total Bags"]}
            </p>
          </div>
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#ffce38",
              }}
            ></div>
            <p style={{ color: "#ffce38" }}>No. Of Defects</p>
            <p style={{ color: "#ffce38" }}>
              {data && data[0][0]["Total Defects"]}
            </p>
          </div>
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#ffa643",
              }}
            ></div>
            <p style={{ color: "#ffa643" }}>Total Bags</p>
            <p style={{ color: "#ffa643" }}>
              {data &&
                data2 &&
                parseInt(data[1][0]["Total Bags"]) +
                  data2[0]?.noo +
                  data2[1]?.noo +
                  data2[2]?.noo}
            </p>
          </div>
        </div>
      </div>
      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Defects %{" "}
        {data &&
          (
            (data[0][0]["Total Defects"] / data[1][0]["Total Bags"]) *
            100
          ).toFixed(2)}
      </h3>
    </div>
  );
}

// chart 3
function Top5Defects({ data, loading, localFilter }) {
  const DATA = {
    series: [
      {
        name: "Defects",
        data: data?.map((item) => item?.defectPercentage),
      },
    ],
    options: {
      chart: {
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top",
            formatter: function(val, opt) {
              return `${val} %`;
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function(val, opt) {
          return `${val} %`;
        },
      },
      colors: ["#f68f1d"],
      tooltip: {
        x: {
          formatter: undefined,
          title: {
            formatter: (value) => `${value} %`,
          },
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName) => `${seriesName} %`,
          },
        },
      },

      xaxis: {
        categories: data?.map((item) => item.defectName),
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        title: {
          text: "Top 5 Defects",
          style: {
            color: "#0e4a7b",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        title: {
          text: "Percentage",
          style: {
            color: "#0e4a7b",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
      },
    },
  };
  return (
    <div className={Styles.Card}>
      <h3>
        Top 5 Defects <span>{localFilter && <Loader />}</span>
      </h3>
      {loading && <Loader />}

      <div className={Styles.Content}>
        <div className={Styles.Center}>
          <ReactApexChart
            options={DATA.options}
            series={DATA.series}
            type="bar"
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
}

function Top3Defects({ data, loading, localFilter }) {
  const DATA = {
    series: [
      {
        name: "Defects",
        data: data?.map((item) => item?.defectPercentage),
      },
    ],
    options: {
      chart: {
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top",
            formatter: function(val, opt) {
              return `${val} %`;
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function(val, opt) {
          return `${val} %`;
        },
      },
      colors: ["#f68f1d"],
      tooltip: {
        x: {
          formatter: undefined,
          title: {
            formatter: (value) => `${value} %`,
          },
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName) => `${seriesName} %`,
          },
        },
      },

      xaxis: {
        categories: data?.map((item) => item.defectName),
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        title: {
          text: "Defect Name",
          style: {
            color: "#0e4a7b",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        title: {
          text: "Percentage",
          style: {
            color: "#0e4a7b",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
      },
    },
  };
  return (
    <div className={Styles.Card}>
      <h3>
        Most 3 Frequent Defects <span>{localFilter && <Loader />}</span>
      </h3>
      {loading && <Loader />}

      <div className={Styles.Content}>
        <div className={Styles.Center}>
          <ReactApexChart
            options={DATA.options}
            series={DATA.series}
            type="bar"
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
}

// chart 4
function DefectTrend({ loading, data, localFilter }) {
  const DATA = {
    series: [
      {
        name: "Defects",
        data: data?.map((item) => item?.defectPercentage),
      },
    ],
    options: {
      chart: {
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top",
            formatter: function(val, opt) {
              return `${val}%`;
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function(val, opt) {
          return val + "%";
        },
      },
      colors: ["#f68f1d"],
      tooltip: {
        x: {
          formatter: undefined,
          title: {
            formatter: (value) => `${value} %`,
          },
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName) => `${seriesName} %`,
          },
        },
      },

      xaxis: {
        categories: data?.map((item) => item?.weekk),
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        title: {
          text: "Week",
          style: {
            color: "#0e4a7b",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
        // title: {
        //   text: "Top 5 Defects",
        //   style: {
        //     color: "#0e4a7b",
        //     fontSize: "12px",
        //     fontWeight: 400,
        //   },
        // },
      },
      yaxis: {
        title: {
          text: "Percentage",
          style: {
            color: "#0e4a7b",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
      },
    },
  };
  return (
    <div className={Styles.Card}>
      {/* <div className={Styles.Overlap}>
        <h3 className={Styles.overlapTitle}>Coming Soon</h3>
      </div> */}
      <h3>
        Defect % Trend <span>{localFilter && <Loader />}</span>
      </h3>
      {loading && <Loader />}

      <div className={Styles.Content}>
        <div className={Styles.Center}>
          <ReactApexChart
            options={DATA.options}
            series={DATA.series}
            type="line"
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
}

// Chart 5
function CheckingEfficiency({ loading, data, localFilter }) {
  const series = [
    Boolean(data) ? Number(data[0]?.checkerEfficiency) : 0,
    Boolean(data) ? 100 - Number(data[0]?.checkerEfficiency) : 0,
  ];
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
    labels: ["Efficiency", "Non-Efficiency"],
  };
  return (
    <div className={Styles.Card}>
      {/* <div className={Styles.Overlap}>
        <h3 className={Styles.overlapTitle}>Coming Soon</h3>
      </div> */}
      <h3>
        Checking Efficiency % <span>{localFilter && <Loader />}</span>
      </h3>
      {loading && <Loader />}

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
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#094573",
              }}
            ></div>
            <p style={{ color: "#094573" }}>Efficient</p>
            <p style={{ color: "#094573" }}>
              {data && data[0]?.checkerEfficiency}
            </p>
          </div>
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#ffce38",
              }}
            ></div>
            <p style={{ color: "#ffce38" }}>Non-Efficient</p>
            <p style={{ color: "#ffce38" }}>
              {(data && 100 - data[0]?.checkerEfficiency)?.toFixed(2)}
            </p>
          </div>
          {/* <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Scheduled Time</p>
            <p style={{ color: "grey" }}>:</p>
            <p style={{ color: "grey" }}>8 hrs</p>
          </div>
          <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Operation Time</p>
            <p style={{ color: "grey" }}>:</p>
            <p style={{ color: "grey" }}>5 hrs</p>
          </div> */}
          {/* <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Bags Checked</p>
            <p style={{ color: "grey" }}>:</p>
            <p style={{ color: "grey" }}>200</p>
          </div> */}
          <hr />
        </div>
      </div>
    </div>
  );
}

// Chart 5
function CheckingPerformance({ loading, data, localFilter }) {
  const series = [
    Boolean(data) ? Number(data[0]?.checkerPerformance) : 0,
    Boolean(data) ? 100 - Number(data[0]?.checkerPerformance) : 0,
  ];
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
    labels: ["Performance", "Non-Performance"],
  };
  return (
    <div className={Styles.Card}>
      {/* <div className={Styles.Overlap}>
        <h3 className={Styles.overlapTitle}>Coming Soon</h3>
      </div> */}
      <h3>
        Checking Performance % <span>{localFilter && <Loader />}</span>
      </h3>
      {loading && <Loader />}

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
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#094573",
              }}
            ></div>
            <p style={{ color: "#094573" }}>Performance</p>
            <p style={{ color: "#094573" }}>
              {data && data[0]?.checkerPerformance}
            </p>
          </div>
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#ffce38",
              }}
            ></div>
            <p style={{ color: "#ffce38" }}>Non-Performance</p>
            <p style={{ color: "#ffce38" }}>
              {(data && 100 - data[0]?.checkerPerformance)?.toFixed(2)}
            </p>
          </div>
          {/* <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Available Time</p>
            <p style={{ color: "grey" }}>:</p>
            <p style={{ color: "grey" }}>6 hrs</p>
          </div>
          <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Operation Time</p>
            <p style={{ color: "grey" }}>:</p>
            <p style={{ color: "grey" }}>5 hrs</p>
          </div>
          <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Bags Checked</p>
            <p style={{ color: "grey" }}>:</p>
            <p style={{ color: "grey" }}>100</p>
          </div> */}
          <hr />
        </div>
      </div>
    </div>
  );
}

// Chart 6
function PDIdefect({ loading, localFilter }) {
  const series = [12, 88];
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
    labels: [],
  };
  return (
    <div className={Styles.Card}>
      <div className={Styles.Overlap}>
        <h3 className={Styles.overlapTitle}>Coming Soon</h3>
      </div>
      <h3>
        PDI Defect % <span>{localFilter && <Loader />}</span>
      </h3>
      {loading && <Loader />}

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
            <p style={{ color: "grey" }}>Batch Checked</p>
            <p style={{ color: "grey" }}>:</p>
            <p style={{ color: "grey" }}>25</p>
          </div>
          <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Abnormalities</p>
            <p style={{ color: "grey" }}>:</p>
            <p style={{ color: "grey" }}>3</p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

// comparative table
function WingWiseTable({ data }) {
  return (
    <div className={Styles.TableContainer}>
      <table>
        <thead>
          <tr>
            {[
              "Wing",
              "Defect %",
              "Repaired %",
              "Checker Efficiency",
              "Checker Performance",
            ].map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr>
              <td>{item?.wing}</td>
              <td>{item?.defectPer}</td>
              <td>{item?.repairedPer}</td>
              <td>{item?.checkerEfficiency}</td>
              <td>{item?.checkerPerformance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
