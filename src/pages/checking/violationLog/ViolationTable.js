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

function ViolationTable({ data, columns, rowClick }) {
  const classes = useStyles();
  return (
    <>
      {data.length > 0 ? (
        <MaterialTable
          title={"Violation Details"}
          columns={columns}
          data={data}
          options={{
            exportButton: true,
            pageSizeOptions: [5, 10, 20, data.length],
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
