import React from "react";
import { ImSpinner2 } from "react-icons/im";

function LoadingPage() {
  return (
    <div className="loading-page">
      <ImSpinner2 className="loading-page__spinner" />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingPage;
