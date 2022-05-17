import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Switch,
  TextField,
} from "@material-ui/core";
import { theme, wings } from "../../../Utility/constants";
import { StitchingContext } from "../../../context/StitchingContext";
import {
  ctr_machineID,
  getAllWorketrList,
} from "../../../services/api.service";
import { Autocomplete } from "@material-ui/lab";

function WorkerScheduleV2() {
  // state & selector
  const { state, dispatch } = React.useContext(StitchingContext);
  const [workerList, setWorkerList] = useState([]);
  const [clpCtr, setClpCtr] = useState([]);

  // call initial api
  const loadData = async () => {
    try {
      const worker = await getAllWorketrList();
      setWorkerList(worker.data);
      const ctr = await ctr_machineID();
      setClpCtr(ctr?.clpctr);
    } catch (e) {}
  };

  // use effect
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        style={{
          marginBottom: "1rem",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          style={{
            backgroundColor: theme.BLUE,
            color: "white",
            padding: "12px",
          }}
        >
          COPY TABLE
        </Button>
      </Grid>
      <Grid container item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: theme.BLUE,
                  color: "white",
                }}
              >
                {[
                  "Date",
                  "Worker ID",
                  "Worker Name",
                  "Shift",
                  "Wing",
                  "Table ID",
                  "Table Status",
                  "CLP-CTR",
                  "Save",
                ].map((item, index) => (
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
              {state?.machineIDs?.length > 0 &&
                state.machineIDs.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    <TableCell>
                      <FormControl variant="outlined" fullWidth>
                        {/* <InputLabel keyid="demo-simple-select-outlined-label">
                          Worker Id
                        </InputLabel> */}
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          //   value={scheduleInput.workerId}
                          name="supervisorName"
                          fullWidth
                          //   onChange={onUserChange}
                          label=""
                          // multiple
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {workerList.length > 0 &&
                            workerList
                              ?.sort((a, b) =>
                                a?.workerName > b?.workerName ? 1 : -1
                              )
                              ?.map((item, index) => (
                                <MenuItem value={item.workerId} key={index}>
                                  {item.workerId} - {item?.workerName}
                                </MenuItem>
                              ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        // style={{ marginBottom: "12px" }}
                        // disabled
                      >
                        {/* <InputLabel keyid="demo-simple-select-outlined-label">
                          Worker Name
                        </InputLabel> */}
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          //   value={scheduleInput.workerName}
                          name="supervisorName"
                          fullWidth
                          // onChange={onUserChange}
                          label=""
                          // multiple
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {workerList.length > 0 &&
                            workerList.map((item, index) => (
                              <MenuItem value={item.workerName} key={index}>
                                {item.workerName}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: "12px" }}
                      >
                        {/* <InputLabel keyid="demo-simple-select-outlined-label">
                          Shift
                        </InputLabel> */}
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          // value={userdata.supervisorName}
                          name="supervisorName"
                          fullWidth
                          //   value={scheduleInput.shift}
                          //   onChange={(e) =>
                          //     setScheduleInput({
                          //       ...scheduleInput,
                          //       shift: e.target.value,
                          //     })
                          //   }
                          label=""
                          // multiple
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {["A", "B", "C"].map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: "12px" }}
                      >
                        {/* <InputLabel keyid="demo-simple-select-outlined-label">
                          Wing
                        </InputLabel> */}
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          // value={userdata.supervisorName}
                          name="supervisorName"
                          fullWidth
                          //   value={scheduleInput.wing}
                          //   onChange={(e) =>
                          //     setScheduleInput({
                          //       ...scheduleInput,
                          //       wing: e.target.value,
                          //     })
                          //   }
                          label=""
                          // multiple
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {wings.map((item, index) => (
                            <MenuItem value={item} key={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>{item?.machineID}</TableCell>
                    <TableCell>
                      <Switch
                        checked={Math.random() > 0.5 ? true : false}
                        // onChange={handleChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Autocomplete
                        // id="combo-box-demo"
                        options={clpCtr}
                        getOptionLabel={(option) => option.ctrs}
                        style={{ width: 150 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="CTR"
                            variant="outlined"
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        variant="contained"
                        style={{
                          backgroundColor: theme.BLUE,
                          color: "white",
                          padding: "12px",
                        }}
                      >
                        SAVE
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default WorkerScheduleV2;
