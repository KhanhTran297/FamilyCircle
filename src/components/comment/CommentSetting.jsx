import { Dropdown, Modal } from "antd";
import { ILocalThreePoint } from "../svg/three_point";
import { useState } from "react";
import useComment from "../../hooks/useComment";
import PropTypes from "prop-types";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const CommentSetting = (props) => {
  const { commentId } = props;
  const { deleteComment } = useComment(commentId, false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      label: <p className="">edit</p>,
      key: "0",
      icon: <EditOutlined />,
    },
    {
      label: <p onClick={() => showModal()}>delete</p>,
      key: "1",
      icon: <DeleteOutlined />,
    },
  ];

  return (
    <div className="">
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        className=" h-[45px]"
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
  commentId: PropTypes.number.isRequired,
};
export default CommentSetting;
