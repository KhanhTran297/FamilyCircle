import AvtUser from "../shared/AvtUser";

const Expert = () => {
  return (
    <div className="flex flex-row items-center self-stretch w-full gap-2 h-9">
      <div>
        <AvtUser imageUrl="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
      </div>
      <div className="flex flex-col w-full min-w-[91px] ">
        <p className="text-sm font-medium font-roboto">Bessie Cooper</p>
        <p className="text-xs font-normal font-roboto">124 posts</p>
      </div>
      <button className="w-auto h-10 items-end px-4 gap-[7px] rounded-[36px] border-[1px] border-solid border-[#827379] hover:bg-menu transition-all">
        <p className="text-[#A73574] text-sm font-roboto font-medium ">
          Follow
        </p>
      </button>
    </div>
  );
};

export default Expert;
