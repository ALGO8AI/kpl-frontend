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
  getAllTableIdV3,
  homeDefectChartV3,
  homeRepairedChartV3,
  top5DefectesV3,
} from "../../../redux/CheckingReducer/CheckingV3Action";

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
  const loadData = () => {
    console.log("CheckingV3");
    Dispatch(getAllTableIdV3());
    Dispatch(homeRepairedChartV3());
    Dispatch(homeDefectChartV3());
    Dispatch(top5DefectesV3());
    Dispatch(byWorkerTableV3());
    Dispatch(byClpCtrTableV3());
    Dispatch(byDateTableV3());
  };
  // load filtered data
  const dateFilter = async () => {
    Dispatch(
      homeRepairedChartV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      )
    );
    Dispatch(
      homeDefectChartV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      )
    );
    Dispatch(
      top5DefectesV3(state.from, state.to, inputCTR, inputMACHINEid, inputSHIFT)
    );
    Dispatch(
      byWorkerTableV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      )
    );
    Dispatch(
      byClpCtrTableV3(
        state.from,
        state.to,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      )
    );
    Dispatch(
      byDateTableV3(state.from, state.to, inputCTR, inputMACHINEid, inputSHIFT)
    );
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
              {allTableId?.length > 0 &&
                allTableId.map((item, index) => (
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
              <MenuItem value="C">C</MenuItem>
            </Select>
          </FormControl>
        </Grid>

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
              {stitchingLines.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
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
            <RepairedBagDonut data={repairedbags} />
          )}
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          {defectedbags?.length === 0 ? (
            <Loader />
          ) : (
            <DefectPercentageDonut data={defectedbags} />
          )}
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          {top5Defectes?.length === 0 ? (
            <Loader />
          ) : (
            <Top5Defects data={top5Defectes} />
          )}
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={3} lg={3}>
          <DefectTrend />
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={4} lg={4}>
          <CheckingEfficiency />
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={4} lg={4}>
          <CheckingPerformance />
        </Grid>
        <Grid className={Styles.ChartContainer} xs={12} sm={12} md={4} lg={4}>
          <PDIdefect />
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
          <Typography variant="h6">Wing-wise comparative summary</Typography>
          {/* table */}
          <WingWiseTable />
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
function RepairedBagDonut({ data }) {
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
            series={[data[0]?.noo, data[1]?.noo, data[2]?.noo]}
            type="donut"
            width={200}
          />
        </div>
        <div className={Styles.Right2}>
          <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Total Bags</p>
            <p style={{ color: "grey" }}>
              {data[0]?.noo + data[1]?.noo + data[2]?.noo}
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
            <p style={{ color: "#094573" }}>{data[0]?.noo}</p>
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
            <p style={{ color: "#ffce38" }}>{data[1]?.noo}</p>
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
            <p style={{ color: "#ffa643" }}>{data[2]?.noo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// chart 2
function DefectPercentageDonut({ data }) {
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
    labels: ["Total Bags Checked", "Defective", "Non-Defective"],
  };
  return (
    <div className={Styles.Card}>
      <h3>Defect %</h3>
      <div className={Styles.Content}>
        <div className={Styles.Left}>
          <ReactApexChart
            options={options}
            series={[
              data[1][0]["Total Bags"],
              data[0][0]["Total Defects"],
              data[1][0]["Total Bags"] - data[0][0]["Total Defects"],

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
            <p style={{ color: "#094573" }}>Total</p>
            <p style={{ color: "#094573" }}>{data[1][0]["Total Bags"]}</p>
          </div>
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#ffce38",
              }}
            ></div>
            <p style={{ color: "#ffce38" }}>Defected</p>
            <p style={{ color: "#ffce38" }}>{data[0][0]["Total Defects"]}</p>
          </div>
          <div className={Styles.Data}>
            <div
              className={Styles.Dot}
              style={{
                backgroundColor: "#ffa643",
              }}
            ></div>
            <p style={{ color: "#ffa643" }}>Non Defected</p>
            <p style={{ color: "#ffa643" }}>
              {data[1][0]["Total Bags"] - data[0][0]["Total Defects"]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// chart 3
function Top5Defects({ data }) {
  const DATA = {
    series: [
      {
        name: "Defects",
        data: data?.map((item) => item.defectPercentage),
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
      <h3>Top 5 Defects</h3>
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
function DefectTrend() {
  const DATA = {
    series: [
      {
        name: "Defects",
        data: [1, 2, 3, 4, 5],
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
        categories: [1, 2, 3, 4, 5],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
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
      <h3>Defect % Trend</h3>
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
function CheckingEfficiency() {
  const series = [32, 68];
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
      <h3>Checking Efficiency %</h3>
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
            <p style={{ color: "grey" }}>Scheduled Time</p>
            <p style={{ color: "grey" }}>:</p>
            <p style={{ color: "grey" }}>8 hrs</p>
          </div>
          <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Operation Time</p>
            <p style={{ color: "grey" }}>:</p>
            <p style={{ color: "grey" }}>5 hrs</p>
          </div>
          <div className={Styles.Data}>
            <p style={{ color: "grey" }}>Bags Checked</p>
            <p style={{ color: "grey" }}>:</p>
            <p style={{ color: "grey" }}>200</p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

// Chart 5
function CheckingPerformance() {
  const series = [45, 55];
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
      <h3>Checking Performance %</h3>
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
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

// Chart 6
function PDIdefect() {
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
      <h3>PDI Defect %</h3>
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
function WingWiseTable() {
  return (
    <table>
      <thead>
        <tr>
          {[
            "",
            "Wing 1",
            "Wing 2",
            "Wing 3",
            "Wing 4",
            "Wing 5",
            "Wing 6",
            "Wing 7",
          ].map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[
          {
            type: "Repaired Bags %",
            wing1: 8,
            wing2: 7,
            wing3: 6,
            wing4: 12,
            wing5: 11,
            wing6: 5,
            wing7: 9,
          },
          {
            type: "Defects %",
            wing1: 8,
            wing2: 7,
            wing3: 6,
            wing4: 12,
            wing5: 11,
            wing6: 5,
            wing7: 9,
          },
          {
            type: "Checking Efficiency %",
            wing1: 8,
            wing2: 7,
            wing3: 6,
            wing4: 12,
            wing5: 11,
            wing6: 5,
            wing7: 9,
          },
          {
            type: "Checking Performance %",
            wing1: 8,
            wing2: 7,
            wing3: 6,
            wing4: 12,
            wing5: 11,
            wing6: 5,
            wing7: 9,
          },
          {
            type: "PDI Defects %",
            wing1: 8,
            wing2: 7,
            wing3: 6,
            wing4: 12,
            wing5: 11,
            wing6: 5,
            wing7: 9,
          },
        ].map((item, index) => (
          <tr>
            <td>{item.type}</td>
            <td>{item.wing1}</td>
            <td>{item.wing2}</td>
            <td>{item.wing3}</td>
            <td>{item.wing4}</td>
            <td>{item.wing5}</td>
            <td>{item.wing6}</td>
            <td>{item.wing7}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
