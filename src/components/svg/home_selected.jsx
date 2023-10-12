import PropTypes from "prop-types";
export const ILocalHomeSelected = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <mask
      id="mask0_13_2025"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_13_2025)">
      <path d="M4 21V9L12 3L20 9V21H14V14H10V21H4Z" fill={fill} />
    </g>
  </svg>
);
ILocalHomeSelected.propTypes = {
  fill: PropTypes.string.isRequired,
};
