import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useState } from "react";

function Feedback() {
  const [data, setData] = useState({
    image: [],
    defect: "",
    clpCtr: "",
    machineID: "",
    date: "",
    time: "",
    moreDetails: "",
    shift: "",
    wing: "",
  });

  const submitHandler = () => {
    console.log(data);
  };

  return (
    <Grid container style={{ padding: "1rem" }}>
      <Grid container item md={12} style={{ alignItems: "flex-start" }}>
        <Grid
          container
          item
          md={6}
          xs={12}
          spacing={2}
          style={{ padding: "12px" }}
        >
          <Grid item xs={12}>
            <DropzoneArea
              onChange={(file) => setData({ ...data, image: file })}
              dropzoneText={"Drag and drop files or click here"}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          md={6}
          xs={12}
          style={{ padding: "12px" }}
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="CLP-CTR"
              variant="outlined"
              fullWidth
              value={data.clpCtr}
              onChange={(e) => setData({ ...data, clpCtr: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Defect
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.defect}
                onChange={(e) => setData({ ...data, defect: e.target.value })}
                label="Defect"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Defect 1"}>Defect 1</MenuItem>
                <MenuItem value={"Defect 2"}>Defect 2</MenuItem>
                <MenuItem value={"Defect 3"}>Defect 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Table Id"
              variant="outlined"
              fullWidth
              value={data.machineID}
              onChange={(e) => setData({ ...data, machineID: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="date"
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="time"
              fullWidth
              label="Time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              value={data.time}
              onChange={(e) => setData({ ...data, time: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Shift
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.shift}
                onChange={(e) => setData({ ...data, shift: e.target.value })}
                label="Shift"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {["A", "B"].map((shift, i) => (
                  <MenuItem key={i} value={shift}>
                    {shift}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Wing
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.wing}
                onChange={(e) => setData({ ...data, wing: e.target.value })}
                label="Wing"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {["FG-2", "FG-3"].map((wing, i) => (
                  <MenuItem key={i} value={wing}>
                    {wing}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="More Details"
              variant="outlined"
              fullWidth
              value={data.moreDetails}
              onChange={(e) =>
                setData({ ...data, moreDetails: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={submitHandler} variant="contained" color="primary">
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid
        container
        item
        md={12}
        style={{ alignSelf: "flex-end" }}
        spacing={2}
      >
        <Button variant="contained" color="primary">
          Send
        </Button>
      </Grid> */}
    </Grid>
  );
}

export default Feedback;
