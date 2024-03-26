import { Carousel } from "antd";
import CarouselItem from "../../components/shared/CarouselItem";
import CommunityItem from "../../components/shared/CommunityItem";
import { useQuery } from "@tanstack/react-query";
import { getListCategoryApi } from "../../api/category";
import { ListUserCommunityApi } from "../../api/community";
import { useEffect, useState } from "react";

const CommunicationPage = (props) => {
  const [finalCommunity, setFinalCommunity] = useState([]);
  const { data: listCommunity } = useQuery({
    queryKey: ["getListCommunity"],
    queryFn: () =>
      getListCategoryApi({ kind: 5 }).then((res) => {
        return res.data.content;
      }),
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: myCommunity } = useQuery({
    queryKey: ["ListUserCommunity", user[0].accountId],
    queryFn: () =>
      ListUserCommunityApi({ accountId: user[0].accountId }).then((res) =>
        res.data.content.map((item) => {
          return item["community"];
        })
      ),
    enabled: !!user[0].accountId,
  });
  useEffect(() => {
    const handleCombinedCommunity = async () => {
      const combinedCommunity = await Promise.all(
        listCommunity?.map(async (community) => {
          const joined = myCommunity?.find((item) => item.id === community.id);
          return { ...community, joined: joined ? true : false };
        })
      );

      setFinalCommunity(combinedCommunity);
    };

    handleCombinedCommunity();
  }, [listCommunity, myCommunity]);
  return (
    <div className=" xl:mt-0  w-full flex flex-col gap-3 h-screen border-l-[1px] border-l-solid border-l-[#F1DEE4] xl:pl-4 xl:pt-4 xl:pr-4 overflow-y-scroll ">
      <div className="">
        <p className="font-medium text-title font-roboto">Communication</p>
      </div>
      <Carousel
        fade
        className=" xl:h-[250px] communityPage  xl:rounded-2xl xl:shadow-xl border-b border-b-solid border-b-[#ccc] xl:border-none xl:bg-[#FFD8E8] "
        autoplay
      >
        {/* {listCommunity !== undefined &&
          listCommunity.map((item, index) => (
            <CarouselItem key={index} item={item} />
          ))} */}
        {finalCommunity.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </Carousel>
      <div className="flex flex-col flex-wrap items-center justify-center max-w-full gap-12 mt-6 xl:flex-row">
        {/* {listCommunity !== undefined &&
          listCommunity.map((item, index) => (
            <CommunityItem key={index} item={item} />
          ))} */}
        {finalCommunity.map((item, index) => (
          <CommunityItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

CommunicationPage.propTypes = {};

export default CommunicationPage;
