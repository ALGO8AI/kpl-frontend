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

function DefectDetails() {
  return (
    <Grid container style={{ padding: "1rem" }}>
      {[
        {
          title: "Number Of Defects",
          value: 4543,
        },
        {
          title: "Wastage",
          value: 1435,
        },
        {
          title: "Food Grade",
          value: 845,
        },
        {
          title: "Standard",
          value: 341,
        },
      ].map((item, index) => (
        <Card key={index} item={item} />
      ))}
      <DefectTable />
    </Grid>
  );
}

export default DefectDetails;
