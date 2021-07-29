import React from "react";
import { CheckingProvider } from "./CheckingContext";
import { CuttingProvider } from "./CuttingContext";
import { StitchingProvider } from "./StitchingContext";
import { KPLProvider } from "./ViolationContext";

function CombineContext({ children }) {
  return (
    <>
      <KPLProvider>
        <CuttingProvider>
          <CheckingProvider>
            <StitchingProvider>{children}</StitchingProvider>
          </CheckingProvider>
        </CuttingProvider>
      </KPLProvider>
    </>
  );
}

export default CombineContext;
