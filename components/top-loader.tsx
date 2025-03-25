import HolyLoader from "holy-loader";
import React from "react";

export default function TopLoader() {
  return (
    <>
      <HolyLoader
        color="#000"
        height={4}
        speed={250}
        easing="linear"
        showSpinner={true}
      />
    </>
  );
}
