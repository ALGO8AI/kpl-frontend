import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import "./DefectSummary.css";
function DefectSummaryCard() {
  return (
    <Grid container item xs={12} component={Paper} elevation={3}>
      <h3
        style={{
          backgroundColor: "#f68f1d",
          width: "min-content",
          whiteSpace: "nowrap",
          padding: "8px 12px",
          margin: "auto",
          color: "white",
          fontWeight: "500",
          borderRadius: "4px",
          marginTop: "12px",
        }}
      >
        Defect Overview
      </h3>
      <Grid xs={12} container item style={{ padding: "12px" }}>
        {[
          {
            name: "Total Defects",
            value: 100,
          },
          {
            name: "Food Category Defects",
            value: 45,
          },
          {
            name: "Standard Category Defects",
            value: 3,
          },
          {
            name: "Defects Identified",
            value: 12,
          },
          {
            name: "Defects Missed",
            value: 7,
          },
          {
            name: "Total Defects %",
            value: "2%",
          },
        ].map((item, i) => (
          <Grid
            xs={12}
            container
            item
            style={{
              justifyContent: "space-between",
              borderBottom: "1px solid grey",
              marginTop: "12px",
            }}
            key={i}
          >
            <Typography variant="body1">{item?.name}</Typography>
            <Typography variant="h6">{item?.value}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default DefectSummaryCard;
