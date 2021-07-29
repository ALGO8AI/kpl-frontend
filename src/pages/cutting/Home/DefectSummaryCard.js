import React from "react";
import "./DefectSummary.css";
function DefectSummaryCard() {
  return (
    <div className="defCard">
      <div className="defTitle">Defect Overall</div>
      <div className="defCardRow">
        <div>Total Defects</div>
        <div>100</div>
      </div>
      <div className="defCardRow">
        <div>Defects Identified</div>
        <div>96</div>
      </div>
      <div className="defCardRow">
        <div>Defects Missed</div>
        <div>2</div>
      </div>
      <div className="defCardRow">
        <div>Error %</div>
        <div>2</div>
      </div>
    </div>
  );
}

export default DefectSummaryCard;
