import AvtUser from "../shared/AvtUser";

const Expert = () => {
  return (
    <div className="flex flex-row gap-2 h-9">
      <AvtUser imageUrl="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/366922307_3609541909290072_7640984435266893285_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=6SK1fpiJjh4AX8qQcIH&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfDzfXR2FgdcLWXTXiay6_EnXO-26AUG0-Rjin_lBxk2Gw&oe=651C4CA1" />
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
