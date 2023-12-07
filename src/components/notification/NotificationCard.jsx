import React from "react";
import AvtUser from "../shared/AvtUser";
import { useNavigate } from "react-router-dom";

const NotificationCard = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row items-center self-stretch gap-2 px-6 py-3 border-b-[1px] border-solid border-[#F1DEE4]"
      onClick={() => {
        navigate(`/profile/${props.id}`);
      }}
    >
      <AvtUser imageUrl={props.avatar} />
      <div className="flex flex-col items-start self-stretch gap-1">
        <div className="flex flex-row items-start self-stretch gap-1 ">
          <div className="text-[#1F1A1C] font-roboto text-base font-medium">
            {props.fullName}
          </div>
          <div className="text-[#1F1A1C] font-roboto text-base font-normal">
            {props.content}
          </div>
        </div>
        <div className="text-[#504348] font-roboto text-base font-normal">
          {props.createdDate}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
