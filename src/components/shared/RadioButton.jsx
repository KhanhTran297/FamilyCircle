import React from "react";
import { ILocalCheck } from "../svg/check";

const RadioButton = ({ value, isChecked, onChange }) => {
  return (
    <label className="flex items-center h-12 gap-4 px-4 cursor-pointer">
      <div className="relative">
        <input
          type="radio"
          className="hidden"
          checked={isChecked}
          onChange={onChange}
        />
        <div className="w-6 h-6 border border-gray-300 rounded-sm">
          {isChecked && <ILocalCheck fill="#1F1A1C" />}
        </div>
      </div>
      <span className="text-sm font-medium font-roboto">{value}</span>
    </label>
  );
};

export default RadioButton;
