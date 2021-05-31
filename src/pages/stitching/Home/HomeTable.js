import { LinearProgress, makeStyles } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import MaterialTable from "material-table";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function HomeTable({ data, column }) {
  console.log(data);
  const classes = useStyles();

  return (
    <>
      {data.length > 0 ? (
        // <MaterialTable
        //   title="Detail Summary"
        //   columns={columns}
        //   data={data}
        //   options={{
        //     exportButton: true,
        //     pageSizeOptions: [20, 50, 100, 200, data.length],
        //     pageSize: 20,
        //   }}
        // />

        <div style={{ width: "100%", height: "500px" }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar,
            }}
            rows={data}
            columns={column}
            style={{ width: "100%" }}
          />
        </div>
      ) : (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      )}
    </>
  );
}

export default HomeTable;
