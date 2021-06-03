import { Grid } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import MaterialTable from "material-table";
import moment from "moment";
import React from "react";
import { getNotificationLog } from "../../services/api.service";

function NotificationLog() {
  const [data, setData] = React.useState();

  const getLogs = async () => {
    try {
      const resp = await getNotificationLog();
      console.log();
      setData(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getLogs();
  });

  const columns = [
    { field: "id", headerName: "Worker ID", width: 150 },
    { field: "instance", headerName: "Instance", width: 210 },
    { field: "startTime", headerName: "Start Time", width: 210 },
    { field: "endTime", headerName: "End Time", width: 210 },
    { field: "machineId", headerName: "Mechine ID", width: 210 },
    { field: "workerId", headerName: "Worker ID", width: 210 },

    { field: "date", headerName: "Date", width: 210 },
    { field: "wing", headerName: "Wing", width: 210 },
    { field: "zone", headerName: "Zone", width: 210 },
    { field: "shift", headerName: "Shift", width: 210 },
    { field: "clpCtr", headerName: "CLP-CTR", width: 210 },
  ];

  return (
    <Grid container>
      {data && (
        <Grid containe item xs={12} style={{ height: "700px", width: "100%" }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar,
            }}
            // rows={data}
            rows={data.map((row, i) => {
              const { date, ...rest } = row;
              return {
                id: i,
                date: moment(new Date(date))
                  .format("DD/MM/YYYY")
                  .toString(),
                ...rest,
              };
            })}
            columns={columns}
            style={{ width: "100%" }}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default NotificationLog;
