import AvtUser from "../shared/AvtUser";

const Expert = () => {
  return (
    <div className="flex flex-row gap-2 h-9">
      <AvtUser imageUrl="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
      <div className="flex flex-col w-auto">
        <p className="text-sm font-medium font-roboto">Bessie Cooper</p>
        <p className="text-xs font-normal font-roboto">124 posts</p>
      </div>
      <button className="w-[89px] h-10 px-4 gap-[7px] rounded-[36px] border-[1px] border-solid border-[#827379] hover:bg-menu transition-all">
        <p className="text-[#A73574] text-sm font-roboto font-medium ">
          Follow
        </p>
      </button>
    </div>
  );
};

export default Expert;
