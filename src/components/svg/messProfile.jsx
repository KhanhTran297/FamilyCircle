import PropTypes from "prop-types";
export const ILocalMessProfile = ({ fill, className }) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <mask
        id="mask0_1095_2436"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="18"
        height="18"
      >
        <rect width="18" height="18" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1095_2436)">
        <path
          d="M1.5 16.5V3C1.5 2.5875 1.64688 2.23438 1.94063 1.94063C2.23438 1.64688 2.5875 1.5 3 1.5H15C15.4125 1.5 15.7656 1.64688 16.0594 1.94063C16.3531 2.23438 16.5 2.5875 16.5 3V12C16.5 12.4125 16.3531 12.7656 16.0594 13.0594C15.7656 13.3531 15.4125 13.5 15 13.5H4.5L1.5 16.5ZM3.8625 12H15V3H3V12.8438L3.8625 12Z"
          fill="#A73574"
        />
      </g>
    </svg>
  </div>
);
ILocalMessProfile.propTypes = {
  fill: PropTypes.string.isRequired,
  className: PropTypes.string,
};
