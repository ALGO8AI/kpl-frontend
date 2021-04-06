import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  ClpCtrData,
  crowdingInstanceData,
  ctr_machineID,
  homepageData,
  machineData,
  summaryByViolationData,
  summaryByWorkerData,
  workerUtilizationData,
} from "../../../services/api.service";
import GraphData from "./GraphData";
import TableData from "./TableData";

function Home() {
  // State
  const [WEEK, setWEEK] = useState([]);
  const [TO, setTO] = useState(null);
  const [FROM, setFROM] = useState(null);
  const [ctrDrop, setCtrDrop] = useState();
  const [clpCtr, setClpCtr] = useState([]);
  const [machineID, setMachineID] = useState([]);
  const [inputCTR, setInputCTR] = useState([]);
  const [inputMACHINEid, setInputMACHINEid] = useState([]);
  const [homeWorkerTable, setHomeWorkerTable] = useState([]);
  const [homeDateTable, setHomeDateTable] = useState([]);
  const [homeMachineTable, setHomeMachineTable] = useState([]);
  const [homeCTRTable, setHomeCTRTable] = useState([]);
  const [workerUtilization, setWorkerUtilization] = useState([]);
  const [crowdingInstance, setCrowdingInstance] = useState([]);

  // Functions

  // get week days function
  const getFirstDay_LastDay = async () => {
    var curr = new Date(); // get current date
    // console.log(new Date().toISOString().slice(0, 10));
    var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    var firstDay = new Date(curr.setDate(first)).toISOString().slice(0, 10);

    let week = [];
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }
    // console.log(week);
    setWEEK(week);
    setTO(new Date().toISOString().slice(0, 10));
    setFROM(firstDay);
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
      const x = await homepageData();

      const y = await workerUtilizationData();
      setWorkerUtilization(y.workerUtilization);

      const z = await crowdingInstanceData();
      setCrowdingInstance(z.crowdingInstancesData);

      const homeWorkerTable = await summaryByWorkerData();
      setHomeWorkerTable(homeWorkerTable.detailedSummaryByWorker);
      console.log(homeWorkerTable.detailedSummaryByWorker.length);

      const homeDateTable = await summaryByViolationData();
      setHomeDateTable(
        homeDateTable.detailedSummaryByViolation.violationSummary
      );
      console.log(
        homeDateTable.detailedSummaryByViolation.violationSummary.length
      );

      const homeMachineTable = await machineData();

      setHomeMachineTable(
        homeMachineTable.detailedSummaryByMachineId.violationSummaryByMachineId
      );
      console.log(
        homeMachineTable.detailedSummaryByMachineId.violationSummaryByMachineId
          .length
      );

      const homeCTRTable = await ClpCtrData();

      setHomeCTRTable(
        homeCTRTable.detailedSummaryByClpCtr.detailedSummaryByClpCtr
      );

      console.log(
        homeCTRTable.detailedSummaryByClpCtr.detailedSummaryByClpCtr.length
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  // load filtered data
  const dateFilter = async () => {
    if (!FROM) alert("From Date not Selected!");
    else if (!TO) alert("To Date not Selected!");
    else {
      try {
        console.log("in try");
        const x = await workerUtilizationData(
          FROM,
          TO,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID)
        );
        // console.log(x);

        setWorkerUtilization(x.workerUtilization);
        const y = await crowdingInstanceData(FROM, TO);
        // console.log(`y ${y}`);
        setCrowdingInstance(y.crowdingInstancesData);

        const homeWorkerTable = await summaryByWorkerData(
          FROM,
          TO,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID)
        );
        console.log(homeWorkerTable.detailedSummaryByWorker.length);

        if (homeWorkerTable.detailedSummaryByWorker !== "no data") {
          setHomeWorkerTable(homeWorkerTable.detailedSummaryByWorker);
        }

        const homeDateTable = await summaryByViolationData(
          FROM,
          TO,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID)
        );
        console.log(
          homeDateTable.detailedSummaryByViolation.violationSummary.length
        );
        if (
          homeDateTable.detailedSummaryByViolation.violationSummary !==
          "no data"
        ) {
          setHomeDateTable(
            homeDateTable.detailedSummaryByViolation.violationSummary
          );
        }

        const homeMachineTable = await machineData(
          FROM,
          TO,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID)
        );
        console.log(
          homeMachineTable.detailedSummaryByMachineId
            .violationSummaryByMachineId.length
        );
        if (
          homeMachineTable.detailedSummaryByMachineId
            .violationSummaryByMachineId !== "no data"
        ) {
          setHomeMachineTable(
            homeMachineTable.detailedSummaryByMachineId
              .violationSummaryByMachineId
          );
        }

        const homeCTRTable = await ClpCtrData(
          FROM,
          TO,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID)
        );
        console.log(
          homeCTRTable.detailedSummaryByClpCtr.detailedSummaryByClpCtr.length
        );
        if (
          homeCTRTable.detailedSummaryByClpCtr.detailedSummaryByClpCtr !==
          "no data"
        ) {
          setHomeCTRTable(
            homeCTRTable.detailedSummaryByClpCtr.detailedSummaryByClpCtr
          );
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
      spacing={2}
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
          value={FROM}
          type="date"
          style={{ marginRight: "6px" }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e) => setFROM(e.target.value)}
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
          value={TO}
          style={{ marginRight: "6px" }}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setTO(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid
        container
        item
        // sm={12}
        xs={6}
        sm={4}
        lg={2}
        style={{ justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={dateFilter}
        >
          Filter
        </Button>
      </Grid>
      <Grid
        container
        item
        // sm={12}
        xs={6}
        sm={4}
        lg={2}
        style={{ justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="primary"
          // style={{ margin: "10px" }}
          // onClick={dateFilter}
          // onClick={() => {
          //   getWorkerData();
          //   getFirstDay_LastDay();
          //   loadData();
          //   setLOAD(true);
          //   setInputCTR([]);
          //   setInputMACHINEid([]);
          // }}
        >
          Refresh
        </Button>
      </Grid>
      <GraphData
        workerUtilization={workerUtilization}
        crowdingInstance={crowdingInstance}
      />
      <TableData
        homeWorkerTable={homeWorkerTable}
        homeDateTable={homeDateTable}
        homeMachineTable={homeMachineTable}
        homeCTRTable={homeCTRTable}
      />
    </Grid>
  );
}

export default Home;
