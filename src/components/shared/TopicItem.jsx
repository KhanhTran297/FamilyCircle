import React from "react";
import PropTypes from "prop-types";

const TopicItem = (props) => {
  return (
    <div className="xl:flex xl:flex-row xl:gap-3 cursor-pointer">
      <div className=" xl:w-10 xl:h-10">
        <img src={props.item.img} alt="" />
      </div>
      <div className=" flex items-center">
        <p className=" font-roboto text-sm">{props.item.name}</p>
      </div>
    </div>
  );
};

TopicItem.propTypes = {
  item: PropTypes.object,
};

export default TopicItem;
