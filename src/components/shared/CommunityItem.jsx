import { useState } from "react";
import PropTypes from "prop-types";
import { ILocalFollowProfile } from "../svg/followprofile";
import { ILocalCircle } from "../svg/circle";
import { useNavigate } from "react-router-dom";
import useCommunityMutate from "../../hooks/useMutate/useCommunityMutate";
import { useQuery } from "@tanstack/react-query";
import { ListUserCommunityApi } from "../../api/community";
import { getListCategoryApi } from "../../api/category";

const CommunityItem = (props) => {
  const navigate = useNavigate();
  const { data: listMember, refetch: refetchListMember } = useQuery({
    queryKey: ["getListMemberCommunity", props?.item?.id],
    queryFn: () =>
      ListUserCommunityApi({ communityId: props?.item?.id }).then((res) => {
        return res?.data;
      }),
  });
  const { data: listTopics } = useQuery({
    queryKey: ["getListTopic", props?.item?.id],
    queryFn: () =>
      getListCategoryApi({ parentId: props?.item?.id }).then((res) => {
        return res?.data?.content;
      }),
  });

  const [text, setText] = useState("Following");
  const [color, setColor] = useState("#A73574");
  const { unFollowCommunity, followCommunity } = useCommunityMutate();
  return (
    <div className=" flex flex-col shadow-lg rounded-xl xl:h-[300px] h-[300px]">
      <div
        // className=" bg-[#ffeaf1] h-1/2 w-[300px] flex justify-center rounded-xl cursor-pointer"
        className="h-[250px] w-[300px] flex justify-center rounded-xl cursor-pointer px-8 z-30  bg-[#ffeaf1]  text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-[#a73574] after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af] text-2xl"
        onClick={() => {
          navigate(`/community/${props.item.categoryName.toLowerCase()}`);
        }}
      >
        <img
          src={props.item.categoryImage}
          alt=""
          className="object-scale-down h-full "
        />
      </div>
      <div className="relative flex flex-col h-full gap-2 pt-2 pb-2 pl-3 pr-3 ">
        <div className="flex flex-col gap-2 ">
          <p className="text-xl font-medium font-roboto">
            {props.item.categoryName}
          </p>
          <div className="flex flex-row items-center gap-1 ">
            <p className="text-sm font-roboto">
              {" "}
              {listTopics
                ? listTopics?.length > 1
                  ? listTopics?.length + " topics"
                  : listTopics?.length + " topic"
                : "0 topic"}
            </p>
            <ILocalCircle fill="#ccc" />
            <p className="text-sm font-roboto">
              {" "}
              {listMember
                ? listMember?.totalElements > 1
                  ? listMember?.totalElements + " followers"
                  : listMember?.totalElements + " follower"
                : "0 follower"}
            </p>
            {/* <circle />
            <p className="text-sm font-roboto"></p> */}
          </div>
        </div>
        <div className="absolute left-0 right-0 w-full pl-2 pr-2 bottom-3">
          <div className="flex items-center w-full">
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
                  unFollowCommunity({ communityId: props.item.id }).then(() =>
                    refetchListMember()
                  )
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
                onClick={() =>
                  followCommunity({ communityId: props.item.id }).then(() =>
                    refetchListMember()
                  )
                }
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
