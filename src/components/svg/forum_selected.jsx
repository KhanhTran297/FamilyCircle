import PropTypes from "prop-types";
export const ILocalForumSelected = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <mask
      id="mask0_550_8414"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_550_8414)">
      <path
        d="M7 18C6.71667 18 6.47917 17.9042 6.2875 17.7125C6.09583 17.5208 6 17.2833 6 17V15H19V6H21C21.2833 6 21.5208 6.09583 21.7125 6.2875C21.9042 6.47917 22 6.71667 22 7V22L18 18H7ZM2 17V3C2 2.71667 2.09583 2.47917 2.2875 2.2875C2.47917 2.09583 2.71667 2 3 2H16C16.2833 2 16.5208 2.09583 16.7125 2.2875C16.9042 2.47917 17 2.71667 17 3V12C17 12.2833 16.9042 12.5208 16.7125 12.7125C16.5208 12.9042 16.2833 13 16 13H6L2 17Z"
        fill={fill}
      />
    </g>
  </svg>
);
ILocalForumSelected.propTypes = {
  fill: PropTypes.string.isRequired,
};
