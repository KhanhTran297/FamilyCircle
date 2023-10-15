import PropTypes from "prop-types";

const IconFooter = ({ children, count, check }) => {
  return (
    <div className="xl:flex xl:flex-row gap-1 items-center">
      <div className="">{children}</div>
      {check && <p className=" font-roboto text-sm font-medium">{count}</p>}
    </div>
  );
};
IconFooter.propTypes = {
  children: PropTypes.element.isRequired,
  count: PropTypes.number,
  check: PropTypes.bool,
};
export default IconFooter;
