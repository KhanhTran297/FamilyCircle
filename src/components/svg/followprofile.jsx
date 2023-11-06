import PropTypes from "prop-types";
export const ILocalFollowProfile = ({ fill, className }) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <mask
        id="mask0_1095_1441"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="18"
        height="18"
      >
        <rect width="18" height="18" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1095_1441)">
        <path
          d="M3 14.25V12.75H4.5V7.5C4.5 6.4375 4.81875 5.50938 5.45625 4.71562C6.09375 3.92188 6.9 3.4 7.875 3.15V2.625C7.875 2.3125 7.98438 2.04688 8.20312 1.82812C8.42188 1.60937 8.6875 1.5 9 1.5C9.3125 1.5 9.57812 1.60937 9.79688 1.82812C10.0156 2.04688 10.125 2.3125 10.125 2.625V3.15C10.4375 3.225 10.7313 3.33125 11.0063 3.46875C11.2812 3.60625 11.5375 3.775 11.775 3.975L10.7063 5.04375C10.4688 4.86875 10.2063 4.73438 9.91875 4.64062C9.63125 4.54688 9.325 4.5 9 4.5C8.175 4.5 7.46875 4.79375 6.88125 5.38125C6.29375 5.96875 6 6.675 6 7.5V12.75H12V10.5H13.5V12.75H15V14.25H3ZM9 16.5C8.5875 16.5 8.23438 16.3531 7.94063 16.0594C7.64687 15.7656 7.5 15.4125 7.5 15H10.5C10.5 15.4125 10.3531 15.7656 10.0594 16.0594C9.76563 16.3531 9.4125 16.5 9 16.5ZM14.25 9.75V7.5H12V6H14.25V3.75H15.75V6H18V7.5H15.75V9.75H14.25Z"
          fill="#FFF8F8"
        />
      </g>
    </svg>
  </div>
);
ILocalFollowProfile.propTypes = {
  fill: PropTypes.string.isRequired,
  className: PropTypes.string,
};
