import { Dropdown, Modal } from "antd";
import { ILocalThreePoint } from "../svg/three_point";
import { useState } from "react";
import useComment from "../../hooks/useComment";
import PropTypes from "prop-types";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ILocalReport } from "../svg/report";
import { useSelector } from "react-redux";
import { ILocalEdit } from "../svg/edit";
import { ILocalDelete } from "../svg/delete";
import ReportModal from "../modal/ReportModal";
import { data } from "autoprefixer";

const CommentSetting = (props) => {
  const { commentId, eventEditing } = props;
  const { deleteComment } = useComment(commentId, false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReportPost, setShowReportPost] = useState(false);
  const select = useSelector((state) => state.account);
  const selectExpert = useSelector((state) => state.expert);
  const user = select.account;
  const expert = selectExpert.expert;
  const checkAuthen = () => {
    if (user) {
      if (user.id !== props.data.owner.id) {
        return false;
      } else {
        return true;
      }
    } else {
      if (expert.id !== props.data.owner.id) {
        return false;
      } else {
        return true;
      }
    }
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
      icon: <ILocalEdit fill="#1F1A1C" />,
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
      icon: <ILocalDelete fill="#1F1A1C" />,
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
