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

function HomeTable({ data, columns }) {
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
        //     pageSizeOptions: [5, 10, 20, data.length],
        //   }}
        // />
        <div style={{ width: "100%", minHeight: "900px" }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar,
            }}
            rows={data}
            columns={columns}
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
