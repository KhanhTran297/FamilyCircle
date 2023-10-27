import PropTypes from "prop-types";
export const ILocalHeartComment = ({ fill, className }) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      className=" rounded-[20px] hover:bg-[#cccccc] cursor-pointer"
    >
      <mask
        id="mask0_792_4945"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.129883" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_792_4945)">
        <path
          d="M12 21.1303L10.55 19.8303C8.86667 18.3136 7.475 17.0053 6.375 15.9053C5.275 14.8053 4.4 13.8178 3.75 12.9428C3.1 12.0678 2.64583 11.2636 2.3875 10.5303C2.12917 9.79694 2 9.04694 2 8.28027C2 6.71361 2.525 5.40527 3.575 4.35527C4.625 3.30527 5.93333 2.78027 7.5 2.78027C8.36667 2.78027 9.19167 2.96361 9.975 3.33027C10.7583 3.69694 11.4333 4.21361 12 4.88027C12.5667 4.21361 13.2417 3.69694 14.025 3.33027C14.8083 2.96361 15.6333 2.78027 16.5 2.78027C18.0667 2.78027 19.375 3.30527 20.425 4.35527C21.475 5.40527 22 6.71361 22 8.28027C22 9.04694 21.8708 9.79694 21.6125 10.5303C21.3542 11.2636 20.9 12.0678 20.25 12.9428C19.6 13.8178 18.725 14.8053 17.625 15.9053C16.525 17.0053 15.1333 18.3136 13.45 19.8303L12 21.1303Z"
          fill={fill}
        />
      </g>
    </svg>
  </div>
);
ILocalHeartComment.propTypes = {
  fill: PropTypes.string.isRequired,
  className: PropTypes.string,
};
