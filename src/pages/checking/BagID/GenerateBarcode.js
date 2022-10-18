/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import { CheckingContext } from "../../../context/CheckingContext";
import { openSnackbar } from "../../../redux/CommonReducer/CommonAction";
import { generateBagIds } from "../../../services/api.service";
import {
  bagCount,
  createBarcodeV2,
  getBagIDconfigV3,
  saveBagIDconfigV3,
  wingWiseLine,
} from "../../../services/checking.api";
import { theme } from "../../../Utility/constants";

function GenerateBarcode() {
  const { selectedWing } = useSelector((state) => state?.CheckV3);
  const { state, dispatch } = React.useContext(CheckingContext);
  const Dispatch = useDispatch();
  const history = useHistory();

  const [bagData, setBagData] = React.useState({
    open: false,
    lotSize: "",
    tableNo: "",
    respData: "",
  });

  const [tableWiseData, setTableWiseData] = useState([]);
  const [selectedTable, setSelectedTable] = useState([]);
  const [config, setConfig] = useState(0);
  const [lineList, setLineList] = useState([]);
  const [inputLINE, setInputLINE] = useState([]);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [loadingSaveConfig, setLoadingSaveConfig] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);

  const getLineDynamic = async (wing) => {
    try {
      // console.log("DYNAMIC CLPFILTER CALL");

      const resp = await wingWiseLine(wing);
      setLineList(resp?.data);
    } catch (e) {}
  };

  useEffect(() => {
    getLineDynamic(selectedWing);
    setInputLINE([]);
  }, [selectedWing]);

  const saveBagID = async () => {
    setLoadingGenerate(true);
    try {
      // old code
      // const resp = await generateBagIds(bagData.lotSize, bagData.tableNo);
      // console.log(resp);
      // dispatch({ type: "BAG-DATA-PRINT", payload: resp.data });

      // setBagData({ ...bagData, open: true, respData: resp.data });

      // new code v3
      const resp = await createBarcodeV2({
        data: selectedTable,
        // wing: Boolean(selectedWing)
        //   ? selectedWing
        //   : localStorage.getItem("kpl_wing"),
        // line: inputLINE,
      });
      console.log(resp);
      dispatch({ type: "BAG-DATA-PRINT", payload: resp.data });
      if (resp?.data?.length) {
        Dispatch(openSnackbar(true, "success", "Bag ID Generated"));
        loadData();
        setSelectedTable([]);
      }

      setBagData({ ...bagData, open: true, respData: resp.data });
    } catch (err) {
      console.log(err.message);
    }
    setLoadingGenerate(false);
  };

  const loadData = async () => {
    setLoadingFilter(true);
    try {
      const resp = await bagCount({
        wing: Boolean(selectedWing)
          ? selectedWing
          : localStorage.getItem("kpl_wing"),
        line: inputLINE,
      });
      console.log(resp?.data);
      setTableWiseData(resp?.data);
      const resp2 = await getBagIDconfigV3();
      console.log("RESP2", resp2);
      setConfig(resp2?.data[0]?.maxCount);
    } catch (e) {
      console.log(e.message);
    }
    setLoadingFilter(false);
  };

  const saveConfig = async () => {
    setLoadingSaveConfig(true);
    try {
      const resp = await saveBagIDconfigV3(config);
      Dispatch(openSnackbar(true, "success", resp.message));
      const resp2 = await bagCount();
      console.log(resp2?.data);
      setTableWiseData(resp2?.data);
    } catch (e) {}
    setLoadingSaveConfig(false);
  };

  useEffect(() => {
    setSelectedTable([]);
    loadData();
  }, [selectedWing]);
  useEffect(() => {
    return () => {
      Dispatch({
        type: "SET_SELECTED_WING",
        payload: "",
      });
    };
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
        <Grid
          container
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              fullWidth
              value={config}
              onChange={(e) => setConfig(e.target.value)}
              type="number"
              label="Max Count"
              // style={{ marginBottom: "1rem" }}
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={saveConfig}
              disabled={loadingSaveConfig}
              fullWidth
              style={{
                padding: "1rem",
              }}
            >
              {loadingSaveConfig ? <Loader /> : "SAVE CONFIG"}
            </Button>
          </Grid>
          <Grid container item xs={12} sm={12} style={{ margin: "12px 0" }}>
            <FormControl
              variant="outlined"
              fullWidth
              style={{ marginRight: "6px" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Line
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                multiple
                value={inputLINE}
                onChange={(e) => setInputLINE(e.target.value)}
                label="Line"
                // multiple
              >
                {lineList?.map((item, index) => (
                  <MenuItem key={index} value={item?.line}>
                    {item?.line}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid container item xs={12} sm={12} style={{ margin: "12px 0" }}>
            <Button
              onClick={loadData}
              autoFocus
              variant="contained"
              style={{
                backgroundColor: loadingFilter ? "grey" : "#0e4a7b",
                color: "#FFF",
                whiteSpace: "nowrap",
                width: "100%",
                height: "fit-content",
                border: "1px solid #0e4a7b",
                padding: "12px",
                martinTop: "12px",
              }}
              disabled={loadingFilter}
            >
              {loadingFilter ? (
                <Loader
                  style={{
                    color: "white",
                  }}
                />
              ) : (
                "FILTER"
              )}
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper} style={{ marginBottom: "12px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: theme.BLUE,
                  color: "white",
                }}
              >
                {["Table ID", "Unused Barcode Count"].map((item, index) => (
                  <TableCell
                    key={index}
                    style={{
                      color: "white",
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
                <TableCell>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={
                          selectedTable?.length === tableWiseData?.length
                        }
                        onChange={(e) => {
                          e.target.checked
                            ? setSelectedTable(tableWiseData)
                            : setSelectedTable([]);
                        }}
                      />
                    }
                    labelPlacement="end"
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableWiseData?.length !== 0 &&
                tableWiseData?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item?.tableId}</TableCell>
                    <TableCell>{item?.remainingBagCount}</TableCell>

                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={selectedTable
                              ?.map((x) => x?.tableId)
                              ?.includes(item?.tableId)}
                            onChange={(e) => {
                              selectedTable
                                ?.map((x) => x?.tableId)
                                ?.includes(item?.tableId)
                                ? setSelectedTable(
                                    selectedTable?.filter(
                                      (y) => y?.tableId !== item?.tableId
                                    )
                                  )
                                : setSelectedTable([...selectedTable, item]);
                            }}
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
          onClick={saveBagID}
          autoFocus
          variant="contained"
          style={{
            backgroundColor: loadingGenerate ? "grey" : "#0e4a7b",
            color: "#FFF",
            whiteSpace: "nowrap",
            width: "100%",
            height: "fit-content",
            border: "1px solid #0e4a7b",
            padding: "12px",
            martinTop: "12px",
          }}
          disabled={loadingGenerate}
        >
          {loadingGenerate ? (
            <Loader style={{}} />
          ) : (
            "GENERATE REMAINING BARCODE"
          )}
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
