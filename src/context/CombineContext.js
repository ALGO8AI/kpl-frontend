import React from "react";
import { CheckingProvider } from "./CheckingContext";
import { CuttingProvider } from "./CuttingContext";
import { PrintContextProvider } from "./PrintContext";
import { StitchingProvider } from "./StitchingContext";
import { KPLProvider } from "./ViolationContext";

function CombineContext({ children }) {
  return (
    <>
      <KPLProvider>
        <CuttingProvider>
          <CheckingProvider>
            <StitchingProvider>
              <PrintContextProvider>{children}</PrintContextProvider>
            </StitchingProvider>
          </CheckingProvider>
        </CuttingProvider>
      </KPLProvider>
    </>
  );
}

export default CombineContext;
