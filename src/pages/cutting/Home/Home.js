import React from "react";
import DefectSummaryCard from "./DefectSummaryCard";
import Graph from "./Graph";
import "./Home.css";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";

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
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={4}
        style={{ marginBottom: "1rem" }}
      >
        <Graph title="Defects %" current={381} last={240} today={96} />
      </Grid>

      <Grid
        container
        item
        xs={12}
        sm={12}
        md={4}
        style={{ marginBottom: "1rem" }}
      >
        <Graph title="Wastage %" current={245} last={288} today={52} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={4}
        style={{ marginBottom: "1rem" }}
      >
        <DefectSummaryCard />
      </Grid>

      <MaterialTable
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
      />
    </Grid>
  );
}

export default Home;
