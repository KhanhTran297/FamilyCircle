import { ILocalComment } from "../svg/comment";
import { ILocalHeart } from "../svg/heart";
import { ILocalShared } from "../svg/shared";

const FooterPost = (props) => {
  return (
    <div className="flex flex-row w-full h-10 xl:pl-12">
      <div className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu">
        <button onClick={props.handleActionReact}>
          <ILocalHeart fill={props.isLike ? "#A73574" : "gray"} />
        </button>
        <p className="text-sm font-medium font-roboto text-[#A73574]">
          {props.reactCount}
        </p>
      </div>
      <div className="border-[1px] h-10 border-[#F1DEE4]"></div>
      <div className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu pl-3 pr-3">
        <ILocalComment fill="#A73574" />
        <p className="text-sm font-medium font-roboto text-[#A73574]">6</p>
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
