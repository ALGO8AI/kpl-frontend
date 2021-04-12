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
import React, { useState, useEffect } from "react";

function Feedback() {
  const [data, setData] = useState({
    image: [],
    defect: "",
    roleID: "",
    machineID: "",
    date: "",
    time: "",
    moreDetails: "",
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
              label="Role Id"
              variant="outlined"
              fullWidth
              value={data.roleID}
              onChange={(e) => setData({ ...data, roleID: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Machine Id"
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
