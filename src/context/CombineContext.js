import React from "react";
import { CheckingProvider } from "./CheckingContext";
import { StitchingProvider } from "./StitchingContext";
import { KPLProvider } from "./ViolationContext";

function CombineContext({ children }) {
  return (
    <>
      <KPLProvider>
        <CheckingProvider>
          <StitchingProvider>{children}</StitchingProvider>
        </CheckingProvider>
      </KPLProvider>
    </>
  );
}

export default CombineContext;
