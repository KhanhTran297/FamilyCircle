import PropTypes from "prop-types";

const IconFooter = ({ children, count, check, handleClick }) => {
  return (
    <div className="flex flex-row  items-center gap-1" onClick={handleClick}>
      <div className=" w-10 h-10 rounded-[20px] hover:bg-[#cccccc] cursor-pointer flex flex-col justify-center items-center ">
        {children}
      </div>
      {check && (
        <p className=" font-roboto text-sm font-medium text-[#1F1A1C]">
          {count}
        </p>
      )}
    </div>
  );
};
IconFooter.propTypes = {
  children: PropTypes.element.isRequired,
  count: PropTypes.number,
  check: PropTypes.bool,
  handleClick: PropTypes.func,
};
export default IconFooter;
