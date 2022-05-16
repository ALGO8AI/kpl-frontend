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
import { shifts } from "../../../Utility/constants";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

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

function ViolationLog1() {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { state, dispatch } = React.useContext(CheckingContext);

  // Reduc Dispatch
  const Dispatch = useDispatch();

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
  const [typeOfRange, setTypeOfRange] = useState("weekly");

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
          payload: weekRange()[0],
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
    Dispatch({
      type: "DISABLE_HOME_FILTER",
    });
    setInputCTR([]);
    setLoader(true);
    dispatch({
      type: "VIO_FROM",
      payload: weekRange()[0],
    });
    dispatch({
      type: "VIO_TO",
      payload: weekRange()[1],
    });

    const crowd = await crowdingViolationChecking();
    console.log(crowd);
    if (crowd?.crowdingData !== "no data") {
      dispatch({
        type: "CROWD_VIO",
        payload: {
          data: crowd?.crowdingData,
          loading: false,
        },
      });
    }

    const worker = await workerUnavailableViolationChecking();
    if (worker?.workerUnavailableDurationData === "no data") {
      dispatch({
        type: "WORKER_VIO",
        payload: {
          data: [],
          loading: false,
        },
      });
    } else {
      dispatch({
        type: "WORKER_VIO",
        payload: {
          data: worker?.workerUnavailableDurationData,
          loading: false,
        },
      });
    }

    const by_worker = await violationByWorkerFChecking();
    dispatch({
      type: "BY_WORKER_VIO",
      payload: {
        data: by_worker?.violationByWorkerData,
        loading: false,
      },
    });

    const defects = await defectsViolation();

    dispatch({
      type: "DEFECTS",
      payload: {
        data: defects?.data,
        loading: false,
      },
    });

    const prodSUm = await productionSummary();
    // console.table("Prod SUmmary");
    // console.table(defects);

    dispatch({
      type: "PRODUCTION_SUMMARY",
      payload: {
        data: prodSUm?.data,
        loading: false,
      },
    });

    const tailorSum = await tailorSummary(
      state.violationFrom,
      state.violationTo,
      inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
      inputMACHINEid.length > 0
        ? inputMACHINEid
        : machineID.map((item) => item.tableId),
      inputSHIFT
    );
    const def = tailorSum?.defectCols?.map((item) => item.defectName);
    const resp = tailorSum?.tailorSummary?.map((item, i) => {
      let error = {};
      const errs = def.map((item2) => {
        return item.defectName === item2
          ? { ...error, [item2]: item.defectCount }
          : { ...error, [item2]: 0 };
      });
      return {
        ...errs[0],
        ...errs[1],
        ...errs[2],
        ...errs[3],
        ...errs[4],
        ...errs[5],
        ...errs[6],
        ...errs[7],
        ...errs[8],
        ...errs[9],
        ...errs[10],
        ...errs[11],
        ...errs[12],
        ...errs[13],
        ...errs[14],
        ...errs[15],
        ...errs[16],
        ...errs[17],
        ...errs[18],
        ...errs[19],
        ...errs[20],
        ...errs[21],
        ...errs[22],
        ...errs[24],
        ...item,
      };
    });
    dispatch({
      type: "TAILOR_SUMMARY",
      payload: {
        data: resp,
        loading: false,
      },
    });
    setLoader(false);
  };

  const dateFilter = async () => {
    Dispatch({
      type: "ENABLE_HOME_FILTER",
    });
    try {
      setLoader(true);

      const crowd = await crowdingViolationChecking(
        state.violationFrom,
        state.violationTo,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      );
      console.log(crowd);
      if (crowd?.crowdingData !== "no data") {
        dispatch({
          type: "CROWD_VIO",
          payload: {
            data: crowd?.crowdingData,
            loading: false,
          },
        });
      }

      const defects = await defectsViolation(
        state.violationFrom,
        state.violationTo,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      );
      // console.log(defects?.data);

      dispatch({
        type: "DEFECTS",
        payload: {
          data: defects?.data,
          loading: false,
        },
      });

      // if (state.productionSummary.loading) {
      const prodSum = await productionSummary(
        state.violationFrom,
        state.violationTo,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      );
      // console.table("Prod SUmmary");
      // console.table(defects);

      dispatch({
        type: "PRODUCTION_SUMMARY",
        payload: {
          data: prodSum?.data,
          loading: false,
        },
      });
      // }

      const tailorSum = await tailorSummary(
        state.violationFrom,
        state.violationTo,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      );
      const def = tailorSum?.defectCols?.map((item) => item.defectName);
      const resp = tailorSum?.tailorSummary?.map((item, i) => {
        let error = {};
        const errs = def.map((item2) => {
          return item.defectName === item2
            ? { ...error, [item2]: item.defectCount }
            : { ...error, [item2]: 0 };
        });
        return {
          ...errs[0],
          ...errs[1],
          ...errs[2],
          ...errs[3],
          ...errs[4],
          ...errs[5],
          ...errs[6],
          ...errs[7],
          ...errs[8],
          ...errs[9],
          ...errs[10],
          ...errs[11],
          ...errs[12],
          ...errs[13],
          ...errs[14],
          ...errs[15],
          ...errs[16],
          ...errs[17],
          ...errs[18],
          ...errs[19],
          ...errs[20],
          ...errs[21],
          ...errs[22],
          ...errs[24],
          ...item,
        };
      });
      dispatch({
        type: "TAILOR_SUMMARY",
        payload: {
          data: resp,
          loading: false,
        },
      });

      const worker = await workerUnavailableViolationChecking(
        state.violationFrom,
        state.violationTo,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      );
      // console.log(worker?.workerUnavailableDurationData);
      if (worker?.workerUnavailableDurationData !== "no data") {
        dispatch({
          type: "WORKER_VIO",
          payload: {
            data: worker?.workerUnavailableDurationData,
            loading: false,
          },
        });
      }

      const by_worker = await violationByWorkerFChecking(
        state.violationFrom,
        state.violationTo,
        inputCTR,
        inputMACHINEid,
        inputSHIFT
      );
      // console.log(by_worker?.violationByWorkerData);
      if (by_worker?.violationByWorkerData !== "no data") {
        dispatch({
          type: "BY_WORKER_VIO",
          payload: {
            data: by_worker?.violationByWorkerData,
            loading: false,
          },
        });
      }
      setLoader(false);
    } catch (err) {}
  };

  const load_ctr_machine = async () => {
    try {
      const ctr = await ctr_machineID();
      setClpCtr(ctr?.clpctr);
      // setMachineID(ctr.machineID);

      const tableID = await getAllTableId();
      // console.log(tableID);
      setMachineID(tableID?.data);

      if (state.crowd.loading) {
        const crowd = await crowdingViolationChecking();
        console.log(crowd);
        if (crowd.crowdingData !== "no data") {
          dispatch({
            type: "CROWD_VIO",
            payload: {
              data: crowd?.crowdingData,
              loading: false,
            },
          });
        }
      }

      if (state.worker.loading) {
        const worker = await workerUnavailableViolationChecking();
        console.log(worker);
        if (worker.workerUnavailableDurationData === "no data") {
          dispatch({
            type: "WORKER_VIO",
            payload: {
              data: [],
              loading: false,
            },
          });
        } else {
          dispatch({
            type: "WORKER_VIO",
            payload: {
              data: worker?.workerUnavailableDurationData,
              loading: false,
            },
          });
        }
      }

      if (state.by_worker.loading) {
        const by_worker = await violationByWorkerFChecking();
        console.log(by_worker);

        dispatch({
          type: "BY_WORKER_VIO",
          payload: {
            data: by_worker?.violationByWorkerData,
            loading: false,
          },
        });
      }

      if (state.defects.loading) {
        const defects = await defectsViolation();
        console.log(defects?.data);

        dispatch({
          type: "DEFECTS",
          payload: {
            data: defects?.data,
            loading: false,
          },
        });
      }
      if (state.productionSummary.loading) {
        const defects = await productionSummary();
        // console.table("Prod SUmmary");
        // console.table(defects);

        dispatch({
          type: "PRODUCTION_SUMMARY",
          payload: {
            data: defects?.data,
            loading: false,
          },
        });
      }
      if (state.tailorSummary.loading) {
        const tailorSum = await tailorSummary();
        const def = tailorSum?.defectCols?.map((item) => item.defectName);
        const resp = tailorSum?.tailorSummary?.map((item, i) => {
          let error = {};
          const errs = def.map((item2) => {
            return item.defectName === item2
              ? {
                  ...error,
                  [item2]: item.defectCount,
                }
              : { ...error, [item2]: 0 };
          });
          return {
            ...errs[0],
            ...errs[1],
            ...errs[2],
            ...errs[3],
            ...errs[4],
            ...errs[5],
            ...errs[6],
            ...errs[7],
            ...errs[8],
            ...errs[9],
            ...errs[10],
            ...errs[11],
            ...errs[12],
            ...errs[13],
            ...errs[14],
            ...errs[15],
            ...errs[16],
            ...errs[17],
            ...errs[18],
            ...errs[19],
            ...errs[20],
            ...errs[21],
            ...errs[22],
            ...errs[24],
            ...item,
          };
        });
        dispatch({
          type: "TAILOR_SUMMARY",
          payload: {
            data: resp,
            loading: false,
          },
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    dispatch({
      type: "VIO_FROM",
      payload: weekRange()[0],
    });

    dispatch({
      type: "VIO_TO",
      payload: weekRange()[1],
    });
    load_ctr_machine();

    // const interval = setInterval(() => load_ctr_machine(), 60000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  useEffect(() => {
    function callAPI() {
      console.log("API Calling...");
      load_ctr_machine();
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
            <Autocomplete
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
            />
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
            {/* <FormControl
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
            </FormControl> */}
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
        {/* <Grid xs={12} style={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            style={{ padding: "2px", color: "#f68f1d" }}
          >
            Select to view the violation video
            <br />
            Note: If The video is unable to play, it might be under Process.
          </Typography>
        </Grid> */}
        {/* <Grid container item xs={12} md={4} style={{ padding: "12px" }}>
          {idLabel ? (
            <Grid
              xs={12}
              style={{
                // backgroundColor: "#f68f1d",
                // color: "white",
                fontWeight: "600",
                fontSize: "16px",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body1"
                style={{ padding: "6px", color: "#f68f1d" }}
              >
                {" "}
                Violation Id:{" "}
                <span style={{ fontWeight: "bold" }}>{idLabel}</span>
              </Typography>
              {link && (
                <ReactPlayer
                  key={link}
                  url={link.replace(".avi", ".mp4")}
                  controls={true}
                  //  muted={true}
                  //  playing={false}
                  width="80%"
                  height="auto"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              )
             
              }
            </Grid>
          ) : null}
        </Grid> */}

        {/* <Grid
          container
          item
          xs={12}
          sm={6}
          md={4}
          style={{
            padding: "12px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {img ? (
            <>
              {" "}
              <Typography
                variant="body1"
                style={{ padding: "6px", color: "#f68f1d" }}
              >
                {" "}
                Snapshot 1
              </Typography>
              <img
                src={img}
                onClick={() => getLink(img)}
                style={{ width: "80%" }}
                alt="profile"
              />
            </>
          ) : null}
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={4}
          style={{
            padding: "12px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {img ? (
            <>
              {" "}
              <Typography
                variant="body1"
                style={{ padding: "6px", color: "#f68f1d" }}
              >
                {" "}
                Snapshot 2
              </Typography>{" "}
              <img
                src={img}
                onClick={() => getLink(img)}
                style={{ width: "80%" }}
                alt="profile"
              />
            </>
          ) : null}
        </Grid> */}
        {/* <Grid
          container
          item
          md={4}
          xs={12}
          spacing={4}
          style={{ padding: "2rem" }}
        >
          <Grid xs={12}>
            {idLabel ? (
              <Grid
                xs={12}
                style={{
                  backgroundColor: "#f68f1d",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Violation Id:{idLabel}
              </Grid>
            ) : null}
            {link ? (
              <ReactPlayer
                key={link}
                url={link.replace(".avi", ".mp4")}
                controls={true}
                //  muted={true}
                //  playing={false}
                width="100%"
                height="240px"
                style={{ postition: "fixed" }}
              />
            ) : (
              <Grid
                xs={12}
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  minHeight: "240px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PlayCircleOutlineIcon />
                <Grid xs={12}>Select to view the violation video</Grid>
              </Grid>
            )}
            <Typography
              variant="h6"
              style={{ color: "#0e4a7b", padding: "6px" }}
            >
              Note: If The video is unable to play, it might be under Process.
            </Typography>
            {img ? (
              <Grid xs={12}>
                <img src={img} style={{ width: "100%" }} alt="profile" />
              </Grid>
            ) : null}
          </Grid>
        </Grid> */}
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
              {/* <Tab label="Worker Violation" {...a11yProps(1)} />
              <Tab label="Crowding Violation" {...a11yProps(2)} /> */}
              <Tab label="Checker Performance" {...a11yProps(1)} />
              <Tab label="Tailor Summary" {...a11yProps(2)} />
              <Tab label="Production Summary" {...a11yProps(3)} />

              {/* <Tab label="By Table" {...a11yProps(3)} /> */}
            </Tabs>
          </AppBar>

          <TabPanel value={state.violationTab} index={3}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.productionSummary.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                loading={loader}
                columns={[
                  {
                    field: "actionStatus",
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

          {/* <TabPanel value={state.violationTab} index={2}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.crowd.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                loading={loader}
                columns={[
                  {
                    field: "view",
                    title: "Details",
                    render: (rowData) => (
                      <Link
                        to={`/checking/violationDetails/${rowData.Id}`}
                        className={returnClassName(rowData.actionStatus)}
                        // className={`${
                        //   rowData.query === "Not Resolved"
                        //     ? "Link-btn-red"
                        //     : "Link-btn-green"
                        // }`}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "crowd");
                          localStorage.setItem(
                            "VIOLATION-TYPE",
                            "Crowding Violation"
                          );
                          localStorage.setItem(
                            "VIOLATION-STATUS",
                            returnStatus(rowData.actionStatus)
                          );
                        }}
                      >
                        {returnStatus(rowData.actionStatus)}
                      </Link>
                    ),
                  },
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
                  {
                    title: "Camera ID",
                    field: "CamID",
                  },
                  {
                    title: "Date",
                    field: "DateTime",
                    render: (rowData) => {
                      // const NewDate = moment(new Date(rowData.DateTime))
                      //   .format("DD/MM/YYYY")
                      //   .toString();
                      // return new Date(rowData.DateTime)
                      //   .toUTCString()
                      //   .slice(5, 16);
                      const d = rowData.DateTime;
                      return `${new Date(d).getUTCDate()}/${new Date(
                        d
                      ).getMonth() + 1}/${new Date(d).getFullYear()}`;
                    },
                  },
                  {
                    title: "Violation Duration(Min.)",
                    field: "CrowdingDuration",
                  },

                  {
                    title: "Start Time",
                    field: "crowdStartTime",
                  },
                  {
                    title: "End Time",
                    field: "crowdEndTime",
                  },

                  {
                    title: "Person(Max)",
                    field: "MaxPerson",
                  },
                  // { title: "Person(Min)", field: "MinPerson" },
                  // { title: "Violation Reason", field: "ViolationReason" },
                  { title: "Wing", field: "Wing" },
                  { title: "Shift", field: "shift" },
                  {
                    title: "Supervisor Name",
                    field: "supervisorName",
                  },
                ]}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={state.violationTab} index={1}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.worker.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                loading={loader}
                columns={[
                  {
                    field: "view",
                    title: "Details",
                    render: (rowData) => (
                      <Link
                        to={`/checking/violationDetails/${rowData.Id}`}
                        className={returnClassName(rowData.actionStatus)}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "feedUnavailable");
                          localStorage.setItem(
                            "VIOLATION-TYPE",
                            "Worker Violation"
                          );
                          localStorage.setItem(
                            "VIOLATION-STATUS",
                            returnStatus(rowData.actionStatus)
                          );
                        }}
                      >
                        {returnStatus(rowData.actionStatus)}
                      </Link>
                    ),
                  },
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
                  {
                    title: "Date",
                    field: "date",
                    render: (rowData) => {
                      // const NewDate = moment(new Date(rowData.date))
                      //   .format("DD/MM/YYYY")
                      //   .toString();
                      // return new Date(rowData.date).toUTCString().slice(5, 16);
                      const d = rowData.date;
                      return `${new Date(d).getUTCDate()}/${new Date(
                        d
                      ).getMonth() + 1}/${new Date(d).getFullYear()}`;
                    },
                  },
                  {
                    title: "Worker Name",
                    field: "workerName",
                  },

                  {
                    title: "Worker ID",
                    field: "workerID",
                  },
                  {
                    title: "Table ID",
                    field: "tableId",
                  },

                  {
                    title: "Violation Duration(Min.)",
                    field: "ViolationDuration",
                  },

                  {
                    title: "Start Time",
                    field: "startTime",
                  },
                  {
                    title: "End Time",
                    field: "endTime",
                  },
                  // { title: "Machine ID", field: "machineID" },
                  { title: "Wing", field: "wing" },
                  { title: "Shift", field: "shift" },
                  {
                    title: "Supervisor Name",
                    field: "supervisorName",
                  },
                ]}
              />
            </Grid>
          </TabPanel> */}

          <TabPanel value={state.violationTab} index={0}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.defects.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                loading={loader}
                columns={[
                  {
                    field: "actionStatus",
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

          <TabPanel value={state.violationTab} index={1}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.by_worker.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                loading={loader}
                columns={[
                  {
                    title: "Checker ID",
                    field: "checkerID",
                  },
                  {
                    title: "Checker Name",
                    field: "checkerName",
                  },
                  {
                    title: "Table ID",
                    field: "tableId",
                  },
                  { title: "Shift", field: "shift" },

                  {
                    title: "Worker N/A Duration Hrs.",
                    field: "violationDuration",
                  },
                  {
                    title: "No. Of Bags Checked",
                    field: "NoOfBagsChecked",
                  },
                  {
                    title: "No. Of Defects",
                    field: "NoOfDefects",
                  },
                ]}
              />
            </Grid>
          </TabPanel>
          <TabPanel value={state.violationTab} index={2}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.tailorSummary.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                loading={loader}
                columns={[
                  {
                    title: "Tailor ID",
                    field: "name",
                  },
                  {
                    title: "Tailor Name",
                    field: "workerName",
                  },
                  {
                    title: "Herackle -3 Layer",
                    field: "Herackle -3 Layer",
                  },
                  {
                    title: "Herackle - Open Stitch",
                    field: "Herackle - Open Stitch",
                  },
                  {
                    title: "Herackle- Fabric Pressed",
                    field: "Herackle- Fabric Pressed",
                  },
                  {
                    title: "Safety Open Stitch",
                    field: "Safety Open Stitch",
                  },
                  {
                    title: "Safety - Stitch Miss",
                    field: "Safety - Stitch Miss",
                  },
                  {
                    title: "Safety - Corner damage",
                    field: "Safety - Corner damage",
                  },
                  {
                    title: "Safety - Fabric Pressed",
                    field: "Safety - Fabric Pressed",
                  },
                  {
                    title: "Discharge -Stitch Open",
                    field: "Discharge -Stitch Open",
                  },
                  {
                    title: "Discharge -Filler cord",
                    field: "Discharge -Filler cord",
                  },
                  {
                    title: "Top - Open Stitch",
                    field: "Top - Open Stitch",
                  },
                  {
                    title: "Top - Filler cord",
                    field: "Top - Filler cord",
                  },
                  {
                    title: "Top - Label/Doc Pkt",
                    field: "Top - Label/Doc Pkt",
                  },
                  {
                    title: "Accs. - Open Stitch",
                    field: "Accs. - Open Stitch",
                  },
                  {
                    title: "Accs. - Stitch Miss",
                    field: "Accs. - Stitch Miss",
                  },
                  {
                    title: "Accs. -  Stitching overlap",
                    field: "Accs. -  Stitching overlap",
                  },
                  { title: "Juki", field: "Juki" },
                  { title: "Baffle", field: "Baffle" },
                  {
                    title: "Defective Fabric",
                    field: "Defective Fabric",
                  },
                  {
                    title: "Contamination",
                    field: "Contamination",
                  },
                  {
                    title: "Defective Webbing",
                    field: "Defective Webbing",
                  },
                  {
                    title: "Tie Damage",
                    field: "Tie Damage",
                  },
                  {
                    title: "Fabric Fray",
                    field: "Fabric Fray",
                  },
                  {
                    title: "Heat Cutter Damage",
                    field: "Heat Cutter Damage",
                  },
                ]}
              />
            </Grid>
          </TabPanel>

          {/* <TabPanel value={tabValue} index={3}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <ViolationTable
                data={state.by_worker.data}
                rowClick={rowClick}
                selectedRow={selectedRow}
                columns={[
                  { title: "Worker ID", field: "workerId" },
                  { title: "Worker Name", field: "workerName" },
                  {
                    title: "Table ID",
                    field: "machineId",
                  },
                  {
                    title: "Feed N/A Duration(Hrs.)",
                    field: "feedUnavailibilityDuration",
                  },
                  {
                    title: "Worker N/A Duration(Hrs.)",
                    field: "workerUnavailableViolationDuration",
                  },
                ]}
              />
            </Grid>
          </TabPanel> */}
        </Grid>
      </Grid>
    </>
  );
}

export default ViolationLog1;
