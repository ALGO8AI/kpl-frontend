import MaterialTable from "material-table";
import React from "react";
import { Link } from "react-router-dom";

const tableData = [
  {
    defId: "411N5",
    ctrNo: "455",
    machineId: "Machine 1",
    rollID: "khg123",
    size: "(7x10) cm",
    time: new Date().toLocaleDateString(),
    reason: "Hole on the body",
    acceptance: "No",
  },
  {
    defId: "411N5",
    ctrNo: "455",
    machineId: "Machine 1",
    rollID: "khg123",
    size: "(7x10) cm",
    time: new Date().toLocaleDateString(),
    reason: "Hole on the body",
    acceptance: "No",
  },
  {
    defId: "411N5",
    ctrNo: "455",
    machineId: "Machine 1",
    rollID: "khg123",
    size: "(7x10) cm",
    time: new Date().toLocaleDateString(),
    reason: "Hole on the body",
    acceptance: "No",
  },
  {
    defId: "411N5",
    ctrNo: "455",
    machineId: "Machine 1",
    rollID: "khg123",
    size: "(7x10) cm",
    time: new Date().toLocaleDateString(),
    reason: "Hole on the body",
    acceptance: "No",
  },
  {
    defId: "411N5",
    ctrNo: "455",
    machineId: "Machine 1",
    rollID: "khg123",
    size: "(7x10) cm",
    time: new Date().toLocaleDateString(),
    reason: "Hole on the body",
    acceptance: "No",
  },
  {
    defId: "411N5",
    ctrNo: "455",
    machineId: "Machine 1",
    rollID: "khg123",
    size: "(7x10) cm",
    time: new Date().toLocaleDateString(),
    reason: "Hole on the body",
    acceptance: "No",
  },
  {
    defId: "411N5",
    ctrNo: "455",
    machineId: "Machine 1",
    rollID: "khg123",
    size: "(7x10) cm",
    time: new Date().toLocaleDateString(),
    reason: "Hole on the body",
    acceptance: "No",
  },
  {
    defId: "411N5",
    ctrNo: "455",
    machineId: "Machine 1",
    rollID: "khg123",
    size: "(7x10) cm",
    time: new Date().toLocaleDateString(),
    reason: "Hole on the body",
    acceptance: "No",
  },
  {
    defId: "411N5",
    ctrNo: "455",
    machineId: "Machine 1",
    rollID: "khg123",
    size: "(7x10) cm",
    time: new Date().toLocaleDateString(),
    reason: "Hole on the body",
    acceptance: "No",
  },
  {
    defId: "411N5",
    ctrNo: "455",
    machineId: "Machine 1",
    rollID: "khg123",
    size: "(7x10) cm",
    time: new Date().toLocaleDateString(),
    reason: "Hole on the body",
    acceptance: "No",
  },
];

function DefectTable() {
  return (
    <>
      <MaterialTable
        style={{ marginTop: "20px" }}
        title="Recent Defects Report"
        columns={[
          {
            title: "Defect ID.",
            field: "defId",
            render: (x) => (
              <Link
                to={`/cutting/defectDetails/${x.defId}`}
                className="Link-btn"
              >
                {x.defId}
              </Link>
            ),
          },

          { title: "CTR No.", field: "ctrNo" },
          { title: "Machine ID", field: "machineId" },
          { title: "Roll ID", field: "rollID" },
          {
            title: "Size",
            field: "size",
          },
          {
            title: "Timestamp",
            field: "time",
          },
          {
            title: "Reason for Defect",
            field: "reason",
          },
          {
            title: "Acceptance",
            field: "acceptance",
          },
        ]}
        data={tableData}
        options={{
          exportButton: true,
        }}
      />
    </>
  );
}

export default DefectTable;
