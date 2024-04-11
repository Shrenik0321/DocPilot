import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader
        color={"#ef4444"}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
