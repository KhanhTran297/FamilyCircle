import { useState } from "react";
import Post from "../post/Post";

const Tab = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col backdrop-blur-[32px] sticky top-14 xl:top-0">
        <div className="flex items-start self-stretch px-6 py-2 ">
          <p className="font-medium text-title font-roboto">Home</p>
        </div>
        <div className="flex flex-row items-center w-full h-12 border-b-[1px]  ">
          <div
            className="w-[50%] h-12 justify-center cursor-pointer flex hover:bg-tab hover:bg-opacity-[8%]"
            onClick={() => handleTabClick("tab1")}
          >
            <button className="w-[54px] h-12 justify-between flex-col flex">
              <div className="h-[3px]  w-full rounded-t-[3px] justify-items-end"></div>

              <div className="text-base font-medium h-6 w-full text-[#A73574]  items-center justify-center font-roboto">
                For you
              </div>
              <div
                className={`${
                  activeTab === "tab1" ? "bg-[#A73574]" : ""
                } h-[3px]   w-full rounded-t-[3px] justify-items-end`}
              ></div>
            </button>
          </div>
          <div
            className="w-[50%] h-12 justify-center flex hover:bg-tab hover:bg-opacity-[8%] cursor-pointer"
            onClick={() => handleTabClick("tab2")}
          >
            <button className="w-[54px] h-12 justify-between flex-col flex">
              <div className="h-[3px]  w-full rounded-t-[3px] justify-items-end"></div>

              <div className="text-base font-medium h-6 w-full text-[#A73574]  items-center justify-center font-roboto">
                Following
              </div>
              <div
                className={`${
                  activeTab === "tab2" ? "bg-[#A73574]" : ""
                } h-[3px]   w-full rounded-t-[3px] justify-items-end`}
              ></div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 overflow-y-auto xl:mt-6 mt-[72px] max-h-100vh">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Tab;
