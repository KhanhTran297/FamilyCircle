import PropTypes from "prop-types";

export const ILocalArrowLeft = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <mask
      id="mask0_734_5257"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_734_5257)">
      <path
        d="M12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825L13.425 18.6L12 20Z"
        fill={fill}
      />
    </g>
  </svg>
);
ILocalArrowLeft.propTypes = {
  fill: PropTypes.string.isRequired,
};
