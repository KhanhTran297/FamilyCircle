// Icons.js
import PropTypes from "prop-types";
export const ILocalEmptyBookmark = ({ className, fill }) => (
  <div className={className}>
    <svg
      width="350px"
      height="350px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L13.0815 17.1953C12.4227 16.7717 11.5773 16.7717 10.9185 17.1953L5 21Z"
        stroke="#000000"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);
ILocalEmptyBookmark.propTypes = {
  className: PropTypes.string,
};
