// import useTheme from "../../hooks/useTheme";
import AvtUser from "../shared/AvtUser";
import { ILocalViewMore } from "../svg/viewmore";
import ContentPost from "./ContentPost";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
// import { ILocalDot } from "../svg/Dot";
// import { ILocalMore } from "../svg/more";

const Post = () => {
  // const { theme } = useTheme({});
  // const textColor = theme === "dark" ? "#CEC4C6" : "#1F1A1C";
  const sampleContent =
    "Trầm cảm sau sinh, hay còn được gọi là trầm cảm sau sinh, là một tình trạng tâm lý mà các bà mẹ có thể trải qua sau khi sinh con. Nó thường xuất hiện trong vòng một đến hai tuần sau khi sinh và có thể kéo dài trong vài tháng aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  return (
    <div className="flex flex-col items-start xl:gap-0 gap-6 p-6 pt-3 rounded-[24px] w-full  bg-[#FFF8F8] -z-10">
      <div className="flex flex-row items-start self-stretch gap-2">
        <div className="w-10 h-10">
          <AvtUser imageUrl="https://icdn.dantri.com.vn/thumb_w/640/2019/01/20/2-1547917870331.jpg" />
        </div>
        <HeaderPost />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col max-h-[360px] w-full  overflow-hidden relative xl:pl-12 ">
          <ContentPost content={sampleContent} />
          <div className="w-full h-[72px] absolute bottom-0 bg-post "></div>
        </div>
        <div className="flex flex-col items-center justify-center self-stretch gap-[10px]">
          <button className="flex h-10 gap-[7px] bg-[#A73574] rounded-[36px] px-4 flex-row items-center">
            <ILocalViewMore fill="#FFF8F8" />
            <p className="font-roboto text-[#FFF] text-sm font-medium">
              View more
            </p>
          </button>
        </div>
        <FooterPost />
      </div>
    </div>
  );
};

export default Post;
