import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import SubmitButton from "../shared/SubmitButton";
const HospitalContent = (props) => {
  const { bg } = props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
  };
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: bg,
      }}
      className=" flex flex-col"
    >
      <div className="">
        <Button onClick={showModal}>Create</Button>
        <Modal
          title="Create Hospital"
          open={open}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              className=" flex flex-col "
            >
              <Button type="default" htmlType="submit">
                Create
              </Button>
              <Button
                type="default"
                className=" ml-2 bg-red-500 text-white hover:!border-none hover:!text-white"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="">
        <Form></Form>
      </div>
    </div>
  );
};

export default HospitalContent;
