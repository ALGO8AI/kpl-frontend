import {
  LinearProgress,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  loadingTable: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function ViolationTable({ data, columns, rowClick, selectedRow, loading }) {
  const classes = useStyles();
  return (
    <>
      {!loading ? (
        data?.length > 0 ? (
          <MaterialTable
            title={"Violation Details"}
            columns={columns}
            data={data}
            options={{
              exportButton: true,
              pageSizeOptions: [20, 50, 100, 200, data.length],
              pageSize: 20,
              rowStyle: (rowData) => ({
                backgroundColor:
                  rowData.actionStatus === "OPEN" || "Not Known"
                    ? "rgb(255,243,230)"
                    : "white",
              }),
            }}
            onRowClick={rowClick}
          />
        ) : (
          <div className={classes.root}>
            <LinearProgress />
          </div>
        )
      ) : (
        <div className={classes.loadingTable}>
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default ViolationTable;
