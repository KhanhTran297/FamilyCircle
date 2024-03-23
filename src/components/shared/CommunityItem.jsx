import { useState } from "react";
import PropTypes from "prop-types";
import { ILocalFollowProfile } from "../svg/followprofile";
import { ILocalCircle } from "../svg/circle";
import { useNavigate } from "react-router-dom";
import useCommunityMutate from "../../hooks/useMutate/useCommunityMutate";

const CommunityItem = (props) => {
  const navigate = useNavigate();
  const [text, setText] = useState("Following");
  const [color, setColor] = useState("#A73574");
  const { unFollowCommunity, followCommunity } = useCommunityMutate();
  return (
    <div className=" flex flex-col shadow-lg rounded-xl xl:h-[300px] h-[300px]">
      <div
        className=" bg-[#ffeaf1] h-1/2 w-[300px] flex justify-center rounded-xl cursor-pointer"
        onClick={() => {
          navigate(`/community/${props.item.categoryName.toLowerCase()}`);
        }}
      >
        <img src={props.item.categoryImage} alt="" className="h-full" />
      </div>
      <div className=" relative h-full flex flex-col gap-2 pl-3 pr-3 pt-2 pb-2">
        <div className=" flex flex-col gap-2">
          <p className=" font-roboto text-xl font-medium">
            {props.item.categoryName}
          </p>
          <div className=" flex items-center flex-row gap-1">
            <p className=" font-roboto text-sm">3 topics</p>
            <ILocalCircle fill="#ccc" />
            <p className=" font-roboto text-sm">3 followers</p>
            {/* <circle />
            <p className=" font-roboto text-sm"></p> */}
          </div>
        </div>
        <div className=" absolute bottom-3 left-0 right-0 w-full pl-2 pr-2 ">
          <div className="flex items-center  w-full">
            {/* <div className=" flex h-10 pr-4 pl-4 justify-center items-center gap-[7px] w-full  rounded-[36px] bg-button-submit-light hover:bg-button-hover-light cursor-pointer hover:shadow-buttonHover">
              <ILocalFollowProfile
                className=" w-[16px] h-[16px]"
                fill="black"
              />
              <p className=" text-[#fff] font-roboto text-sm font-medium ">
                Follow
              </p>
            </div> */}
            {props.item.joined ? (
              <div
                // onClick={() => unFollow({ accountId: profileId })}
                onClick={() =>
                  unFollowCommunity({ communityId: props.item.id })
                }
                onMouseEnter={() => {
                  setText("Unfollow"), setColor("red");
                }}
                onMouseLeave={() => {
                  setText("Following"), setColor("#A73574");
                }}
                className="  flex h-10 w-full pr-4 pl-4 items-center justify-center gap-[7px] rounded-[36px] border border-solid border-button-submit-light cursor-pointer hover:bg-bgErrorButton hover:border-[#BA1A1A]"
              >
                <p
                  className={` text-[${color}] font-roboto text-sm font-medium `}
                >
                  {text}
                </p>
              </div>
            ) : (
              <div
                // onClick={() => createFollow({ accountId: profileId })}
                onClick={() => followCommunity({ communityId: props.item.id })}
                className=" flex h-10 pr-4 pl-4 w-full justify-center items-center gap-[7px] rounded-[36px] bg-button-submit-light hover:bg-button-hover-light cursor-pointer hover:shadow-buttonHover"
              >
                <ILocalFollowProfile
                  className=" w-[18px] h-[18px]"
                  fill="black"
                />
                <p className=" text-[#fff] font-roboto text-sm font-medium ">
                  Follow
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CommunityItem.propTypes = {
  item: PropTypes.object,
};

export default CommunityItem;
