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

function HomeTable({ data, columns }) {
  const classes = useStyles();

  return (
    <>
      {data.length > 0 ? (
        <MaterialTable
          title="Detail Summary"
          columns={columns}
          data={data}
          options={{
            exportButton: true,
            pageSizeOptions: [20, 50, 100, 200, data.length],
            pageSize: 20,
          }}
        />
      ) : (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      )}
    </>
  );
}

export default HomeTable;
