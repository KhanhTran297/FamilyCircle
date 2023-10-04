import PropTypes from "prop-types";
export const ILocalComment = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
  >
    <mask
      id="mask0_337_3095"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="18"
      height="19"
    >
      <rect y="0.705078" width="18" height="18" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_337_3095)">
      <path
        d="M16.5 17.2051L13.5 14.2051H3C2.5875 14.2051 2.23438 14.0582 1.94063 13.7645C1.64688 13.4707 1.5 13.1176 1.5 12.7051V3.70508C1.5 3.29258 1.64688 2.93945 1.94063 2.6457C2.23438 2.35195 2.5875 2.20508 3 2.20508H15C15.4125 2.20508 15.7656 2.35195 16.0594 2.6457C16.3531 2.93945 16.5 3.29258 16.5 3.70508V17.2051ZM14.1375 12.7051L15 13.5488V3.70508H3V12.7051H14.1375Z"
        fill={fill}
      />
    </g>
  </svg>
);
ILocalComment.propTypes = {
  fill: PropTypes.string.isRequired,
};
