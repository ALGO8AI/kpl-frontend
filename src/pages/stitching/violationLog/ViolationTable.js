import {
  LinearProgress,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { StitchingContext } from "../../../context/StitchingContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > * + *": {
      // marginTop: theme.spacing(2),
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

  // context
  const { state, dispatch } = React.useContext(StitchingContext);

  return (
    <>
      {!loading ? (
        data?.length > 0 ? (
          <MaterialTable
            title={"Violation Details"}
            columns={columns}
            data={data}
            onChangePage={(e) =>
              dispatch({
                type: "SET_TABLE_PAGE",
                payload: e,
              })
            }
            options={{
              exportButton: true,
              pageSizeOptions: [20, 50, 100, 200, data.length],
              initialPage: state?.tableCurrentPage,
              pageSize: 20,
              rowStyle: (rowData) => ({
                backgroundColor:
                  rowData.actionStatus === "OPEN"
                    ? "rgb(255 243 230)"
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
      {/* {data?.length > 0 ? (
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
                rowData.actionStatus === "OPEN" ? "rgb(255 243 230)" : "white",
            }),
          }}
          onRowClick={rowClick}
        />
      ) : (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      )} */}
    </>
  );
}

export default ViolationTable;
