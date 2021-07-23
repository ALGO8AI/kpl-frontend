import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { useHistory } from "react-router-dom";
import { CheckingContext } from "../../../context/CheckingContext";
import { getBagData } from "../../../services/api.service";

function BarcodeDetails() {
  const { state, dispatch } = React.useContext(CheckingContext);
  const [filter, setFilter] = React.useState("");

  const history = useHistory();
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
      // const data = [...resp.unUsedIds, ...resp.usedIds];
      dispatch({
        type: "BAG-DATA",
        payload: {
          data: resp.unUsedIds,
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

      // console.log(resp);
      // const data = [...resp.unUsedIds, ...resp.usedIds];
      dispatch({
        type: "BAG-DATA",
        payload: {
          data: resp.unUsedIds,
          loading: true,
        },
      });
    } catch (err) {
      // console.log(err.message);
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
        xs={12}
        md={4}
        style={{ height: "min-content", padding: "12px" }}
      >
        <TextField
          key="from"
          id="fromDate"
          label="From"
          value={state.bagIdFrom}
          type="date"
          style={{ marginBottom: "1rem" }}
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
        <TextField
          key="to"
          id="toDate"
          label="To"
          type="date"
          value={state.bagIdTo}
          style={{ marginBottom: "1rem" }}
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
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginBottom: "1rem" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
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

        <Grid container item xs={6}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#fff",
              color: "#0e4a7b",
              whiteSpace: "nowrap",
              width: "100%",
              height: "fit-content",
              border: "1px solid #0e4a7b",
              marginRight: "12px",
              padding: "12px",
            }}
            onClick={() => history.push("/printUsedUnused")}
          >
            {/* <FilterListIcon /> */}
            PRINT
          </Button>
        </Grid>
        <Grid container item xs={6}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#0e4a7b",
              color: "#FFF",
              whiteSpace: "nowrap",
              width: "100%",
              height: "fit-content",
              border: "1px solid #0e4a7b",
              //   marginBottom: "6px",
              marginLeft: "12px",
              padding: "12px",
            }}
            onClick={dateFilter}
          >
            GET DATA
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={8} style={{ padding: "12px" }}>
        {state.bagData.loading && (
          <MaterialTable
            title="BARCODE DETAILS"
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
            data={state?.bagData?.data?.filter((data) =>
              data?.assigned?.toString().includes(filter)
            )}
            options={{
              exportButton: true,
              pageSizeOptions: [20, 50, 100, 200],
              pageSize: 20,
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default BarcodeDetails;
