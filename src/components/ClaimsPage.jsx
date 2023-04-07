import React from "react";
import AdvanceClaims from "./advanceClaims/AdvanceClaims";
import NormalClaims from "./normalClaims/NormalClaims";

const ClaimsPage = () => {
  return (
    <>
      <NormalClaims />
      <AdvanceClaims />
    </>
  );
};

export default ClaimsPage;
