import { useSearchParams } from "react-router-dom";
import TabPosts from "./TabPosts";
import { useState } from "react";
import TabAbout from "./TabAbout";
import PropTypes from "prop-types";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";

const TabProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { profileId } = useSearchParams();
  const accountProfile = useGetFetchQuery(["accountProfile", profileId]);
  return (
    <div className=" flex flex-col w-full">
      <div className="flex flex-row items-end self-stretch w-full">
        <div
          onClick={() => setActiveTab(0)}
          className=" flex xl:min-w-[160px] xl:h-12 flex-col items-center cursor-pointer hover:bg-tabProfile"
        >
          <div className=" flex flex-col justify-between items-center flex-[1_1_0]">
            <div className=" h-[3px] self-stretch rounded-tr-[3px] "></div>
            <div
              className={` flex justify-center items-center font-roboto text-base font-medium ${
                activeTab === 0
                  ? "text-button-submit-light"
                  : " text-light_surface_on_surface_variant"
              } `}
            >
              Posts
            </div>
            <div
              className={` h-[3px] self-stretch rounded-tr-[3px] rounded-tl-[3px] ${
                activeTab === 0 && "bg-button-submit-light"
              } `}
            ></div>
          </div>
          <div className=" h-[1px] w-full bg-[#F1DEE4]"></div>
        </div>
        <div
          onClick={() => setActiveTab(1)}
          className=" flex xl:min-w-[160px] xl:h-12 flex-col items-center cursor-pointer hover:bg-tabProfile"
        >
          <div className=" flex flex-col justify-between items-center flex-[1_1_0]">
            <div className=" h-[3px] self-stretch rounded-tr-[3px]"></div>
            <div
              className={` flex justify-center items-center font-roboto text-base font-medium  ${
                activeTab === 1
                  ? "text-button-submit-light"
                  : " text-light_surface_on_surface_variant"
              }`}
            >
              About
            </div>
            <div
              className={` h-[3px] self-stretch rounded-tr-[3px] rounded-tl-[3px] ${
                activeTab === 1 && "bg-button-submit-light"
              }`}
            ></div>
          </div>
          <div className=" h-[1px] w-full bg-[#F1DEE4]"></div>
        </div>
        <div className=" h-[1px] w-full bg-[#F1DEE4]"></div>
      </div>
      {activeTab === 0 ? <TabPosts /> : <TabAbout />}
    </div>
  );
};
TabProfile.propTypes = {
  data: PropTypes.object.isRequired,
};
export default TabProfile;
