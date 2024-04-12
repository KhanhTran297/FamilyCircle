import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getListCategoryApi } from "../../api/category";
const MyCommunityItem = (props) => {
  const navigate = useNavigate();
  const { data: listTopic } = useQuery({
    queryKey: ["getListTopic", props.item.community.id],
    queryFn: () =>
      getListCategoryApi({ parentId: props.item.community.id }).then((res) => {
        return res?.data?.content;
      }),
  });
  const [text, setText] = useState("Following");
  const [color, setColor] = useState("#A73574");
  return (
    <div className=" desktop:flex desktop:flex-row desktop:justify-between desktop:gap-1">
      <div
        className="grid items-center grid-flow-col gap-2 cursor-pointer "
        onClick={() =>
          navigate(`/community/${props.item.community.categoryName}`)
        }
      >
        <div className="w-12 h-12 cursor-pointer ">
          <img
            src={props.item.community.categoryImage}
            alt=""
            className="object-cover w-full h-full rounded-full "
          />
        </div>
        <div className="flex flex-col overflow-x-hidden">
          <p className="text-sm font-normal font-roboto">
            {props.item.community.categoryName}
          </p>
          <p className="text-xs font-normal font-roboto">
            {listTopic?.length > 1
              ? listTopic?.length + " topics"
              : listTopic?.length + " topic"}
          </p>
        </div>
      </div>
      <div
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
