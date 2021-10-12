import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import React from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

function Feedback() {
  const [file, setFile] = React.useState();

  const handleFileChange = (files) => {
    // console.log(files[0])
    setFile(files[0]);
    // console.log(file)
  };
  return (
    <Grid container item xs={12} style={{ maxWidth: "800px", margin: "auto" }}>
      <Grid item xs={12} style={{ marginBottom: "16px" }}>
        <DropzoneArea
          onChange={handleFileChange}
          dropzoneText={"Drag and drop files or click here"}
          acceptedFiles={[".csv", ".xls", ".xlsx"]}
        />
        <br />
        <div
          className="customUpload"
          style={{ padding: "8px 0px", width: "100%" }}
          // onClick={submit}
        >
          <CloudUploadIcon />
          &nbsp;Upload Schedule
        </div>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12} style={{ marginBottom: "16px" }}>
          <Typography variant="h5">ENTER DETAILS</Typography>
        </Grid>
        <Grid item xs={12} sm={6} style={{ padding: "12px 8px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>ROLL ID</InputLabel>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <MenuItem value={item} key={index}>
                  ID {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} style={{ padding: "12px 8px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>ROLL BARCODE NO.</InputLabel>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <MenuItem value={item} key={index}>
                  CATEGORY {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} style={{ padding: "12px 8px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>ROLL CATEGORY</InputLabel>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <MenuItem value={item} key={index}>
                  CATEGORY {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} style={{ padding: "12px 8px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>MACHINE ID</InputLabel>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <MenuItem value={item} key={index}>
                  ID {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} style={{ padding: "12px 8px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>DEFECT TYPE</InputLabel>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <MenuItem value={item} key={index}>
                  TYPE {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} style={{ padding: "12px 8px" }}>
          <TextField
            fullWidth
            label="PIECE LENGTH (in mm)"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ padding: "12px 8px" }}>
          <TextField fullWidth label="WASTAGE (in mm)" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} style={{ padding: "12px 8px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>SHIFT</InputLabel>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {["A", "B"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  SHIFT {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} style={{ padding: "12px 8px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>OPERATOR</InputLabel>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <MenuItem value={item} key={index}>
                  OPERATOR {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          style={{
            padding: "12px 8px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: "#fff",
              color: "#0e4a7b",
              whiteSpace: "nowrap",
              //   width: "100%",
              height: "fit-content",
              border: "1px solid #0e4a7b",
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#0e4a7b",
              color: "#FFF",
              whiteSpace: "nowrap",
              //   width: "100%",
              height: "fit-content",
              border: "1px solid #0e4a7b",
              marginLeft: "16px",
            }}
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Feedback;
