import PropTypes from "prop-types";

export const ILocalChange = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <mask
      id="mask0_534_207"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_534_207)">
      <path
        d="M12.05 20C9.81667 20 7.91667 19.225 6.35 17.675C4.78333 16.125 4 14.2333 4 12V11.825L2.4 13.425L1 12.025L5 8.025L9 12.025L7.6 13.425L6 11.825V12C6 13.6667 6.5875 15.0833 7.7625 16.25C8.9375 17.4167 10.3667 18 12.05 18C12.4833 18 12.9083 17.95 13.325 17.85C13.7417 17.75 14.15 17.6 14.55 17.4L16.05 18.9C15.4167 19.2667 14.7667 19.5417 14.1 19.725C13.4333 19.9083 12.75 20 12.05 20ZM19 15.975L15 11.975L16.4 10.575L18 12.175V12C18 10.3333 17.4125 8.91667 16.2375 7.75C15.0625 6.58333 13.6333 6 11.95 6C11.5167 6 11.0917 6.05 10.675 6.15C10.2583 6.25 9.85 6.4 9.45 6.6L7.95 5.1C8.58333 4.73333 9.23333 4.45833 9.9 4.275C10.5667 4.09167 11.25 4 11.95 4C14.1833 4 16.0833 4.775 17.65 6.325C19.2167 7.875 20 9.76667 20 12V12.175L21.6 10.575L23 11.975L19 15.975Z"
        fill={fill}
      />
    </g>
  </svg>
);
ILocalChange.propTypes = {
  fill: PropTypes.string.isRequired,
};
