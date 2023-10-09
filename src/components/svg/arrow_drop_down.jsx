import PropTypes from "prop-types";

export const ILocalArrowDropDown = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <mask
      id="mask0_567_2818"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_567_2818)">
      <path d="M12 15L7 10H17L12 15Z" fill={fill} />
    </g>
  </svg>
);
ILocalArrowDropDown.propTypes = {
  fill: PropTypes.string.isRequired,
};
