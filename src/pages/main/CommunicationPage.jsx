import { Carousel } from "antd";
import CarouselItem from "../../components/shared/CarouselItem";
import CommunityItem from "../../components/shared/CommunityItem";
import { useQuery } from "@tanstack/react-query";
import { getListCategoryApi } from "../../api/category";
import { ListUserCommunityApi } from "../../api/community";
import { useEffect, useState } from "react";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";

const CommunicationPage = (props) => {
  const [finalCommunity, setFinalCommunity] = useState([]);
  const { data: listCommunity } = useQuery({
    queryKey: ["getListCommunity"],
    queryFn: () =>
      getListCategoryApi({ kind: 5 }).then((res) => {
        return res?.data?.content;
      }),
  });
  const accountId = useGetFetchQuery(["accountProfile"]);

  const { data: myCommunity, refetch: fetchmyCommunity } = useQuery({
    queryKey: ["ListUserCommunity", accountId?.data?.id],
    queryFn: () =>
      ListUserCommunityApi({ accountId: accountId?.data?.id }).then((res) => {
        if (res?.data?.totalElements > 0) {
          const newData = res?.data?.content?.map((item) => {
            return item["community"];
          });
          return newData;
        }
        return [];
      }),
    enabled: !!accountId?.data?.id,
  });
  const currentPromise = new Promise((resolve, reject) => {
    fetchmyCommunity().then((res) => {
      resolve(res);
    });
  });

  useEffect(() => {
    currentPromise.then((res) => {
      const combinedCommunity = listCommunity?.map((community) => {
        const joined = res?.data?.find((item) => {
          return item?.id === community?.id;
        });
        return { ...community, joined: joined ? true : false };
      });
      setFinalCommunity(combinedCommunity);
    });
  }, [listCommunity, myCommunity]);
  return (
    <div className=" xl:mt-0  w-full flex flex-col gap-3 h-screen border-l-[1px] border-l-solid border-l-[#F1DEE4] xl:pl-4 xl:pt-4 xl:pr-4 overflow-y-scroll ">
      <div className="">
        <p className="font-medium text-title font-roboto">Community</p>
      </div>
      <Carousel
        fade
        className=" xl:h-[250px] communityPage  xl:rounded-2xl xl:shadow-xl border-b border-b-solid border-b-[#ccc] xl:border-none xl:bg-[#FFD8E8]  "
        autoplay
      >
        {/* {listCommunity !== undefined &&
          listCommunity.map((item, index) => (
            <CarouselItem key={index} item={item} />
          ))} */}
        {finalCommunity?.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </Carousel>
      <div className="flex flex-col flex-wrap items-center justify-center max-w-full gap-12 mt-6 xl:flex-row">
        {/* {listCommunity !== undefined &&
          listCommunity.map((item, index) => (
            <CommunityItem key={index} item={item} />
          ))} */}
        {finalCommunity?.map((item, index) => (
          <CommunityItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

CommunicationPage.propTypes = {};

export default CommunicationPage;
