import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAlertSummary } from "../../services/checking.api";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { Grid } from "@material-ui/core";
import moment from "moment";

function AlertSummary() {
  const { selectedWing } = useSelector((state) => state?.CheckV3);
  const [response, setResponse] = useState([]);

  const fetchData = async (wing) => {
    try {
      const { data } = await getAlertSummary(wing);
      console.log(data);
      setResponse(data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchData(selectedWing || localStorage.getItem("kpl_wing"));
  }, [selectedWing]);

  return (
    <Grid
      container
      item
      xs={12}
      style={{
        height: "700px",
        width: "100%",
      }}
    >
      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        // rows={data}
        rows={response?.map((row, i) => {
          const { date, ...rest } = row;
          return {
            id: i,
            date: moment(new Date(date))
              .format("DD/MM/YYYY")
              .toString(),
            ...rest,
          };
        })}
        columns={[
          {
            field: "date",
            headerName: "Date",
            minWidth: 180,
            flex: 1,
          },
          {
            field: "time",
            headerName: "Time",
            minWidth: 180,
            flex: 1,
          },
          {
            field: "wing",
            headerName: "Wing",
            minWidth: 180,
            flex: 1,
          },
          {
            field: "shift",
            headerName: "Shift",
            minWidth: 180,
            flex: 1,
          },
          {
            field: "ctrNo",
            headerName: "CTR No.",
            minWidth: 180,
            flex: 1,
          },
          {
            field: "defect",
            headerName: "Defect",
            minWidth: 180,
            flex: 1,
          },
        ]}
        style={{ width: "100%" }}
      />
    </Grid>
  );
}

export default AlertSummary;
