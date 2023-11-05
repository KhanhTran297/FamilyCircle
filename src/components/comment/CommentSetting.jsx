import { Dropdown, Modal } from "antd";
import { ILocalThreePoint } from "../svg/three_point";
import { useState } from "react";
import PropTypes from "prop-types";
import { ILocalReport } from "../svg/report";
import { ILocalEdit } from "../svg/edit";
import { ILocalDelete } from "../svg/delete";
import ReportModal from "../modal/ReportModal";
import { useQueryClient } from "@tanstack/react-query";
import useCommentMutate from "../../hooks/useMutate/useCommentMutate";

const CommentSetting = (props) => {
  const { commentId, eventEditing, parentId } = props;
  const { deleteComment } = useCommentMutate(commentId, parentId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReportPost, setShowReportPost] = useState(false);
  const queryClient = useQueryClient();
  const accountProfile = queryClient.getQueryData(["accountProfile"]);
  const checkAuthen = () => {
    if (accountProfile?.data?.id === props.data.owner.id) {
      return true;
    }
    return false;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    deleteComment();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items = [
    {
      label: (
        <p
          onClick={() => eventEditing()}
          className=" font-roboto text-[14px] font-medium leading-5 text-[#1F1A1C]"
        >
          Edit
        </p>
      ),
      key: "0",
      icon: <ILocalEdit fill="#1F1A1C" className=" w-6 h-6" />,
    },
    {
      label: (
        <p
          onClick={() => showModal()}
          className="font-roboto text-[14px] font-medium leading-5 text-[#1F1A1C]"
        >
          Delete
        </p>
      ),
      key: "1",
      icon: <ILocalDelete fill="#1F1A1C" className="w-6 h-6" />,
    },
  ];
  const otherItems = [
    {
      label: (
        <p
          className="font-roboto text-[14px] font-medium leading-5 text-[#1F1A1C]"
          onClick={() => setShowReportPost(true)}
        >
          Report
        </p>
      ),
      key: "0",
      icon: <ILocalReport />,
    },
  ];
  return (
    <div className="relative">
      <ReportModal
        open={showReportPost}
        handleClose={() => setShowReportPost(false)}
        id={commentId}
        kind={2}
      />
      <Dropdown
        menu={{
          items: checkAuthen() ? items : otherItems,
        }}
        trigger={["click"]}
        className=" h-[45px] "
        placement="bottomRight"
        overlayClassName={
          checkAuthen() ? "commentSetting" : "commentSettingOther"
        }
      >
        <div className="" onClick={(e) => e.preventDefault()}>
          <ILocalThreePoint
            fill="#1F1A1C"
            className=" p-[10px] rounded-[20px] hover:bg-tab hover:bg-opacity-[8%] cursor-pointer"
          />
        </div>
      </Dropdown>
      <Modal
        title="Delete comment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okType="danger"
        okText="Confirm"
      >
        <p>Do you want to delete comment</p>
      </Modal>
    </div>
  );
};
CommentSetting.propTypes = {
  data: PropTypes.object.isRequired,
  commentId: PropTypes.number.isRequired,
  eventEditing: PropTypes.func,
};
export default CommentSetting;
