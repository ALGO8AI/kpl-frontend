import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CheckingContext } from "../../../context/CheckingContext";
import { generateBagIds } from "../../../services/api.service";
import { bagCount } from "../../../services/checking.api";
import { theme } from "../../../Utility/constants";

function GenerateBarcode() {
  const { state, dispatch } = React.useContext(CheckingContext);
  const history = useHistory();

  const [bagData, setBagData] = React.useState({
    open: false,
    lotSize: "",
    tableNo: "",
    respData: "",
  });

  const [tableWiseData, setTableWiseData] = useState([]);

  const saveBagID = async () => {
    try {
      const resp = await generateBagIds(bagData.lotSize, bagData.tableNo);
      console.log(resp);
      dispatch({ type: "BAG-DATA-PRINT", payload: resp.data });

      setBagData({ ...bagData, open: true, respData: resp.data });
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadData = async () => {
    try {
      const resp = await bagCount();
      console.log(resp?.data);
      setTableWiseData(resp?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // const [filter, setFilter] = React.useState("");
  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        md={4}
        sm={4}
        style={{ height: "min-content", padding: "12px" }}
      >
        <TableContainer component={Paper} style={{ marginBottom: "12px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: theme.BLUE,
                  color: "white",
                }}
              >
                {["Table ID", "Unused Barcode Count", ""].map((item, index) => (
                  <TableCell
                    key={index}
                    style={{
                      color: "white",
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableWiseData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.tableId}</TableCell>
                  <TableCell>{item.remainingBagCount}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          // value={data.accessibilityChecking}
                          // checked={data.accessibilityChecking}
                          color="primary"
                          // onChange={(e) =>
                          //   setData({
                          //     ...data,
                          //     accessibilityChecking: e.target.checked,
                          //   })
                          // }
                        />
                      }
                      labelPlacement="end"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          autoFocus
          // onClick={saveBagID}
          variant="contained"
          style={{
            backgroundColor: "#0e4a7b",
            color: "#FFF",
            whiteSpace: "nowrap",
            width: "100%",
            height: "fit-content",
            border: "1px solid #0e4a7b",
            // marginLeft: "12px",
            padding: "12px",
            martinTop: "12px",
          }}
          // disabled={!bagData.lotSize || !bagData.tableNo}
        >
          GENERATE REMAINING BARCODE
        </Button>
        {/* <TextField
          variant="outlined"
          fullWidth
          value={bagData.lotSize}
          onChange={(e) => setBagData({ ...bagData, lotSize: e.target.value })}
          type="number"
          label="Lot Size"
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          variant="outlined"
          fullWidth
          value={bagData.tableNo}
          onChange={(e) => setBagData({ ...bagData, tableNo: e.target.value })}
          label="Table Number"
          type="number"
          style={{ marginBottom: "1rem" }}
        />
        <Grid container xs={6} style={{ marginBottom: "1rem" }}>
          {!state.bagDataPrint.loading && (
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
              // onClick={() => window.print()}
              onClick={() => history.push("/print")}
            >
              PRINT
            </Button>
          )}
        </Grid>
        <Grid container xs={6}>
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
              marginLeft: "12px",
              padding: "12px",
            }}
            disabled={!bagData.lotSize || !bagData.tableNo}
          >
            GENERATE
          </Button>
        </Grid> */}
      </Grid>
      <Grid container item xs={12} md={8} sm={8} style={{ padding: "12px" }}>
        <MaterialTable
          title="NEW BARCODE DETAILS"
          columns={[
            { title: "Bag ID", field: "bagId" },
            { title: "Table ID", field: "tableId" },
            {
              field: "view",
              title: "barcode",
              render: (rowData) => (
                <img src={rowData.barcode} alt={rowData.bagId} />
              ),
            },
            { title: "Date", field: "date" },
            { title: "Time", field: "time" },
          ]}
          data={state.bagDataPrint.data}
          options={{
            exportButton: true,
            pageSizeOptions: [20, 50, 100, 200],
            pageSize: 20,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default GenerateBarcode;
