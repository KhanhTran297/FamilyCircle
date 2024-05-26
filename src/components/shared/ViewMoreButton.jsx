import React from "react";
import PropTypes from "prop-types";
import { ILocalViewMore } from "../svg/viewmore";

const ViewMoreButton = (props) => {
  return (
    <div className="cursor-pointer font-roboto flex gap-2 items-center text-sm font-medium justify-center bg-[#a73574] hover:border-[#a73574] px-3 py-2  rounded-full text-white tracking-wider shadow-xl hover:bg-[#a73574] hover:scale-105 duration-500 hover:ring-1 w-[150px]">
      View more
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5 animate-bounce"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
        ></path>
      </svg> */}
      <ILocalViewMore fill="white" />
    </div>
  );
};

ViewMoreButton.propTypes = {};

export default ViewMoreButton;
