import React from "react";
import DefectSummaryCard from "./DefectSummaryCard";
import Graph from "./Graph";
import "./Home.css";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Defect from "./Defect";
import TableDataCutting from "./TableDataCutting";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";

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
