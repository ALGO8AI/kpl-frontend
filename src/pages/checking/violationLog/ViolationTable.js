import { LinearProgress, makeStyles } from "@material-ui/core";
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

function ViolationTable({ data, columns, rowClick, selectedRow }) {
  const classes = useStyles();
  return (
    <>
      {data?.length > 0 ? (
        <MaterialTable
          title={"Violation Details"}
          columns={columns}
          data={data}
          options={{
            exportButton: true,
            pageSizeOptions: [20, 50, 100, 200, data.length],
            pageSize: 20,
            rowStyle: (rowData) => ({
              backgroundColor: selectedRow === rowData.Id ? "#ffe2c1" : "white",
            }),
          }}
          onRowClick={rowClick}
        />
      ) : (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      )}
    </>
  );
}

export default ViolationTable;
