import { ILocalComment } from "../svg/comment";
import { ILocalHeart } from "../svg/heart";
import { ILocalShared } from "../svg/shared";

const FooterPost = () => {
  return (
    <div className="flex flex-row w-full h-10 xl:pl-12">
      <div className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu">
        <ILocalHeart fill="#A73574" />
        <p className="text-sm font-medium font-roboto text-[#A73574]">16</p>
      </div>
      <div className="border-[1px] h-10 border-[#F1DEE4]"></div>
      <div className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu">
        <ILocalComment fill="#A73574" />
        <p className="text-sm font-medium font-roboto text-[#A73574]">6</p>
      </div>
      <div className="border-[1px] h-10 border-[#F1DEE4]"></div>

      <div className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu">
        <ILocalShared fill="#A73574" />
        <p className="text-sm font-medium font-roboto text-[#A73574]">Shared</p>
      </div>
    </div>
  );
};

export default FooterPost;
