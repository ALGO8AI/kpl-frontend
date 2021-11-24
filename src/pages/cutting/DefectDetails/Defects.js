/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  workerUnavailableViolation,
  feedUnavailableViolation,
  crowdingViolation,
  violationByWorkerF,
  ctr_machineID,
  getMachineViolation,
  getFabricList,
} from "../../../services/api.service";
import { Link } from "react-router-dom";
// import "./ViolationLog.css";
import * as moment from "moment";
// import { ViolationContext } from "../../context/ViolationContext";
import { AppBar, InputLabel, Tab, Tabs } from "@material-ui/core";
import Table from "./Table";
import ImageDialog from "../../../components/imageDialog/ImageDialog";
import { CuttingContext } from "../../../context/CuttingContext";
import { defectViolation } from "../../../services/cuttingApi.service";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      // spacing={2}
      container
      item
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        // marginTop: "8px",
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

function Defects() {
  // context
  const { state, dispatch } = React.useContext(CuttingContext);

  const [selectedRow, setSelectedRow] = useState(null);
  const [idLabel, setIdLabel] = useState();
  const [link, setLink] = React.useState("");
  const [img, setImg] = React.useState("");
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
  const classes = useStyles();
  const [clpCtr, setClpCtr] = useState([]);
  const [machineID, setMachineID] = useState([]);
  const [fabricCategory, setInputFabric] = useState([]);
  const [inputMACHINEid, setInputMACHINEid] = useState([]);
  const [inputSHIFT, setInputSHIFT] = useState([]);
  const [fabricList, setFabricList] = useState([]);

  const getFirstDay_LastDay = async () => {
    var myDate = new Date();
    var newDateWeekBack = new Date(myDate.getTime() - 60 * 60 * 24 * 7 * 1000);

    if (Boolean(!state.violationFrom)) {
      dispatch({
        type: "VIO_FROM",
        payload: newDateWeekBack.toISOString().slice(0, 10),
      });
    }

    if (Boolean(!state.violationTo)) {
      dispatch({
        type: "VIO_TO",
        payload: myDate.toISOString().slice(0, 10),
      });
    }
  };

  const fetchData = async () => {
    try {
      const defectData = await defectViolation();
      dispatch({
        type: "DEFECT_VIO",
        payload: {
          data: defectData?.defectRecords,
          loading: false,
        },
      });
      const fabrics = await getFabricList();
      setFabricList(fabrics.data);
    } catch (e) {}
  };

  const dateFilter = async () => {
    try {
      const defectData = await defectViolation(
        state?.violationFrom,
        state?.violationTo,
        fabricCategory.length > 0
          ? fabricCategory
          : fabricList?.map((item, index) => item?.category),
        inputMACHINEid.length > 0 ? inputMACHINEid : ["MC04"],
        inputSHIFT
      );
      dispatch({
        type: "DEFECT_VIO",
        payload: {
          data: defectData?.defectRecords,
          loading: false,
        },
      });
    } catch (e) {}
  };

  useEffect(() => {
    getFirstDay_LastDay();
    fetchData();
    console.log("in Use effect");
  }, []);
  // const [state.violationTab, setTabValue] = React.useState(state.violationTab);

  const handleTabChange = (event, newValue) => {
    dispatch({ type: "VIOLATION_TAB", payload: newValue });
    setLink("");
    setImg("");
    setIdLabel();

    // setTabValue(newValue);
  };

  const returnClassName = (type) => {
    switch (type) {
      case "Confirm Defect":
        return "Link-btn-green";
      case "Not A Defect":
        return "Link-btn-yellow";
      case "Not Known":
        return "Link-btn-red";
      case "Not Resolved":
        return "Link-btn-red";
      default:
        return "Link-btn-red";
    }
  };

  const returnStatus = (type) => {
    switch (type) {
      case "Not Resolved":
        return "Unresolved";
      case "Not Known":
        return "Unresolved";
      default:
        return type;
    }
  };

  return (
    <>
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
          <Grid item xs={6} sm={6} md={2}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Roll Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                multiple
                value={fabricCategory}
                onChange={(e) => setInputFabric(e.target.value)}
                label="Fabric Category"
                // multiple
              >
                {fabricList?.map((item, index) => (
                  <MenuItem value={item?.category} key={index}>
                    {item?.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={6} md={2}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Machine ID
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
                {["MC04"].map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={6} md={2}>
            <TextField
              id="fromDate"
              label="From"
              type="date"
              value={state?.violationFrom}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                dispatch({ type: "VIO_FROM", payload: e.target.value })
              }
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6} sm={6} md={2}>
            <TextField
              id="toDate"
              label="To"
              type="date"
              value={state?.violationTo}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                dispatch({ type: "VIO_TO", payload: e.target.value })
              }
              fullWidth
              variant="outlined"
            />
          </Grid>

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
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            container
            item
            xs={4}
            md={1}
            sm={6}
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
            sm={6}
            style={{ justifyContent: "center" }}
          >
            <Button
              variant="contained"
              // color="primary"
              style={{ margin: "10px" }}
              onClick={() => {
                fetchData();
                setInputFabric([]);
                setInputMACHINEid([]);
                setInputSHIFT([]);
              }}
            >
              <RefreshIcon />
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={12} style={{ padding: "1rem" }}>
          <AppBar position="static" className="customTab">
            <Tabs
              value={state.violationTab}
              onChange={handleTabChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Defect Log" {...a11yProps(0)} />
            </Tabs>
          </AppBar>

          <TabPanel value={state.violationTab} index={0}>
            <Grid container item xs={12} style={{ padding: "12px" }}>
              <Table
                data={state?.defect?.data}
                // rowClick={rowClick}
                selectedRow={selectedRow}
                columns={[
                  {
                    field: "view",
                    title: "Defect Status",
                    render: (rowData) => (
                      <Link
                        to={`/cutting/violationDetails/${rowData.Id}`}
                        className={returnClassName(rowData.actionStatus)}
                        onClick={() => {
                          localStorage.setItem("VIOLATION", "defectRecord");
                          localStorage.setItem(
                            "VIOLATION-TYPE",
                            "Defect Record"
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
                  { title: "Violation ID", field: "Id" },
                  {
                    title: "Date",
                    field: "DateTime",
                    render: (rowData) => {
                      const NewDate = moment(new Date(rowData.date))
                        .format("DD/MM/YYYY")
                        .toString();
                      return NewDate;
                    },
                  },
                  { title: "Time", field: "time" },
                  {
                    title: "Roll Barcode No.",
                    field: "rollBarcodeNumber",
                  },
                  // { title: "Roll ID", field: "rollId" },
                  { title: "Machine ID", field: "machineId" },
                  { title: "Roll Category", field: "rollCategory" },
                  {
                    title: "Acceptance",
                    field: "acceptance",
                    render: (x) => {
                      return Boolean(Number(x.acceptance)) ? "Yes" : "No";
                    },
                  },
                  { title: "Total Meter Count", field: "rollLenght" },
                  { title: "Wastage (m)", field: "wasteLength" },
                  { title: "Shift", field: "shift" },
                  { title: "Operator Name", field: "operatorName" },

                  // { title: "Operator Id", field: "operatorId" },

                  // { title: "status", field: "Status" },
                  // { title: "Action Status", field: "actionStatus" },
                  // { title: "Supervisor Name", field: "supervisorName" },
                ]}
              />
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
}

export default Defects;
