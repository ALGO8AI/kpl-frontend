import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { theme } from "../../../Utility/constants";
import RefreshIcon from "@material-ui/icons/Refresh";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { getLibeTableStatus } from "../../../services/checking.api";

export default function TableStatus() {
  const { selectedWing, wingList } = useSelector((state) => state?.CheckV3);
  const [liveData, setLiveData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await getLibeTableStatus(
        selectedWing || localStorage.getItem("kpl_wing")
      );
      console.log("Live Data", data);
      setLiveData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedWing]);

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
        <Button
          style={{ backgroundColor: theme.BLUE, color: "whitesmoke" }}
          onClick={getData}
        >
          <RefreshIcon />
        </Button>
      </Grid>
      <Grid container item xs={12} md={8} style={{ padding: "8px" }}>
        <LiveTable data={liveData} />
      </Grid>
      <Grid container item xs={12} md={4} style={{ padding: "8px" }}>
        <LiveTableChart data={liveData} />
      </Grid>
    </Grid>
  );
}

function LiveTableChart({ data }) {
  const series = [
    Boolean(data) > 0
      ? data.filter((item) => item?.status === "Online").length
      : 0,
    Boolean(data) > 0
      ? data.filter((item) => item?.status === "Offline").length
      : 0,
    Boolean(data) > 0
      ? data.filter((item) => item?.status === "Disabled").length
      : 0,
    Boolean(data) > 0
      ? data.filter((item) => item?.status === "Idle").length
      : 0,
  ];
  const options = {
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
    colors: ["#00ff37", "#ff0000", "#ff7b00", "#c4d13c"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    chart: {
      type: "donut",
    },
    labels: ["Online", "Offline", "Disabled", "Idle"],
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
      <Typography variant="h6">
        Total Number Of Tables : {data.length}
      </Typography>
      <Grid
        container
        item
        xs={7}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        {data.length > 0 && (
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width={300}
          />
        )}
      </Grid>
      <Grid container item xs={5}>
        <Grid
          container
          item
          xs={12}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <p style={{ color: "#00ff37" }}>
            <i
              class="fa fa-check"
              style={{
                fontSize: "24px",
                color: "#00ff37",
              }}
            ></i>{" "}
            ONLINE : {data.filter((item) => item?.status === "Online").length}
          </p>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <p style={{ color: "#ff0000" }}>
            <i
              class="fa fa-times"
              style={{
                fontSize: "24px",
                color: "#ff0000",
              }}
            ></i>{" "}
            OFFLINE : {data.filter((item) => item?.status === "Offline").length}
          </p>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <p style={{ color: "#ff7b00" }}>
            <i
              class="fa fa-power-off"
              style={{
                fontSize: "24px",
                color: "#ff7b00",
              }}
            ></i>{" "}
            DISABLED :{" "}
            {data.filter((item) => item?.status === "Disabled").length}
          </p>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <p style={{ color: "#c4d13c" }}>
            <i
              class="fa fa-exclamation-triangle"
              style={{
                fontSize: "24px",
                color: "#c4d13c",
              }}
            ></i>{" "}
            IDLE : {data.filter((item) => item?.status === "Idle").length}
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
}

function LiveTable({ data }) {
  const icons = {
    Online: (
      <i
        class="fa fa-check"
        style={{
          fontSize: "24px",
          color: "#00ff37",
        }}
      ></i>
    ),
    Offline: (
      <i
        class="fa fa-times"
        style={{
          fontSize: "24px",
          color: "#ff0000",
        }}
      ></i>
    ),
    Disabled: (
      <i
        class="fa fa-power-off"
        style={{
          fontSize: "24px",
          color: "#ff7b00",
        }}
      ></i>
    ),
    Idle: (
      <i
        class="fa fa-exclamation-triangle"
        style={{
          fontSize: "24px",
          color: "#c4d13c",
        }}
      ></i>
    ),
  };

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
            {["Table ID", "Status"].map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.tableId}</td>
              <td>{icons[item.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Grid>
  );
}
