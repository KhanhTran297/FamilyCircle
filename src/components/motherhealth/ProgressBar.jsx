import React from "react";

const ProgressBar = () => {
  const bmi = 18.9;
  let progressType;

  // Determine progress type based on BMI ranges
  if (bmi < 18.5) {
    progressType = "skinny";
  } else if (bmi >= 18.5 && bmi < 25) {
    progressType = "normal";
  } else {
    progressType = "obese";
  }

  return (
    <div className="progress-bar">
      {/* Level 1: Skinny */}
      <div
        className={`progress skinny ${
          progressType === "skinny" ? "active" : ""
        }`}
      ></div>

      {/* Level 2: Normal */}
      <div
        className={`progress normal ${
          progressType === "normal" ? "active" : ""
        }`}
      ></div>

      {/* Level 3: Obese */}
      <div
        className={`progress obese ${progressType === "obese" ? "active" : ""}`}
      ></div>
    </div>
  );
};

export default ProgressBar;
