import { Grid } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import MaterialTable from "material-table";
import clsx from "clsx";
import moment from "moment";
import React from "react";
import { getNotificationLog } from "../../services/api.service";
import { LinearProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function NotificationLog() {
  const classes = useStyles();

  const [data, setData] = React.useState([]);

  const getLogs = async () => {
    try {
      const resp = await getNotificationLog();
      console.log(resp);
      setData(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getLogs();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "instance", headerName: "Violation", width: 210 },
    { field: "startTime", headerName: "Start Time", width: 150 },
    { field: "endTime", headerName: "End Time", width: 150 },
    { field: "machineId", headerName: "Machine ID", width: 150 },
    { field: "workerId", headerName: "Worker ID", width: 150 },

    { field: "date", headerName: "Date", width: 150 },
    { field: "wing", headerName: "Wing", width: 120 },
    { field: "zone", headerName: "Line", width: 120 },
    { field: "shift", headerName: "Shift", width: 120 },
    { field: "clpCtr", headerName: "CLP-CTR", width: 150 },
    {
      field: "helperSentStatus",
      headerName: "Helper Status",
      width: 210,
      cellClassName: (params) =>
        clsx({
          negative: params.value === "True",
          positive: params.value === "False",
        }),
    },
    {
      field: "managerSentStatus",
      headerName: "Manager Status",
      width: 210,
      cellClassName: (params) =>
        clsx({
          negative: params.value === "True",
          positive: params.value === "False",
        }),
    },
    {
      field: "supervisorSentStatus",
      headerName: "Supervisor Status",
      width: 210,
      cellClassName: (params) =>
        clsx({
          negative: params.value === "True",
          positive: params.value === "False",
        }),
    },
    {
      field: "wingInchargeSentStatus",
      headerName: "Wing Incharge Status",
      width: 210,
      cellClassName: (params) =>
        clsx({
          negative: params.value === "True",
          positive: params.value === "False",
        }),
    },
  ];

  return (
    <Grid container>
      {data.length > 0 ? (
        <Grid container item xs={12} style={{ height: "700px", width: "100%" }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar,
            }}
            // rows={data}
            rows={data.map((row, i) => {
              const {
                date,
                helperSentStatus,
                managerSentStatus,
                supervisorSentStatus,
                wingInchargeSentStatus,
                ...rest
              } = row;
              return {
                id: i,
                date: moment(new Date(date))
                  .format("DD/MM/YYYY")
                  .toString(),
                ...rest,
                helperSentStatus: Boolean(helperSentStatus) ? "True" : "False",
                managerSentStatus: Boolean(managerSentStatus)
                  ? "True"
                  : "False",
                supervisorSentStatus: Boolean(supervisorSentStatus)
                  ? "True"
                  : "False",
                wingInchargeSentStatus: Boolean(wingInchargeSentStatus)
                  ? "True"
                  : "False",
              };
            })}
            columns={columns}
            style={{ width: "100%" }}
          />
        </Grid>
      ) : (
        <div
          container
          item
          xs={12}
          style={{ width: "100%", padding: "12px", margin: "12px 0" }}
          className={classes.root}
        >
          <LinearProgress />
        </div>
      )}
    </Grid>
  );
}

export default NotificationLog;
