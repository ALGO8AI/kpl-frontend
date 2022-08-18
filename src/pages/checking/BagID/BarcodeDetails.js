/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  // Snackbar,
} from "@material-ui/core";
// import { Alert } from "@material-ui/lab";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CheckingContext } from "../../../context/CheckingContext";
import { openSnackbar } from "../../../redux/CommonReducer/CommonAction";
import {
  deleteBarCode,
  getAllTableId,
  getBagData,
  getDynamicTableList,
} from "../../../services/api.service";
import { wingWiseLine } from "../../../services/checking.api";

function BarcodeDetails() {
  const { selectedWing } = useSelector((state) => state?.CheckV3);

  // DISPATCH
  const Dispatch = useDispatch();
  const { state, dispatch } = React.useContext(CheckingContext);
  const [filter, setFilter] = React.useState("");
  const [tempFilter, setTempFilter] = React.useState("");

  const [machineID, setMachineID] = useState([]);
  const [inputMACHINEid, setInputMACHINEid] = useState([]);
  const [selectedBarcode, setSelectedBarcode] = useState([]);
  const [lineList, setLineList] = useState([]);
  const [inputLINE, setInputLINE] = useState([]);
  // const [open, setOpen] = useState(false);
  // const [msg, setMsg] = useState("");

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

      // console.log(resp);
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
      const resp = await getBagData(
        state.bagIdFrom,
        state.bagIdTo,
        inputMACHINEid,
        selectedWing
      );

      // console.log(resp);
      const data = [...resp.unUsedIds, ...resp.usedIds];
      dispatch({
        type: "BAG-DATA",
        payload: {
          // data: resp.unUsedIds,
          data: data,
          loading: true,
        },
      });
    } catch (err) {
      // console.log(err.message);
    }
  };
  React.useEffect(() => {
    fetchBagIds();
  }, [selectedWing]);

  const deleteBarCodes = async () => {
    try {
      const resp = await deleteBarCode(selectedBarcode);
      console.log(resp);
      if (resp?.msg === "BagId successfully Deleted") {
        Dispatch(openSnackbar(true, "success", resp.msg));
        // setOpen(true);
        // setMsg(resp?.msg);
        setSelectedBarcode([]);
        fetchBagIds();
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const getTableDynamic = async () => {
    console.log("DYNAMIC MACHINE FILTER CALL");
    const body = {
      filterDateFrom: state.bagIdFrom,
      filterDateTo: state.bagIdTo,
      shift: ["A", "B", "C"],
      line: inputLINE,
    };

    try {
      const resp = await getDynamicTableList(body);
      setMachineID(resp?.allMachines);
    } catch (e) {}
  };

  useEffect(() => {
    getTableDynamic();
  }, [state.bagIdFrom, state.bagIdTo, inputLINE]);

  // useEffect(() => {
  //   return () => {
  //     Dispatch({
  //       type: "SET_SELECTED_WING",
  //       payload: "",
  //     });
  //   };
  // }, []);

  return (
    <>
      <Grid container>
        <Grid
          container
          item
          xs={12}
          sm={4}
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
            // className={classes.formControl}
            fullWidth
          >
            <InputLabel id="demo-simple-select-outlined-label">Line</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              multiple
              value={inputLINE}
              onChange={(e) => setInputLINE(e.target.value)}
              label="Line"
              style={{ marginBottom: "1rem" }}
            >
              {lineList?.map((item, index) => (
                <MenuItem value={item?.line} key={index}>
                  {item?.line}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            variant="outlined"
            // className={classes.formControl}
            fullWidth
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Table ID
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              multiple
              value={inputMACHINEid}
              onChange={(e) => setInputMACHINEid(e.target.value)}
              label="Table ID"
              style={{ marginBottom: "1rem" }}
            >
              {machineID &&
                machineID?.map((item, index) => (
                  <MenuItem value={item?.tableId} key={index}>
                    {item?.tableId}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Grid container item xs={6} style={{ marginBottom: "2rem" }}>
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
          <Grid container item xs={6} style={{ marginBottom: "2rem" }}>
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
          <Grid container item xs={12} style={{ marginBottom: "1rem" }}>
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
          <Grid container item xs={6} style={{ marginBottom: "1rem" }}>
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
              onClick={() => setTempFilter(filter)}
            >
              {/* <FilterListIcon /> */}
              FILTER
            </Button>
          </Grid>
          {tempFilter !== 1 && (
            <Grid container item xs={6} style={{ marginBottom: "1rem" }}>
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
                onClick={deleteBarCodes}
              >
                DELETE
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid container item xs={12} md={8} sm={8} style={{ padding: "12px" }}>
          {/* <Grid item xs={12} sm={10}>
            <FormControl
              variant="outlined"
              fullWidth
              style={{ marginBottom: "1rem" }}
            >
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
          {filter !== 1 && (
            <Grid item xs={12} sm={2}>
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
                onClick={deleteBarCodes}
              >
                DELETE
              </Button>
            </Grid>
          )} */}

          {state.bagData.loading && (
            <MaterialTable
              title={`BARCODE DETAILS ${
                tempFilter === ""
                  ? ""
                  : tempFilter !== 1
                  ? "(Unused)"
                  : "(Used)"
              }`}
              columns={
                tempFilter !== 1
                  ? [
                      {
                        title: "",
                        render: (rowData) =>
                          rowData.assigned === 0 && (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={selectedBarcode.includes(
                                    rowData.bagId
                                  )}
                                  onChange={(e) =>
                                    selectedBarcode.includes(rowData.bagId)
                                      ? setSelectedBarcode(
                                          selectedBarcode.filter(
                                            (data) => data !== rowData.bagId
                                          )
                                        )
                                      : setSelectedBarcode([
                                          rowData?.bagId,
                                          ...selectedBarcode,
                                        ])
                                  }
                                  name="checkedB"
                                  color="primary"
                                />
                              }
                            />
                          ),
                      },
                      { title: "Bag ID", field: "bagId" },
                      {
                        field: "view",
                        title: "barcode",
                        render: (rowData) => (
                          <img src={rowData.barcode} alt={rowData.bagId} />
                        ),
                      },
                      { title: "Date", field: "date" },
                    ]
                  : [
                      { title: "Bag ID", field: "bagId" },
                      {
                        field: "view",
                        title: "barcode",
                        render: (rowData) => (
                          <img src={rowData.barcode} alt={rowData.bagId} />
                        ),
                      },
                      { title: "Date", field: "date" },
                    ]
              }
              data={state?.bagData?.data?.filter((data) =>
                data?.assigned?.toString().includes(tempFilter)
              )}
              options={{
                exportButton: true,
                pageSizeOptions: [20, 50, 100, 200],
                pageSize: 50,
              }}
              // actions={[
              //   {
              //     icon: "save",
              //     tooltip: "Save User",
              //     onClick: (event, rowData) => {
              //       // Do save operation
              //     },
              //   },
              // ]}
            />
          )}
        </Grid>
      </Grid>
      {/* <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          {msg}
        </Alert>
      </Snackbar> */}
    </>
  );
}

export default BarcodeDetails;
