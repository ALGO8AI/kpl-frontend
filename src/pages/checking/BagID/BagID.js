import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import React from "react";
import { CheckingContext } from "../../../context/CheckingContext";
import { generateBagIds, getBagData } from "../../../services/api.service";
import FilterListIcon from "@material-ui/icons/FilterList";

function BagID() {
  const { state, dispatch } = React.useContext(CheckingContext);

  const [bagData, setBagData] = React.useState({
    open: false,
    lotSize: "",
    tableNo: "",
    respData: "",
  });
  const [filter, setFilter] = React.useState("");

  const saveBagID = async () => {
    try {
      const resp = await generateBagIds(bagData.lotSize, bagData.tableNo);
      console.log(resp);

      setBagData({ ...bagData, open: true, respData: resp.data });
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchBagIds = async () => {
    try {
      var curr = new Date(); // get current date
      // console.log(new Date().toISOString().slice(0, 10));
      var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
      var firstDay = new Date(curr.setDate(first)).toISOString().slice(0, 10);

      let week = [];
      for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i;
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
        week.push(day);
      }
      if (Boolean(!state.bagIdFrom)) {
        dispatch({ type: "BAG_FROM", payload: firstDay });
      }

      if (Boolean(!state.bagIdTo)) {
        dispatch({
          type: "BAG_TO",
          payload: new Date().toISOString().slice(0, 10),
        });
      }
      const resp = await getBagData(
        state.bagIdFrom || firstDay,
        state.bagIdTo || new Date().toISOString().slice(0, 10)
      );

      console.log(resp);
      const data = [...resp.unUsedIds, ...resp.usedIds];
      dispatch({
        type: "BAG-DATA",
        payload: {
          data: data,
          loading: true,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  const dateFilter = async () => {
    try {
      const resp = await getBagData(state.bagIdFrom, state.bagIdTo);

      console.log(resp);
      const data = [...resp.unUsedIds, ...resp.usedIds];
      dispatch({
        type: "BAG-DATA",
        payload: {
          data: data,
          loading: true,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  React.useEffect(() => {
    fetchBagIds();
  }, []);

  return (
    <Grid container>
      <Grid
        container
        item
        md={12}
        spacing={4}
        style={{ alignItems: "center", margin: "12px 0" }}
      >
        <Grid container item md={3}>
          <Typography variant="h5" style={{ color: "#0e4a7b" }}>
            Order Bag
          </Typography>
        </Grid>
        <Grid container item md={2}>
          <TextField
            variant="outlined"
            fullWidth
            value={bagData.lotSize}
            onChange={(e) =>
              setBagData({ ...bagData, lotSize: e.target.value })
            }
            type="number"
            label="Lot Size"
          />
        </Grid>
        <Grid container item md={2}>
          <TextField
            variant="outlined"
            fullWidth
            value={bagData.tableNo}
            onChange={(e) =>
              setBagData({ ...bagData, tableNo: e.target.value })
            }
            label="Table Number"
            type="number"
          />
        </Grid>
        <Grid container item md={1}>
          <Button
            autoFocus
            onClick={saveBagID}
            variant="contained"
            style={{
              backgroundColor: "#0e4a7b",
              color: "#FFF",
              whiteSpace: "nowrap",
              width: "100%",
              height: "fit-content",
              border: "1px solid #0e4a7b",
            }}
            disabled={!bagData.lotSize || !bagData.tableNo}
          >
            ADD NEW
          </Button>
        </Grid>
      </Grid>
      {state.bagData.loading ? (
        <>
          <Grid container item md={6} style={{ padding: "1rem" }} spacing={4}>
            <Grid container item md={12} spacing={3}>
              <Grid container item md={3}>
                <TextField
                  key="from"
                  id="fromDate"
                  label="From"
                  value={state.bagIdFrom}
                  type="date"
                  style={{ marginRight: "6px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) =>
                    dispatch({
                      type: "BAG_FROM",
                      payload: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Grid>
              <Grid container item md={3}>
                <TextField
                  key="to"
                  id="toDate"
                  label="To"
                  type="date"
                  value={state.bagIdTo}
                  style={{ marginRight: "6px" }}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    dispatch({
                      type: "BAG_TO",
                      payload: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Grid>
              <Grid container item md={3} style={{ alignItems: "center" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#0e4a7b",
                    color: "#FFF",
                    whiteSpace: "nowrap",
                    width: "100%",
                    height: "fit-content",
                    border: "1px solid #0e4a7b",
                  }}
                  onClick={dateFilter}
                >
                  <FilterListIcon />
                  GET DATA
                </Button>
              </Grid>

              <Grid container item md={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Filter
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    label="Designation"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>Unused</MenuItem>
                    <MenuItem value={1}>Used</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <MaterialTable
              title="Bag Details"
              columns={[
                { title: "Bag ID", field: "bagId" },
                {
                  field: "view",
                  title: "barcode",
                  render: (rowData) => (
                    <img src={rowData.barcode} alt={rowData.bagId} />
                  ),
                },
                { title: "Date", field: "date" },
              ]}
              data={state.bagData.data.filter((data) =>
                data.assigned.toString().includes(filter)
              )}
              options={{
                exportButton: true,
                pageSizeOptions: [5, 10, 20],
              }}
            />
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
      {bagData.respData && (
        <Grid container item md={6} style={{ padding: "1rem" }}>
          <MaterialTable
            title="Bag Details"
            columns={[
              { title: "Bag ID", field: "bagId" },
              {
                field: "view",
                title: "barcode",
                render: (rowData) => (
                  <img src={rowData.barcode} alt={rowData.bagId} />
                ),
              },
              { title: "Date", field: "date" },
            ]}
            data={bagData.respData}
            options={{
              exportButton: true,
              pageSizeOptions: [5, 10, 20],
            }}
          />
        </Grid>
      )}

      <Snackbar
        open={bagData.open}
        autoHideDuration={3000}
        onClose={() => setBagData({ ...bagData, open: false })}
      >
        <Alert
          severity="success"
          onClose={() => setBagData({ ...bagData, open: false })}
        >
          "Bag Added"
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default BagID;
