import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { theme } from "../../../Utility/constants";
import RefreshIcon from "@material-ui/icons/Refresh";
import ReactApexChart from "react-apexcharts";

export default function TableStatus() {
  return (
    <Grid container xs={12}>
      <Grid
        container
        item
        xs={12}
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <Typography variant="h6">Live View</Typography>
        <Button style={{ backgroundColor: theme.BLUE, color: "whitesmoke" }}>
          <RefreshIcon />
        </Button>
      </Grid>
      <Grid container item xs={12} md={8} style={{ padding: "8px" }}>
        <LiveTable />
      </Grid>
      <Grid container item xs={12} md={4} style={{ padding: "8px" }}>
        <LiveTableChart />
      </Grid>
    </Grid>
  );
}

function LiveTableChart() {
  const series = [200, 50];
  const options = {
    colors: ["#03C412", "#C40303"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    chart: {
      type: "donut",
    },
    labels: ["On", "Off"],
  };
  return (
    <Grid
      container
      item
      xs={12}
      component={Paper}
      elevation={5}
      style={{ padding: "6px", height: "fit-content" }}
    >
      <Typography variant="h6">Total Number Of Tables : 250</Typography>
      <Grid
        container
        item
        xs={7}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          width={200}
        />
      </Grid>
      <Grid container item xs={5}>
        <Grid
          container
          item
          xs={12}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <p style={{ color: "rgb(74, 170, 22)" }}>
            <i class="fa fa-check" aria-hidden="true"></i> ON : 200
          </p>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <p style={{ color: "rgb(249, 54, 54)" }}>
            <i class="fa fa-times" aria-hidden="true"></i> OFF : 50
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
}

function LiveTable() {
  return (
    <Grid
      container
      item
      xs={12}
      component={Paper}
      elevation={5}
      style={{ padding: "6px" }}
    >
      <table>
        <thead>
          <tr>
            {[
              "Table ID",
              "Status",
              "Wing",
              "Line",
              "Checker ID",
              "Checker Name",
            ].map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            {
              tableId: "Table ID",
              status: 0,
              wing: 1,
              line: 1,
              checkerId: "Checker ID",
              checkerName: "Checker Name",
            },
            {
              tableId: "Table ID",
              status: 1,
              wing: 1,
              line: 1,
              checkerId: "Checker ID",
              checkerName: "Checker Name",
            },
            {
              tableId: "Table ID",
              status: 0,
              wing: 1,
              line: 1,
              checkerId: "Checker ID",
              checkerName: "Checker Name",
            },
            {
              tableId: "Table ID",
              status: 1,
              wing: 1,
              line: 1,
              checkerId: "Checker ID",
              checkerName: "Checker Name",
            },
            {
              tableId: "Table ID",
              status: 0,
              wing: 1,
              line: 1,
              checkerId: "Checker ID",
              checkerName: "Checker Name",
            },
            {
              tableId: "Table ID",
              status: 1,
              wing: 1,
              line: 1,
              checkerId: "Checker ID",
              checkerName: "Checker Name",
            },
            {
              tableId: "Table ID",
              status: 0,
              wing: 1,
              line: 1,
              checkerId: "Checker ID",
              checkerName: "Checker Name",
            },
            {
              tableId: "Table ID",
              status: 1,
              wing: 1,
              line: 1,
              checkerId: "Checker ID",
              checkerName: "Checker Name",
            },
          ].map((item, index) => (
            <tr key={index}>
              <td>{item.tableId}</td>
              <td>
                {item.status === 1 ? (
                  <p style={{ color: "rgb(74, 170, 22)" }}>
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </p>
                ) : (
                  <p style={{ color: "rgb(249, 54, 54)" }}>
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </p>
                )}
              </td>
              <td>{item.wing}</td>
              <td>{item.line}</td>
              <td>{item.checkerId}</td>
              <td>{item.checkerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Grid>
  );
}
