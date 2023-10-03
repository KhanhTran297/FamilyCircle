import { useState } from "react";
import { Button, Form, Modal, DatePicker, Input } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import SubmitButton from "../../components/shared/SubmitButton";
const hospital = [
  {
    value: "Chợ rẫy hospital",
    label: "Chợ rẫy hospital",
  },
  {
    value: "Thống Nhất hospital",
    label: "Thống Nhất hospital",
  },
  {
    value: "3",
    label: "Communicated",
  },
  {
    value: "4",
    label: "Identified",
  },
  {
    value: "5",
    label: "Resolved",
  },
  {
    value: "6",
    label: "Cancelled",
  },
];
const ExpertsContent = (props) => {
  const { bg } = props;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
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
  const [form] = Form.useForm();
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
          title="Create expert account"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            layout="vertical"
            name="basic"
            labelCol={{
              span: 4,
            }}
            // wrapperCol={{
            //   span: 16,
            // }}
            // style={{
            //   maxWidth: 600,
            // }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            className=" relative"
          >
            <Form.Item
              hasFeedback
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              className=" relative w-full"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Input your username"
                className=" pt-2 pb-2 rounded-xl text-base "
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              className=" relative w-full"
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Input your email"
                className=" pt-2 pb-2 rounded-xl text-base "
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="phone"
              validateDebounce={1000}
              rules={[
                {
                  min: 10,
                  message: "Phone must be 10 number",
                },
                {
                  pattern: /^[0-9]*$/, // Regular expression to allow only numeric input
                  message: "Please enter a valid phone number!",
                },
                {
                  required: true,
                  message: "Please input your phonenumber!",
                },
              ]}
              className=" relative w-full"
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Input your phonenumber"
                className=" pt-2 pb-2 rounded-xl text-base "
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                  message: "Please input your date of birth!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const selectedDate = dayjs(value);
                    const currentDate = dayjs();

                    if (selectedDate.isBefore(currentDate)) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "Please select a valid date of birth!"
                    );
                  },
                }),
              ]}
              className=" relative w-full"
            >
              <DatePicker
                prefix={<CalendarOutlined className="site-form-item-icon" />}
                className=" w-full pt-2 pb-2 rounded-xl text-base"
                placeholder="Select date of birth"
                format={dateFormatList}
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="password"
              validateFirst
              rules={[
                {
                  min: 8,
                  message: "Password is at least 8 characters",
                },
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Input your password"
                className=" pt-2 pb-2 rounded-xl text-base"
              />
            </Form.Item>

            <Form.Item className=" mb-2">
              <SubmitButton
                form={form}
                content="Sign up"
                className="w-full h-max text-base font-semibold pt-2 pb-2 rounded-[30px] xl:bg-white md:bg-white lg:bg-white xl:text-black lg:hover:bg-secondary md:hover:bg-secondary lg:hover:!border-none md:hover:!border-none xl:hover:bg-secondary lg:hover:!text-neutral-800 md:hover:!text-neutral-800 xl:hover:!border-none xl:hover:!text-neutral-800 dark:text-black bg-primary text-black !border-none dark:bg-white lg:dark:bg-slate-500 lg:dark:text-white md:dark:bg-slate-500 md:dark:text-white"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="">Body</div>
    </div>
  );
};

export default ExpertsContent;
