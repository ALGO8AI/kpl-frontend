/* eslint-disable no-unused-vars */
import {
  LinearProgress,
  makeStyles,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { CheckingContext } from "../../../context/CheckingContext";

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

  // context
  const { state, dispatch } = React.useContext(CheckingContext);
  return (
    <>
      {!loading ? (
        data?.length > 0 ? (
          <MaterialTable
            title={"Details"}
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
              pageSizeOptions: [20, 50, 100, 200, 300, 400, 500, data.length],
              initialPage: state?.tableCurrentPage,
              pageSize: 50,
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
          // <div className={classes.root}>
          //   <Typography variant="h6" align="center">
          //     No Data Available.
          //   </Typography>
          // </div>
          <div className={classes.loadingTable}>
            <CircularProgress />
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
