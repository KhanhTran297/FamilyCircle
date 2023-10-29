import { Form, Modal, Table } from "antd";
import { useState } from "react";

const ReportPostContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "objectId",
      key: "objectId",
      align: "center",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      align: "center",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
  ];
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "white",
      }}
      className=" flex flex-col"
    >
      <div className=" border-b-black border-b-[1px] border-b-solid">
        <Form>
          <Form.Item label="Title"></Form.Item>
        </Form>
      </div>
      <div className="">
        <Table />
      </div>
      <Modal
        title="post detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
        style={{
          overflowY: "scroll",
          maxHeight: "80vh",
          height: "max-content",
        }}
      >
        <div className=" "></div>
      </Modal>
    </div>
  );
};

export default ReportPostContent;
