/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Grid,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Switch,
  TextField,
  FormControlLabel,
  Snackbar,
  AppBar,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import { theme, wings } from "../../../Utility/constants";
import { StitchingContext } from "../../../context/StitchingContext";
import {
  ctr_machineID,
  getAllWorketrList,
  getAllWorketrListChecking,
  getCheckingSchedule,
  getUnassignedCLPCTR,
} from "../../../services/api.service";
import { Alert, Autocomplete } from "@material-ui/lab";
import { CheckingContext } from "../../../context/CheckingContext";
import { getAllTableIdV3 } from "../../../redux/CheckingReducer/CheckingV3Action";
import { useDispatch } from "react-redux";
import {
  copyWorkerScheduleV3,
  saveWorkerScheduleV3,
} from "../../../services/checking.api";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container item xs={12} style={{ padding: "18px" }}>
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

function WorkerScheduleV2() {
  // state & selector
  const { state, dispatch } = React.useContext(CheckingContext);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [workerList, setWorkerList] = useState([]);
  const [clpCtr, setClpCtr] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [CTR, setCTR] = React.useState({});
  const [temp, setTemp] = useState(false);
  const [value, setValue] = React.useState(0);

  const [wingWiseShift, setWingWiseShift] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // dispatch
  const Dispatch = useDispatch();

  // call initial api
  const loadData = async () => {
    try {
      const tableIds = await getAllTableIdV3();
      Dispatch({
        type: "TABLE_ID",
        payload: tableIds?.data,
      });
      const worker = await getAllWorketrListChecking();
      setWorkerList(worker?.data);
      const x = await getCheckingSchedule();
      setScheduleData(x?.data);
      const unassign = await getUnassignedCLPCTR();
      // console.log(unassign?.data);
      setClpCtr(unassign?.data);
      // setScheduleData(x);

      //   const worker = await getAllWorketrList();
      //   setWorkerList(worker.data);
      //   const ctr = await ctr_machineID();
      //   setClpCtr(ctr?.clpctr);
    } catch (e) {}
  };

  const changeTablesParameters = (id, column, value) => {
    // console.log(id, column, value);
    const newScheduleData = scheduleData.map((item) =>
      item?.id === id
        ? {
            ...item,
            [column]: value,
          }
        : item
    );
    // console.log(newScheduleData);
    setScheduleData(newScheduleData);
  };

  const changeWorkerIdAndName = (id, value) => {
    const i = workerList.findIndex((item) => item.workerId === value);
    const newScheduleData = scheduleData.map((item) =>
      item?.id === id
        ? {
            ...item,
            workerId: workerList[i].workerId,
            workerName: workerList[i].workerName,
          }
        : item
    );
    // console.log(newScheduleData);
    setScheduleData(newScheduleData);
  };

  const saveTable = async (id) => {
    try {
      let userData = scheduleData?.filter((item) => item?.id === id)[0];
      console.log(userData);
      let date = new Date(userData?.dateTime);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      const formData = {
        date: `${year}-${month}-${day}`,
        workerId: userData?.workerId,
        workerName: userData?.workerName,
        shift: userData?.shift,
        wing: userData?.wing,
        tableId: userData?.tableId,
        tableOnOff: scheduleData?.filter((item) => item?.id === id)[0]
          ?.tableOnOff
          ? "1"
          : "0",
        ctr: userData?.ctr,
        clpctr: userData?.clpctr,
        ...CTR[id],
      };
      console.log(formData);
      // if (!formData?.workerId) {
      //   setSeverity("error");
      //   setMsg("Please select worker");
      //   setOpen(true);
      //   return;
      // } else if (
      //   !formData?.ctr ||
      //   formData?.ctr === "" ||
      //   formData?.ctr === undefined ||
      //   formData?.ctr === "undefined" ||
      //   formData?.ctr === null
      // ) {
      //   setSeverity("error");
      //   setMsg("Please select ctr");
      //   setOpen(true);
      //   return;
      // }
      // const resp = await saveWorkerScheduleV3(formData);
      // setMsg(resp.message);
      // setSeverity("success");
      // setOpen(true);
      // loadData();
    } catch (e) {
      console.log(e);
      setMsg(e.message);
      setSeverity("error");
      setOpen(true);
      loadData();
    }
  };
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const copySchedule = async () => {
    try {
      const resp = await copyWorkerScheduleV3();
      console.log(resp);
      setMsg(resp?.msg);
      setSeverity("success");
      setOpen(true);
      loadData();
      // console.log(wingWiseShift);
    } catch (e) {}
  };

  const setNewCtr = (e, t, id) => {
    console.log(e);
    const current = clpCtr.findIndex((item) => item?.CtrNo === t?.CtrNo);
    console.log(current);
    setCTR({
      ...CTR,
      [id]: {
        clpctr: `${clpCtr[current]?.Clp}-${clpCtr[current]?.CtrNo}`,
        ctrId: clpCtr[current]?.id,
        ctr: clpCtr[current]?.CtrNo,
      },
    });
    const newScheduleData = scheduleData.map((item) =>
      item?.id === id
        ? {
            ...item,
            ctr: clpCtr[current]?.CtrNo,
          }
        : item
    );
    // console.log(newScheduleData);
    setScheduleData(newScheduleData);
  };

  // use effect
  useEffect(() => {
    loadData();
    localStorage
      .getItem("kpl_line")
      .split(",")
      .map((item) => setWingWiseShift((prev) => ({ ...prev, [item]: 0 })));
  }, []);

  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        style={{
          marginBottom: "1rem",
        }}
      >
        <Button
          onClick={copySchedule}
          fullWidth
          variant="contained"
          style={{
            backgroundColor: theme.BLUE,
            color: "white",
            padding: "12px",
          }}
        >
          COPY TABLE
        </Button>
      </Grid>
      <Grid container item xs={12}>
        <AppBar position="static" className="customTab">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            {localStorage.getItem("kpl_line") &&
              localStorage
                .getItem("kpl_line")
                ?.split(",")
                .map((item, index) => (
                  <Tab label={item} {...a11yProps(index)} />
                ))}
          </Tabs>
        </AppBar>
        {localStorage.getItem("kpl_line") &&
          localStorage
            .getItem("kpl_line")
            ?.split(",")
            .map((line_item, line_index) => (
              <TabPanel value={value} index={line_index}>
                <AppBar position="static" className="customTab">
                  <Tabs
                    value={wingWiseShift[line_item]}
                    onChange={(e, t) => {
                      console.log(t);
                      setWingWiseShift({
                        ...wingWiseShift,
                        [line_item]: t,
                      });
                    }}
                    aria-label="simple tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {["A", "B", "C"].map((shift_item, shift_index) => (
                      <Tab label={shift_item} {...a11yProps(shift_index)} />
                    ))}
                  </Tabs>
                </AppBar>
                {["A", "B", "C"].map((shift_item, shift_Index) => (
                  <TabPanel
                    value={wingWiseShift[line_item]}
                    index={shift_Index}
                  >
                    <Typography variant="h6" style={{ margin: "1rem" }}>
                      LINE : {line_item}
                    </Typography>
                    <Typography variant="h6" style={{ margin: "1rem" }}>
                      SHIFT : {shift_item}
                    </Typography>
                    <Grid container item xs={12}>
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow
                              style={{
                                backgroundColor: theme.BLUE,
                                color: "white",
                              }}
                            >
                              {[
                                "ID",
                                "Date",
                                "Worker ID - Name",
                                "Worker Name",
                                "Shift",
                                "Line",
                                "Wing",
                                "Table ID",
                                "Table Status",
                                "CLP-CTR",
                                "Save",
                              ].map((item, index) => (
                                <TableCell
                                  key={index}
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  {item}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {scheduleData?.length > 0 &&
                              scheduleData
                                ?.filter(
                                  (item) =>
                                    item?.shift === shift_item &&
                                    item?.line === line_item
                                )
                                .map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{item?.id}</TableCell>
                                    <TableCell>
                                      {new Date(
                                        item?.dateTime
                                      ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                      <FormControl variant="outlined" fullWidth>
                                        {/* <InputLabel keyid="demo-simple-select-outlined-label">
                          Worker Id
                        </InputLabel> */}
                                        <Select
                                          labelId="demo-simple-select-outlined-label"
                                          id="demo-simple-select-outlined"
                                          value={item.workerId}
                                          name="supervisorName"
                                          fullWidth
                                          onChange={(event) =>
                                            changeWorkerIdAndName(
                                              item.id,
                                              event.target.value
                                            )
                                          }
                                          label=""
                                          // multiple
                                        >
                                          {workerList.length > 0 &&
                                            workerList
                                              ?.sort((a, b) =>
                                                a?.workerName > b?.workerName
                                                  ? 1
                                                  : -1
                                              )
                                              ?.map((item, index) => (
                                                <MenuItem
                                                  value={item.workerId}
                                                  key={index}
                                                >
                                                  {item.workerId} -{" "}
                                                  {item?.workerName}
                                                </MenuItem>
                                              ))}
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                    <TableCell>
                                      {item?.workerName?.trim()}
                                    </TableCell>
                                    <TableCell>
                                      {item?.shift}
                                      {/* <FormControl
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: "12px" }}
                      >
                       
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={item?.shift}
                          name="supervisorName"
                          fullWidth
                          onChange={(e) =>
                            changeTablesParameters(
                              item.id,
                              "shift",
                              e.target.value
                            )
                          }
                          label=""
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {["A", "B", "C"].map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}
                                    </TableCell>
                                    <TableCell>{item?.line}</TableCell>

                                    <TableCell>
                                      {/* <FormControl
                              variant="outlined"
                              fullWidth
                              style={{ marginBottom: "12px" }}
                            >
                            
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={item?.wing}
                                name="supervisorName"
                                fullWidth
                                onChange={(e) =>
                                  changeTablesParameters(
                                    item.id,
                                    "wing",
                                    e.target.value
                                  )
                                }
                                label=""
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {wings.map((item, index) => (
                                  <MenuItem value={item} key={index}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl> */}
                                      {item?.wing}
                                    </TableCell>
                                    <TableCell>{item?.tableId}</TableCell>
                                    <TableCell>
                                      <FormControlLabel
                                        // style={{ marginBottom: "12px" }}
                                        control={
                                          <Switch
                                            checked={item?.tableOnOff}
                                            onChange={(e) =>
                                              changeTablesParameters(
                                                item?.id,
                                                "tableOnOff",
                                                e.target.checked
                                              )
                                            }
                                            name="machineOnOffStatus"
                                            color="primary"
                                          />
                                        }
                                        label="Table Status"
                                      />
                                      {/* <Switch
                        // checked={Math.random() > 0.5 ? true : false}
                        checked={temp}
                        onChange={(e) => setTemp(e.target.value)}
                        // onChange={(e) =>
                        //   changeTablesParameters(
                        //     item?.id,
                        //     "tableOnOff",
                        //     e.target.checked
                        //   )
                        // }
                        // checked={item?.tableOnOff}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      /> */}
                                    </TableCell>
                                    <TableCell>
                                      <Autocomplete
                                        // id="combo-box-demo"
                                        onChange={(e, t) =>
                                          setNewCtr(e, t, item?.id)
                                        }
                                        options={clpCtr}
                                        getOptionLabel={(option) =>
                                          `${option.Clp}-${option.CtrNo}`
                                        }
                                        style={{ width: 150 }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label={item?.ctr}
                                            variant="outlined"
                                            placeholder={item?.ctr}
                                          />
                                        )}
                                      />
                                      {/* <FormControl
                              variant="outlined"
                              fullWidth
                              style={{ marginBottom: "12px" }}
                            >
                             
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={item?.ctr}
                                name="supervisorName"
                                fullWidth
                                onChange={(e) =>
                                  setNewCtr(e.target.value, item?.id)
                                }
                                label=""
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {clpCtr?.map((item, index) => (
                                  <MenuItem value={item.CtrNo} key={index}>
                                    {item.Clp}-{item.CtrNo}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl> */}
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        onClick={() => saveTable(item?.id)}
                                        fullWidth
                                        variant="contained"
                                        style={{
                                          backgroundColor: theme.BLUE,
                                          color: "white",
                                          padding: "12px",
                                        }}
                                      >
                                        SAVE
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </TabPanel>
                ))}
              </TabPanel>
            ))}
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default WorkerScheduleV2;
