import { ILocalSearch } from "../svg/search";
import { useState } from "react";

const Search = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicked(isClicked);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button
      className={`desktop:rounded-[100px] rounded-[20px] desktop:w-full w-10 h-10 items-center justify-center desktop:justify-normal p-[10px] desktop:p-0 gap-[10px] shrink-0 desktop:self-stretch desktop:pl-3 desktop:py-[7px] desktop:pr-1 cursor-pointer desktop:flex  fixed top-2 right-0 mr-6 desktop:relative   ${
        isHovered && !isClicked ? "bg-[#E8E8E8]" : "bg-[#F6F6F6]"
      } ${isClicked ? "shadow-search bg-[#FFF]" : "bg-[F6F6F6]"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${
          isClicked ? "bg-[#FFF]" : "bg-[F6F6F6]"
        } desktop:flex desktop:flex-row desktop:gap-[10px] w-6 h-6 shrink-0 ${
          isHovered && !isClicked ? "bg-[#E8E8E8]" : "bg-[#F6F6F6]"
        }`}
      >
        <ILocalSearch fill="#1F1A1C" />
        <input
          type="text"
          placeholder="Search"
          className={`${
            isClicked ? " bg-[#FFF]" : "bg-[F6F6F6]"
          } font-roboto text-sm font-normal flex-1  h-5 cursor-pointer desktop:flex hidden ${
            isHovered && !isClicked ? "bg-[#E8E8E8]" : "bg-[#F6F6F6]"
          }`}
          style={{ outline: "none" }}
          onClick={handleClick}
        />
      </div>
    </button>
  );
};

export default Search;
