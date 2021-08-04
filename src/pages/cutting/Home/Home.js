import React from "react";
import DefectSummaryCard from "./DefectSummaryCard";
import Graph from "./Graph";
import "./Home.css";
import MaterialTable from "material-table";
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
import Defect from "./Defect";
import TableDataCutting from "./TableDataCutting";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";

const tableData = [
  {
    ctrNo: "455",
    machineId: "Machine 1",
    rollID: "khg123",
    wastage: "90%",
    defect_percentage: "51%",
    foodGrade: "64%",
    acceptance: "52%",
    cod: "52",
  },
  {
    ctrNo: "545",
    machineId: "Machine 2",
    rollID: "fvd123",
    wastage: "50%",
    defect_percentage: "54%",
    foodGrade: "51%",
    acceptance: "41%",
    cod: "55",
  },
  {
    ctrNo: "411",
    machineId: "Machine 4",
    rollID: "sdf123",
    wastage: "60%",
    defect_percentage: "62%",
    foodGrade: "74%",
    acceptance: "63%",
    cod: "54",
  },
  {
    ctrNo: "821",
    machineId: "Machine 3",
    rollID: "dfv123",
    wastage: "90%",
    defect_percentage: "74%",
    foodGrade: "82%",
    acceptance: "63%",
    cod: "62",
  },
  {
    ctrNo: "745",
    machineId: "Machine 7",
    rollID: "asd123",
    wastage: "10%",
    defect_percentage: "84%",
    foodGrade: "84%",
    acceptance: "66%",
    cod: "62",
  },
  {
    ctrNo: "417",
    machineId: "Machine 8",
    rollID: "tht123",
    wastage: "25%",
    defect_percentage: "92%",
    foodGrade: "12%",
    acceptance: "71%",
    cod: "67",
  },
  {
    ctrNo: "742",
    machineId: "Machine 6",
    rollID: "wsd123",
    wastage: "70%",
    defect_percentage: "71%",
    foodGrade: "62%",
    acceptance: "95%",
    cod: "50",
  },
  {
    ctrNo: "751",
    machineId: "Machine 4",
    rollID: "dfc123",
    wastage: "36%",
    defect_percentage: "54%",
    foodGrade: "74%",
    acceptance: "84%",
    cod: "49",
  },
  {
    ctrNo: "518",
    machineId: "Machine 8",
    rollID: "ete123",
    wastage: "78%",
    defect_percentage: "84%",
    foodGrade: "96%",
    acceptance: "74%",
    cod: "55",
  },
  {
    ctrNo: "923",
    machineId: "Machine 5",
    rollID: "rgc123",
    wastage: "92%",
    defect_percentage: "52%",
    foodGrade: "74%",
    acceptance: "99%",
    cod: "44",
  },
  {
    ctrNo: "851",
    machineId: "Machine 3",
    rollID: "trf123",
    wastage: "57%",
    defect_percentage: "95%",
    foodGrade: "96%",
    acceptance: "74%",
    cod: "21",
  },
];

function Home() {
  return (
    <Grid container>
      <Grid container item xs={12} style={{ marginTop: "12px" }}>
        <Grid
          container
          item
          xs={6}
          sm={4}
          lg={2}
          style={{ justifyContent: "center", marginBottom: "8px" }}
        >
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginRight: "6px" }}
          >
            <InputLabel keyid="demo-simple-select-outlined-label">
              Select Fabric
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              // multiple
              // value={inputCTR}
              // onChange={(e) => setInputCTR(e.target.value)}
              label="Select Fabric"
              // multiple
            >
              {["A", "B", "C"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  Fabric {item}
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
          style={{ justifyContent: "center", marginBottom: "8px" }}
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
              // multiple
              // value={inputMACHINEid}
              // onChange={(e) => setInputMACHINEid(e.target.value)}
              label="Machine ID"
              // multiple
            >
              {["A", "B", "C"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  Machine {item}
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
          style={{ justifyContent: "center", marginBottom: "8px" }}
        >
          <TextField
            key="from"
            id="fromDate"
            label="From"
            // value={state.from}
            type="date"
            style={{ marginRight: "6px" }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            // onChange={(e) =>
            //   dispatch({ type: "FROM", payload: e.target.value })
            // }
            fullWidth
          />
        </Grid>

        <Grid
          container
          item
          xs={6}
          sm={4}
          lg={2}
          style={{ justifyContent: "center", marginBottom: "8px" }}
        >
          <TextField
            key="to"
            id="toDate"
            label="To"
            type="date"
            // value={state.to}
            style={{ marginRight: "6px" }}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            // onChange={(e) => dispatch({ type: "TO", payload: e.target.value })}
            fullWidth
          />
        </Grid>

        <Grid
          container
          item
          xs={4}
          sm={4}
          lg={2}
          style={{ justifyContent: "center", marginBottom: "8px" }}
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
              // multiple
              // value={inputSHIFT}
              // onChange={(e) => setInputSHIFT(e.target.value)}
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
          style={{ justifyContent: "center", marginBottom: "8px" }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            // onClick={dateFilter}
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
          style={{ justifyContent: "center", marginBottom: "8px" }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            // onClick={dateFilter}
            // onClick={() => {
            //   refreshData();
            //   setInputCTR([]);
            //   setInputMACHINEid([]);
            //   setInputSHIFT([]);
            // }}
          >
            <RefreshIcon />
            Refresh
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        md={2}
        style={{ marginBottom: "1rem", padding: "8px" }}
      >
        <Defect />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        md={4}
        style={{ marginBottom: "1rem", padding: "8px" }}
      >
        <Graph title="Defects %" week={75} month={89} today={96} />
      </Grid>

      <Grid
        container
        item
        xs={12}
        sm={6}
        md={4}
        style={{ marginBottom: "1rem", padding: "8px" }}
      >
        <Graph title="Wastage %" week={80} month={99} today={52} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        md={2}
        style={{ marginBottom: "1rem", padding: "8px" }}
      >
        <DefectSummaryCard />
      </Grid>

      <TableDataCutting />
      {/* <MaterialTable
        title="Recent Defects Report"
        columns={[
          { title: "CTR No.", field: "ctrNo" },
          { title: "Machine ID", field: "machineId" },
          { title: "Roll ID", field: "rollID" },
          {
            title: "Wastage %",
            field: "wastage",
          },
          {
            title: "Defect Detected %",
            field: "defect_percentage",
          },
          {
            title: "Food Grade",
            field: "foodGrade",
          },
          {
            title: "Acceptance %",
            field: "acceptance",
          },
          {
            title: "Count of Defects",
            field: "cod",
          },
        ]}
        data={tableData}
        options={{
          exportButton: true,
        }}
      /> */}
    </Grid>
  );
}

export default Home;
