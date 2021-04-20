import React from "react";
import { StitchingProvider } from "./StitchingContext";
import { KPLProvider } from "./ViolationContext";

function CombineContext({ children }) {
  return (
    <>
      <KPLProvider>
        <StitchingProvider>{children}</StitchingProvider>
      </KPLProvider>
    </>
  );
}

export default CombineContext;
