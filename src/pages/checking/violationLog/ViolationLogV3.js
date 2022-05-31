/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
// import "./home.css";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

// import "./setting.css";

// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  violationByWorkerFChecking,
  ctr_machineID,
  crowdingViolationChecking,
  workerUnavailableViolationChecking,
  defectsViolation,
  getAllTableId,
  tailorSummary,
  productionSummary,
} from "../../../services/api.service";
import { Link } from "react-router-dom";
// import "./ViolationLog.css";
import * as moment from "moment";
// import { ViolationContext } from "../../context/ViolationContext";
import {
  AppBar,
  Checkbox,
  InputLabel,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import ViolationTable from "./ViolationTable";
import { CheckingContext } from "../../../context/CheckingContext";
import ImageDialog from "../../../components/imageDialog/ImageDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  openSnackbar_FROM,
  openSnackbar_TO,
} from "../../../redux/CommonReducer/CommonAction";
import { weekRange } from "../../../Utility/DateRange";
import { modifyPrevDate } from "../../../Utility/Utility";
import { shifts, stitchingLines } from "../../../Utility/constants";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {
  defectsLogsV3,
  productionLogsV3,
} from "../../../redux/CheckingReducer/CheckingV3Action";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      spacing={2}
      container
      item
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        marginTop: "8px",
        maxHeight: "90vh",
        overflow: "scroll",
      }}
    >
      {value === index && (
        <Grid container item>
          {children}
        </Grid>
      )}
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: "#fff",
    // padding: "12px 32px 12px 12px",
    borderRadius: "10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ViolationLogV3() {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { state, dispatch } = React.useContext(CheckingContext);

  // React dispatch
  const Dispatch = useDispatch();
  // React Selector
  const { allTableId, defectsLogs, productionLogs } = useSelector(
    (state) => state?.CheckV3
  );

  // use selector
  const filterEnable = useSelector((state) => state?.Stitch?.homeFilterEnable);

  // states

  const [loader, setLoader] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [idLabel, setIdLabel] = useState();
  const [link, setLink] = React.useState("");
  const [img, setImg] = React.useState();
  const [profile, setProfile] = React.useState({
    name: "",
    wid: "",
    role: "",
    floor: "",
    pic: "",
    schedule: "",
    actual: "",
    idealBd: "",
    idealFu: "",
    others: "",
  });
  const [openDialog, setOpenDialog] = React.useState(false);
  const [linkDialog, setLinkDialog] = React.useState("");
  const [clpCtr, setClpCtr] = useState([]);
  const [machineID, setMachineID] = useState([]);
  const [inputCTR, setInputCTR] = useState([]);
  const [inputMACHINEid, setInputMACHINEid] = useState([]);
  const [inputSHIFT, setInputSHIFT] = useState([]);
  const [inputLINE, setInputLINE] = useState([]);
  const [typeOfRange, setTypeOfRange] = useState("custom");

  // functions

  // handle date range
  const handleDateRange = (value) => {
    var myDate = new Date();
    setTypeOfRange(value);
    switch (value) {
      case "weekly":
        var newDateWeekBack = new Date(
          myDate.getTime() - 60 * 60 * 24 * 7 * 1000
        );
        dispatch({
          type: "VIO_FROM",
          payload: newDateWeekBack.toISOString().slice(0, 10),
        });
        dispatch({
          type: "VIO_TO",
          payload: myDate.toISOString().slice(0, 10),
        });
        break;
      case "monthly":
        var newDateMonthBack = new Date(
          myDate.getTime() - 60 * 60 * 24 * 30 * 1000
        );
        dispatch({
          type: "VIO_FROM",
          payload: newDateMonthBack.toISOString().slice(0, 10),
        });
        dispatch({
          type: "VIO_TO",
          payload: myDate.toISOString().slice(0, 10),
        });
        break;
      case "custom":
        dispatch({
          type: "VIO_FROM",
          payload: weekRange()[1],
        });
        dispatch({
          type: "VIO_TO",
          payload: weekRange()[1],
        });
        break;
      default:
        return null;
    }
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const getLink = (datas) => {
    setLinkDialog(datas);
    handleClickOpenDialog();
  };
  const classes = useStyles();

  const refreshData = async () => {
    setTypeOfRange("custom");
    dispatch({
      type: "VIO_FROM",
      payload: weekRange()[1],
    });

    dispatch({
      type: "VIO_TO",
      payload: weekRange()[1],
    });
    loadInitialData();
  };

  const dateFilter = async () => {
    Dispatch(
      defectsLogsV3(
        state.violationFrom,
        state.violationTo,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      )
    );
    Dispatch(
      productionLogsV3(
        state.violationFrom,
        state.violationTo,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      )
    );
  };

  const loadInitialData = async () => {
    Dispatch(defectsLogsV3());
    Dispatch(productionLogsV3());
  };

  useEffect(() => {
    dispatch({
      type: "VIO_FROM",
      payload: weekRange()[1],
    });

    dispatch({
      type: "VIO_TO",
      payload: weekRange()[1],
    });
    // loadInitialData();
  }, []);

  useEffect(() => {
    function callAPI() {
      loadInitialData();
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

  const [tabValue, setTabValue] = React.useState(state.violationTab);

  const handleTabChange = (event, newValue) => {
    // console.log(newValue);
    // setTabValue(newValue);
    dispatch({ type: "RESET_TABLE_PAGE" });
    dispatch({
      type: "VIOLATION_TAB",
      payload: newValue,
    });
    setLink("");
    setImg("");
    setIdLabel();
  };

  const rowClick = (event, rowData) => {
    // setLink(null);
    setLink(rowData.video);
    setImg(rowData.img);
    setIdLabel(rowData.Id);
    setSelectedRow(rowData.Id);
    if (tabValue === 3) {
      console.log(rowData);
      setProfile({
        name: rowData.name,
        wid: rowData.wid,
        role: rowData.role,
        floor: rowData.floor,
        pic: rowData.pic,
        schedule: rowData.schedule,
        actual: rowData.actual,
        idealBd: rowData.idealBd,
        idealFu: rowData.idealFu,
        others: rowData.others,
      });
      setTimeout(() => {
        console.log(profile);
      }, 2000);
    }
  };

  const returnClassName = (type) => {
    switch (type) {
      case "INCORRECT VIOLATION":
        return "Link-btn-grey";
      case "OPEN":
        return "Link-btn-red";
      case "CLOSED":
        return "Link-btn-green";
      default:
        return "Link-btn-red";
    }
  };

  const returnStatus = (type) => {
    switch (type) {
      case "INCORRECT VIOLATION":
        return "Incorrect";
      case "OPEN":
        return "Unresolved";
      case "CLOSED":
        return "Resolved";
      default:
        return "Unresolved";
    }
  };
  const returnStatusDefect = (type) => {
    switch (type) {
      case "incorrect violation":
        return "Rejected";
      case "not known":
        return "Not Repaired";
      case "open":
        return "Not Repaired";
      case "okay bag":
        return "Okay Bag";
      case "closed":
        return "Repaired";
      default:
        return "Not Repaired";
    }
  };

  const returnClassNameDefect = (type) => {
    switch (type) {
      case "incorrect violation":
        return "Link-btn-red";
      case "okay bag":
        return "Link-btn-yellow";
      case "rejected":
        return "Link-btn-red";
      case "not-repaired":
        return "Link-btn-orange";
      case "repaired":
        return "Link-btn-green";
      case "closed":
        return "Link-btn-green";
      default:
        return "Link-btn-orange";
    }
  };
  return (
    <>
      <ImageDialog
        open={openDialog}
        handleClickOpen={handleClickOpenDialog}
        handleClose={handleCloseDialog}
        link={linkDialog}
      />
      <Grid container>
        <Grid
          container
          item
          xs={12}
          spacing={1}
          style={{
            padding: "8px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={6} md={2} lg={typeOfRange === "custom" ? 1 : 2}>
            {/* <Autocomplete
              fullWidth
              multiple
              options={clpCtr}
              // value={inputCTR}
              disableCloseOnSelect
              getOptionLabel={(option) => option.ctrs}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.ctrs}
                </React.Fragment>
              )}
              // style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="CTR"
                  placeholder="CTR"
                />
              )}
              onChange={(e, t) => {
                setInputCTR(t.map((item) => item.ctrs));
              }}
            /> */}
            {/* <Autocomplete
              multiple
              value={inputCTR}
              id="combo-box-demo"
              options={clpCtr}
              getOptionLabel={(option) => `${option.ctrs}`}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="New CTR" variant="outlined" />
              )}
              onChange={(e, t) => {
                console.log(e);
                console.log(t?.ctrs);
                // const current = clpCtr.findIndex(
                //   (item) => item?.crts === t?.crts
                // );
                // console.log(current);
                setInputCTR([t?.ctrs]);
                // setCTR({
                //   ...CTR,
                //   CtrNo: unassignedCTR[current]?.CtrNo,
                //   id: unassignedCTR[current]?.id,
                // });
              }}
            /> */}
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
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

          <Grid item xs={6} md={2} lg={typeOfRange === "custom" ? 1 : 2}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
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
                label="Table ID"
                // multiple
              >
                {allTableId?.length !== 0 &&
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
            // style={{ justifyContent: "center", marginBottom: "8px" }}
          >
            <FormControl
              variant="outlined"
              fullWidth
              style={{ marginLeft: "6px" }}
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
              <Grid item xs={6} md={2}>
                <TextField
                  id="fromDate"
                  label="From"
                  type="date"
                  value={state.violationFrom}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    e.target.value > state.violationTo
                      ? Dispatch(openSnackbar_FROM())
                      : dispatch({
                          type: "VIO_FROM",
                          payload: e.target.value,
                        });
                  }}
                  // onChange={(e) =>
                  //   dispatch({ type: "VIO_FROM", payload: e.target.value })
                  // }
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  id="toDate"
                  label="To"
                  type="date"
                  value={state.violationTo}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // onChange={(e) =>
                  //   dispatch({ type: "VIO_TO", payload: e.target.value })
                  // }
                  onChange={(e) => {
                    e.target.value < state.violationFrom
                      ? Dispatch(openSnackbar_TO())
                      : dispatch({
                          type: "VIO_TO",
                          payload: e.target.value,
                        });
                  }}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </>
          )}
          <Grid
            container
            item
            xs={4}
            sm={6}
            lg={2}
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
                {shifts.map((item, index) => (
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
                Line
              </InputLabel>
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
            xs={4}
            md={1}
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
            xs={4}
            md={1}
            style={{ justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={refreshData}
            >
              <RefreshIcon />
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={12} style={{ padding: "1rem" }}>
          <AppBar position="sticky" className="customTab">
            <Tabs
              value={state.violationTab}
              onChange={handleTabChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Defects" {...a11yProps(0)} />
              <Tab label="Production Summary" {...a11yProps(1)} />
            </Tabs>
          </AppBar>

          <TabPanel value={state.violationTab} index={1}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={productionLogs}
                rowClick={rowClick}
                selectedRow={selectedRow}
                loading={loader}
                columns={[
                  {
                    field: "actionStatusV2",
                    title: "Details",
                    render: (rowData) =>
                      rowData?.defectName ? (
                        <Link
                          to={`/checking/violationDetails/${rowData.Id}`}
                          className={returnClassNameDefect(
                            rowData.actionStatus.toLowerCase()
                          )}
                          onClick={() => {
                            localStorage.setItem("VIOLATION", "defects");
                            localStorage.setItem(
                              "VIOLATION-TYPE",
                              "Defect Violation"
                            );
                            localStorage.setItem(
                              "VIOLATION-STATUS",
                              returnStatusDefect(
                                rowData.actionStatus.toLowerCase()
                              )
                            );
                          }}
                        >
                          {returnStatusDefect(
                            rowData.actionStatus.toLowerCase()
                          )}
                        </Link>
                      ) : (
                        <Link
                          to={`/checking/violationDetails/${rowData.Id}`}
                          className={"Link-btn-green"}
                          onClick={() => {
                            localStorage.setItem("VIOLATION", "defects");
                            localStorage.setItem(
                              "VIOLATION-TYPE",
                              "Defect Violation"
                            );
                            localStorage.setItem(
                              "VIOLATION-STATUS",
                              "Okay Bag"
                            );
                          }}
                        >
                          Okay Bag
                        </Link>
                      ),
                  },
                  // {
                  //   title: "Status",
                  //   field: "actionStatusV2",
                  // },
                  {
                    title: "Log ID",
                    field: "Id",
                  },

                  { title: "Bag ID", field: "bagId" },
                  {
                    title: "Table No.",
                    field: "table_no",
                  },
                  {
                    title: "Date",
                    field: "dateTime",
                    render: (rowData) => {
                      return modifyPrevDate(rowData.dateTime);
                    },
                  },
                  {
                    title: "CTR No.",
                    field: "ctr_no",
                  },
                  {
                    title: "Time",
                    field: "time",
                  },

                  {
                    title: "Checker ID",
                    field: "checker_emp_id",
                  },
                  {
                    title: "Checker Name",
                    field: "checker_name",
                  },

                  {
                    title: "Tailor No.",
                    field: "tailorNumber",
                    render: (x) => {
                      return x.tailorNumber
                        .split(",")
                        .map((item, x) => <p>{item}</p>);
                    },
                  },
                  {
                    title: "Tailor Name",
                    field: "tailorName",
                    render: (x) => {
                      return x.tailorName
                        .split(",")
                        .map((item, x) => <p>{item}</p>);
                    },
                  },

                  {
                    title: "Defect Name",
                    field: "defectName",
                    render: (x) => {
                      return x.defectName
                        .split(",")
                        .map((item, x) => <p>{item}</p>);
                    },
                  },
                  // { title: "Action Status", field: "actionStatus" },

                  { title: "Wing", field: "wing" },
                  { title: "Line", field: "line" },
                  { title: "Shift", field: "shift" },
                  {
                    title: "Supervisor ID",
                    field: "supervisorId",
                  },

                  {
                    title: "Supervisor Name",
                    field: "supervisorName",
                  },
                ]}
              />
            </Grid>
          </TabPanel>

          <TabPanel value={state.violationTab} index={0}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={defectsLogs}
                rowClick={rowClick}
                selectedRow={selectedRow}
                loading={loader}
                columns={[
                  {
                    field: "actionStatusV2",
                    title: "Details",
                    render: (rowData) => (
                      <Link
                        to={`/checking/violationDetails/${rowData.Id}`}
                        className={returnClassNameDefect(
                          rowData.actionStatus.toLowerCase()
                        )}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "defects");
                          localStorage.setItem(
                            "VIOLATION-TYPE",
                            "Defect Violation"
                          );
                          localStorage.setItem(
                            "VIOLATION-STATUS",
                            returnStatusDefect(
                              rowData.actionStatus.toLowerCase()
                            )
                          );
                        }}
                      >
                        {returnStatusDefect(rowData.actionStatus.toLowerCase())}
                      </Link>
                    ),
                  },
                  // {
                  //   title: "Status",
                  //   field: "actionStatusV2",
                  // },
                  {
                    title: "Violation ID",
                    field: "Id",
                  },
                  // {
                  //   title: "Status",
                  //   field: "query",
                  //   render: (rowData) => {
                  //     return rowData.query === "Not Resolved" ? (
                  //       <p
                  //         style={{
                  //           color: "rgb(249, 54, 54)",
                  //           backgroundColor: "rgba(249, 54, 54,0.2)",
                  //           padding: "4px 8px",
                  //           borderRadius: "4px",
                  //         }}
                  //       >
                  //         Not Resolved
                  //       </p>
                  //     ) : (
                  //       <p
                  //         style={{
                  //           color: "rgb(74, 170, 22)",
                  //           backgroundColor: "rgba(74, 170, 22,0.2)",
                  //           padding: "4px 8px",
                  //           borderRadius: "4px",
                  //         }}
                  //       >
                  //         Resolved
                  //       </p>
                  //     );
                  //   },
                  // },
                  // { title: "Violation Reason", field: "ViolationReason" },
                  { title: "Bag ID", field: "bagId" },
                  {
                    title: "Table No.",
                    field: "table_no",
                  },
                  {
                    title: "Date",
                    field: "dateTime",
                    render: (rowData) => {
                      // const NewDate = moment(new Date(rowData.dateTime))
                      //   .format("DD/MM/YYYY")
                      //   .toString();
                      // const d = rowData.dateTime;
                      return modifyPrevDate(rowData.dateTime);
                    },
                  },
                  {
                    title: "CTR No.",
                    field: "ctr_no",
                  },
                  {
                    title: "Time",
                    field: "time",
                  },

                  {
                    title: "Checker ID",
                    field: "checker_emp_id",
                  },
                  {
                    title: "Checker Name",
                    field: "checker_name",
                  },

                  {
                    title: "Tailor No.",
                    field: "tailorNumber",
                    render: (x) => {
                      return x.tailorNumber
                        .split(",")
                        .map((item, x) => <p>{item}</p>);
                    },
                  },
                  {
                    title: "Tailor Name",
                    field: "tailorName",
                    render: (x) => {
                      return x.tailorName
                        .split(",")
                        .map((item, x) => <p>{item}</p>);
                    },
                  },

                  {
                    title: "Defect Name",
                    field: "defectName",
                    render: (x) => {
                      return x.defectName
                        .split(",")
                        .map((item, x) => <p>{item}</p>);
                    },
                  },
                  // { title: "Action Status", field: "actionStatus" },

                  { title: "Wing", field: "wing" },
                  { title: "Line", field: "line" },
                  { title: "Shift", field: "shift" },
                  {
                    title: "Supervisor ID",
                    field: "supervisorId",
                  },

                  {
                    title: "Supervisor Name",
                    field: "supervisorName",
                  },
                ]}
              />
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
}

export default ViolationLogV3;