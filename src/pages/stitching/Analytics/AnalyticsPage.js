import React from "react";

function AnalyticsPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <iframe
        src="http://120.120.120.147:9003/public/dashboard/48395ef4-5afd-448d-969c-9ecae15d87f9"
        frameborder="0"
        width="100%"
        height="100%"
        allowtransparency
        title="Anaytics"
      ></iframe>
    </div>
  );
}

export default AnalyticsPage;
