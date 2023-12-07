import React from "react";
import { useNavigate } from "react-router-dom";

const NewPostCard = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex self-stretch w-full h-auto p-4 break-words cursor-pointer border-t-[1px] border-solid border-[#ccc] "
      onClick={() => navigate(`/post/${props.id}`)}
    >
      <div className="text-base font-medium font-roboto text-[#1F1A1C] hover:font-semibold hover:text-button-submit-light">
        {props.title}
      </div>
    </div>
  );
};

export default NewPostCard;
