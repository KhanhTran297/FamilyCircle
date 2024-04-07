import React from "react";
import PropTypes from "prop-types";
import { useParams, useSearchParams } from "react-router-dom";

const TopicItem = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className="cursor-pointer xl:flex xl:flex-row xl:gap-3"
      onClick={() => setSearchParams({ topicId: props.item.id })}
    >
      <div className=" xl:w-10 xl:h-10">
        <img src={props.item.categoryImage} alt="" />
      </div>
      <div className="flex items-center ">
        <p className="text-sm font-roboto">{props.item.categoryName}</p>
      </div>
    </div>
  );
};

TopicItem.propTypes = {
  item: PropTypes.object,
};

export default TopicItem;
