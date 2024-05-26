import PropTypes from "prop-types";
export const ILocalViewMore = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className=" animate-bounce"
  >
    <mask
      id="mask0_450_4753"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="18"
      height="18"
    >
      <rect x="0.5" width="18" height="18" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_450_4753)">
      <path
        d="M5 7.05L6.05 6L9.5 9.45L12.95 6L14 7.05L9.5 11.55L5 7.05Z"
        fill={fill}
      />
    </g>
  </svg>
);
ILocalViewMore.propTypes = {
  fill: PropTypes.string.isRequired,
};
