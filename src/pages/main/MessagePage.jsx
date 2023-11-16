import Left from "../../components/message/Left";
import Right from "../../components/message/Right";

const MessagePage = () => {
  return (
    <div className="w-full xl:w-[760px] flex flex-row h-full">
      <Left />
      <Right />
    </div>
  );
};

export default MessagePage;
