import { ILocalComment } from "../svg/comment";
import { ILocalHeartComment } from "../svg/hear_comment";
import { ILocalReply } from "../svg/reply";
import IconFooter from "./IconFooter";

const CommentFooter = () => {
  const handleClick = () => {
    console.log("reply");
  };
  return (
    <div className=" xl:flex xl:flex-row xl:gap-4 mt-1">
      <IconFooter count={1} check={true}>
        <ILocalHeartComment fill="#A73574" className="p-[10px]" />
      </IconFooter>
      <IconFooter count={0} check={true}>
        <ILocalComment
          fill="#A73574"
          width={24}
          height={24}
          className="p-[10px]"
        />
      </IconFooter>
      <IconFooter check={false} handleClick={handleClick}>
        <ILocalReply fill="#1F1A1C" className="p-[10px]" />
      </IconFooter>
    </div>
  );
};

export default CommentFooter;
