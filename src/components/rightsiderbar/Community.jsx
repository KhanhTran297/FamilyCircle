import { useQuery } from "@tanstack/react-query";
import { ListUserCommunityApi } from "../../api/community";
import MyCommunityItem from "../shared/MyCommunityItem";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import useCommunityMutate from "../../hooks/useMutate/useCommunityMutate";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
const Community = (props) => {
  const accountId = useGetFetchQuery(["accountProfile"]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [communityId, setCommunityId] = useState("");
  const { unFollowCommunity } = useCommunityMutate();
  const showModal = (id) => {
    setCommunityId(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    unFollowCommunity({ communityId: communityId }).then(() =>
      setIsModalOpen(false)
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data: listCommunity, isLoading } = useQuery({
    queryKey: ["ListUserCommunity", accountId?.data?.id],
    queryFn: () => ListUserCommunityApi({ accountId: accountId?.data?.id }),
    retry: 0,
  });

  return (
    <div className=" desktop:bg-[#FFF8F8] desktop:flex desktop:flex-col desktop:w-[300px] pt-3 pb-3 pl-6 pr-6 rounded-3xl hidden ">
      <div className=" pb-2 border-b-black border-b-solid border-b-[1px]">
        <p className=" font-roboto text-base font-semibold text-[#A73574]">
          My Community
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-2 ">
        {isLoading ? (
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
              />
            }
          />
        ) : listCommunity?.data?.totalElements === 0 ? (
          <div className=" flex items-center justify-end h-[150px] w-full">
            <p className="w-full text-sm font-normal text-center font-roboto">
              Not yet
            </p>
          </div>
        ) : (
          listCommunity?.data?.content?.map((item, index) => (
            <MyCommunityItem key={index} item={item} showModal={showModal} />
          ))
        )}

        <div className="flex flex-row items-center gap-2 ">
          <p
            className="text-sm cursor-pointer font-roboto opacity-40 hover:opacity-100"
            onClick={() => navigate("/community")}
          >
            Find more
          </p>
          <div className="">
            <SearchOutlined style={{ fontSize: "14px", opacity: "0.4" }} />
          </div>
        </div>
      </div>
      <Modal
        title="Confirm"
        open={isModalOpen}
        onOk={handleOk}
        okText="Yes"
        okType="danger"
        cancelText="No"
        onCancel={handleCancel}
      >
        <p>Are you sure to unfollow </p>
      </Modal>
    </div>
  );
};

Community.propTypes = {};

export default Community;
