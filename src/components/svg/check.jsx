import PropTypes from "prop-types";

export const ILocalCheck = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
  >
    <mask
      id="mask0_981_2173"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="25"
    >
      <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_981_2173)">
      <path
        d="M10 16.9L6 12.9L7.4 11.5L10 14.1L16.6 7.5L18 8.9L10 16.9Z"
        fill={fill}
      />
    </g>
  </svg>
);
ILocalCheck.propTypes = {
  fill: PropTypes.string.isRequired,
};
