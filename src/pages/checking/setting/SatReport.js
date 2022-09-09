import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { callBackendV2 } from "../../../services/http.servicev2";
import {
  theme as THEME,
  stitchingLines,
  wings,
  shifts,
} from "../../../Utility/constants";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: THEME.BLUE,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 24,
  },
}))(TableCell);
const StyledTableDataCell = withStyles((theme) => ({
  head: {
    fontSize: 16,
  },
}))(TableCell);

function SatReport() {
  const [satData, setSatData] = useState([]);
  const [oldData, setOldData] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOldData([]);
    setOpen(false);
  };

  const fetchOldData = async (id) => {
    handleClickOpen();
    const { data } = await callBackendV2(
      "GET",
      `routes/sat/reportCardbyWorker/${id}`
    );
    setOldData(data);
  };

  const fetchData = async () => {
    try {
      const { data } = await callBackendV2(
        "GET",
        `routes/sat/latestReportCard/Test/${localStorage.getItem("kpl_wing")}`
      );
      console.log(data);

      setSatData(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid
      container
      item
      xs={12}
      style={{
        padding: "1rem",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Worker ID",
                "Worker Name",
                "Wing",
                "Taken On",
                "Marks Obtained",
                "Total Marks",
                "Percentage",
                "Old Data",
              ].map((item, index) => (
                <StyledTableCell key={index}>{item}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {satData.map((item, index) => (
              <TableRow key={index}>
                <StyledTableDataCell>{item.workerId}</StyledTableDataCell>
                <StyledTableDataCell>{item.workerName}</StyledTableDataCell>
                <StyledTableDataCell>{item.wing}</StyledTableDataCell>
                <StyledTableDataCell>
                  {new Date(item.date).toLocaleDateString()}
                </StyledTableDataCell>
                <StyledTableDataCell>{item.marksObtained}</StyledTableDataCell>
                <StyledTableDataCell>{item.totalMarks}</StyledTableDataCell>
                <StyledTableDataCell>{item.percentage}</StyledTableDataCell>
                <StyledTableDataCell>
                  <Button onClick={() => fetchOldData(item.workerId)}>
                    View Old Data
                  </Button>
                </StyledTableDataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          HISTORY
        </DialogTitle>
        <DialogContent dividers>
          <Grid container item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {[
                      "Worker ID",
                      "Worker Name",
                      "Wing",
                      "Taken On",
                      "Marks Obtained",
                      "Total Marks",
                      "Percentage",
                    ].map((item, index) => (
                      <StyledTableCell key={index}>{item}</StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {oldData?.map((item, index) => (
                    <TableRow key={index}>
                      <StyledTableDataCell>{item.workerId}</StyledTableDataCell>
                      <StyledTableDataCell>
                        {item.workerName}
                      </StyledTableDataCell>
                      <StyledTableDataCell>{item.wing}</StyledTableDataCell>
                      <StyledTableDataCell>
                        {new Date(item.date).toLocaleDateString()}
                      </StyledTableDataCell>
                      <StyledTableDataCell>
                        {item.marksObtained}
                      </StyledTableDataCell>
                      <StyledTableDataCell>
                        {item.totalMarks}
                      </StyledTableDataCell>
                      <StyledTableDataCell>
                        {item.percentage}
                      </StyledTableDataCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default SatReport;
