import React from "react";
import PropTypes from "prop-types";
import { ILocalFollowProfile } from "../svg/followprofile";

const CommunityItemHomePage = (props) => {
  return (
    <div className=" desktop:flex desktop:flex-row desktop:justify-between desktop:gap-1">
      <div className=" grid grid-flow-col items-center gap-2">
        <div className=" w-12 h-12 cursor-pointer">
          <img src={props.item.categoryImage} alt="" />
        </div>
        <div className="flex flex-col overflow-x-hidden">
          <p className=" font-roboto text-sm font-normal ">
            {props.item.categoryName}
          </p>
          <p className=" font-roboto text-xs font-normal">3 Topics</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className=" flex h-10 pr-4 pl-4 items-center gap-[7px] rounded-[36px] bg-button-submit-light hover:bg-button-hover-light cursor-pointer hover:shadow-buttonHover">
          <ILocalFollowProfile className=" w-[16px] h-[16px]" />
          <p className=" text-[#fff] font-roboto text-sm font-medium ">
            Follow
          </p>
        </div>
      </div>
    </div>
  );
};

CommunityItemHomePage.propTypes = {
  item: PropTypes.object,
};

export default CommunityItemHomePage;
