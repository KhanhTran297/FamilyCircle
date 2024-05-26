import Bookmark from "../../components/bookmark/Bookmark";

const BookmarkPage = () => {
  return (
    <div className="w-full xl:w-[760px]">
      <div className="flex mt-4 border-b-[#ccc] border-b ">
        <p className="text-3xl font-medium font-roboto">Bookmark</p>
      </div>
      <Bookmark />
    </div>
  );
};

export default BookmarkPage;
