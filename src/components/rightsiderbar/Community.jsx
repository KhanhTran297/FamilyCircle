import { useQuery } from "@tanstack/react-query";
import { ListUserCommunityApi } from "../../api/community";
import MyCommunityItem from "../shared/MyCommunityItem";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useCommunityMutate from "../../hooks/useMutate/useCommunityMutate";
const Community = (props) => {
  const accountProfile = JSON.parse(localStorage.getItem("user"));
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

  const { data: listCommunity } = useQuery({
    queryKey: ["ListUserCommunity", accountProfile[0].accountId],
    queryFn: () =>
      ListUserCommunityApi({ accountId: accountProfile[0].accountId }),
  });
  return (
    <div className=" desktop:bg-[#FFF8F8] desktop:flex desktop:flex-col desktop:w-[300px] pt-3 pb-3 pl-6 pr-6 rounded-3xl hidden ">
      <div className=" pb-2 border-b-black border-b-solid border-b-[1px]">
        <p className=" font-roboto text-base font-semibold text-[#A73574]">
          My Community
        </p>
      </div>
      <div className=" flex flex-col gap-2 mt-2">
        {listCommunity?.data?.totalElements === 0 ? (
          <div className=" flex items-center justify-end h-[150px] w-full">
            <p className=" text-center w-full font-roboto text-sm font-normal">
              Not yet
            </p>
          </div>
        ) : (
          listCommunity?.data?.content?.map((item, index) => (
            <MyCommunityItem key={index} item={item} showModal={showModal} />
          ))
        )}

        <div className=" flex flex-row gap-2 items-center ">
          <p
            className=" font-roboto text-sm opacity-40 cursor-pointer hover:opacity-100"
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
