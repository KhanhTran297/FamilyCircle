import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useCommunityMutate from "../../hooks/useMutate/useCommunityMutate";

const MyCommunityItem = (props) => {
  const navigate = useNavigate();
  const { unFollowCommunity } = useCommunityMutate();
  const [text, setText] = useState("Following");
  const [color, setColor] = useState("#A73574");
  return (
    <div className=" desktop:flex desktop:flex-row desktop:justify-between desktop:gap-1 ">
      <div
        className=" grid grid-flow-col items-center gap-2 cursor-pointer"
        onClick={() =>
          navigate(`/community/${props.item.community.categoryName}`)
        }
      >
        <div className=" w-12 h-12 cursor-pointer">
          <img
            src="https://cdn-together.marrybaby.vn/communities/pregnancy.png"
            alt=""
          />
        </div>
        <div className="flex flex-col overflow-x-hidden">
          <p className=" font-roboto text-sm font-normal ">
            {props.item.community.categoryName}
          </p>
          <p className=" font-roboto text-xs font-normal">3 chủ đề</p>
        </div>
      </div>
      {/* <div className="flex items-center">
        <div className=" flex h-10 pr-4 pl-4 items-center gap-[7px] rounded-[36px] bg-button-submit-light hover:bg-button-hover-light cursor-pointer hover:shadow-buttonHover">
          <ILocalFollowProfile className=" w-[16px] h-[16px]" fill="black" />
          <p className=" text-[#fff] font-roboto text-sm font-medium ">
            Follow
          </p>
        </div>
      </div> */}
      <div
        // onClick={() => unFollow({ accountId: profileId })}
        // onClick={() =>
        //   unFollowCommunity({ communityId: props.item.community.id })
        // }
        onClick={() => props.showModal(props.item.community.id)}
        onMouseEnter={() => {
          setText("Unfollow"), setColor("red");
        }}
        onMouseLeave={() => {
          setText("Following"), setColor("#A73574");
        }}
        className="  flex h-10 xl:w-[93px] pr-4 pl-4 items-center gap-[7px] rounded-[36px] border border-solid border-button-submit-light cursor-pointer hover:bg-bgErrorButton hover:border-[#BA1A1A]"
      >
        <p className={` text-[${color}] font-roboto text-sm font-medium `}>
          {text}
        </p>
      </div>
    </div>
  );
};

MyCommunityItem.propTypes = {
  item: PropTypes.object,
  showModal: PropTypes.func,
  handleUnFollow: PropTypes.func,
};

export default MyCommunityItem;
