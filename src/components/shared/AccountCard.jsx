import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AccountCard = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row gap-4 px-2 py-2 rounded-xl border border-[#ccc] cursor-pointer shadow-lg hover:opacity-50"
      onClick={() => navigate(`/profile/${props.account.id}`)}
    >
      <div className="flex items-center justify-center">
        <img
          src={props.account.avatar}
          alt=""
          className="object-scale-down w-10 h-10 rounded-full "
        />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col justify-center gap-1">
          <div className="">
            <p className="text-lg font-normal font-roboto">
              {props.account.fullName}
            </p>
          </div>
          <div className="">
            <p className="text-sm font-roboto">
              {props.account.group.kind === 2 ? "user" : "expert"}
            </p>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

AccountCard.propTypes = {
  account: PropTypes.object.isRequired,
};

export default AccountCard;
