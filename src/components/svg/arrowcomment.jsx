import PropTypes from "prop-types";

export const ILocalArrowComment = ({ fill, className, eventClick }) => (
  <div className={className} onClick={eventClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        d="M21 20.1299C9.9543 20.1299 1 11.1756 1 0.129883"
        stroke="#F1DEE4"
      />
    </svg>
  </div>
);
ILocalArrowComment.propTypes = {
  fill: PropTypes.string.isRequired,
  className: PropTypes.string,
  eventClick: PropTypes.func,
};
