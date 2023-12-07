import { ILocalComment } from "../svg/comment";
import { ILocalEmptyHeart } from "../svg/empty_heart";
import { ILocalHeart } from "../svg/heart";
import { ILocalShared } from "../svg/shared";

const FooterPost = (props) => {
  return (
    <div className="flex flex-row w-full h-10 desktop:pl-12">
      {props.isLike ? (
        <button
          className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu"
          onClick={props.handleActionUnreact}
        >
          <div>
            <ILocalHeart fill="#A73574" className="w-[18px] h-[18px]" />
          </div>

          <p className="text-sm font-medium font-roboto text-[#A73574]">
            {props.reactCount}
          </p>
        </button>
      ) : (
        <button
          className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu"
          onClick={props.handleActionReact}
        >
          <div>
            <ILocalEmptyHeart className="" width="18px" height="18px" />
          </div>

          <p className="text-sm font-medium font-roboto text-[#A73574]">
            {props.reactCount}
          </p>
        </button>
      )}
      <div className="border-[1px] h-10 border-[#F1DEE4]"></div>
      <div className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu pl-3 pr-3">
        <ILocalComment fill="#A73574" />
        <p className="text-sm font-medium font-roboto text-[#A73574]">
          {props?.commentCount || 0}
        </p>
      </div>
      <div className="border-[1px] h-10 border-[#F1DEE4]"></div>

      <div className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu pl-3 pr-3">
        <ILocalShared fill="#A73574" />
        <p className="text-sm font-medium font-roboto text-[#A73574]">Shared</p>
      </div>
    </div>
  );
};

export default FooterPost;
