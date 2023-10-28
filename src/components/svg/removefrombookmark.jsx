import PropTypes from "prop-types";
export const ILocalRemoveBookmark = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <mask
      id="mask0_1016_2600"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_1016_2600)">
      <path
        d="M21 7H15V5H21V7ZM5 21V5C5 4.45 5.19583 3.97917 5.5875 3.5875C5.97917 3.19583 6.45 3 7 3H13V5H7V17.95L12 15.8L17 17.95V11H19V21L12 18L5 21Z"
        fill={fill}
      />
    </g>
  </svg>
);
ILocalRemoveBookmark.propTypes = {
  fill: PropTypes.string.isRequired,
};
