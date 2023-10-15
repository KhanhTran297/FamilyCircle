import PropTypes from "prop-types";
export const ILocalReply = ({ fill, className }) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <mask
        id="mask0_792_5105"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.129883" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_792_5105)">
        <path
          d="M19 19.1299V15.1299C19 14.2965 18.7083 13.5882 18.125 13.0049C17.5417 12.4215 16.8333 12.1299 16 12.1299H6.825L10.425 15.7299L9 17.1299L3 11.1299L9 5.12988L10.425 6.52988L6.825 10.1299H16C17.3833 10.1299 18.5625 10.6174 19.5375 11.5924C20.5125 12.5674 21 13.7465 21 15.1299V19.1299H19Z"
          fill={fill}
        />
      </g>
    </svg>
  </div>
);
ILocalReply.propTypes = {
  fill: PropTypes.string.isRequired,
  className: PropTypes.string,
};
