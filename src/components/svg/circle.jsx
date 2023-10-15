import PropTypes from "prop-types";

export const ILocalCircle = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="4"
    height="5"
    viewBox="0 0 4 5"
    fill="none"
  >
    <circle cx="2" cy="2.12988" r="2" fill={fill} />
  </svg>
);
ILocalCircle.propTypes = {
  fill: PropTypes.string.isRequired,
};
