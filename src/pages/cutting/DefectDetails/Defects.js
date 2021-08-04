import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import "./DefectDetails.scss";
import DefectTable from "./DefectTable";

function Card({ item }) {
  return (
    <Grid container item xs={12} sm={6} md={3} style={{ padding: "1rem" }}>
      <Grid
        container
        item
        xs={12}
        className="Card"
        component={Paper}
        elevation={5}
      >
        <Typography variant="h5">{item?.title}</Typography>
        <Typography variant="h3">{item?.value}</Typography>
      </Grid>
    </Grid>
  );
}

function Defects() {
  return (
    <Grid container style={{ padding: "1rem" }}>
      <DefectTable />
    </Grid>
  );
}

export default Defects;
