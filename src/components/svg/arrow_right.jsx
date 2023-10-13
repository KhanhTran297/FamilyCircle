import PropTypes from "prop-types";

export const ILocalArrowRight = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
  >
    <mask
      id="mask0_738_7098"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="25"
    >
      <rect y="0.129883" width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_738_7098)">
      <path
        d="M3 20.1299V4.12988L22 12.1299L3 20.1299ZM5 17.1299L16.85 12.1299L5 7.12988V10.6299L11 12.1299L5 13.6299V17.1299Z"
        fill={fill}
      />
    </g>
  </svg>
);
ILocalArrowRight.propTypes = {
  fill: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
