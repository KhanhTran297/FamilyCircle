import { DatePicker, Form, Input, message } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import SubmitButton from "../../components/shared/SubmitButton";
const SignupPage = () => {
  const [form] = Form.useForm();
  const { authSignup } = useAccount();
  const onFinish = async (values) => {
    // console.log(
    //   "Success:",
    //   dayjs(values.userDayOfBirth["$d"]).format("DD-MM-YYYY HH:mm:ss")
    // );
    const formatUserDayOfBirth = dayjs(values.userDayOfBirth["$d"]).format(
      "DD/MM/YYYY HH:mm:ss"
    );
    // console.log(formatUserDayOfBirth);
    const data = {
      userAvatar:
        "https://i.pinimg.com/236x/19/b8/d6/19b8d6e9b13eef23ec9c746968bb88b1.jpg",
      ...values,
    };
    data.userDayOfBirth = formatUserDayOfBirth;
    if (handleCheckValidBirth(values.userDayOfBirth["$y"])) {
      authSignup(data);
    } else {
      message.error("invalid year");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleCheckValidBirth = (year) => {
    const now = dayjs()["$y"];
    if (now >= year) {
      return true;
    }
    return false;
  };
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  return (
    <div className="absolute flex items-center justify-center w-full h-full bg-white  dark:bg-black">
      <div className="flex flex-col gap-4 xl:bg-slate-300 xl:w-[50%] xl:h-max xl:p-8 xl:rounded-2xl xl:dark:bg-white">
        <div className="flex flex-col gap-6">
          <div className="m-auto ">
            <p className="text-2xl font-semibold  dark:text-white xl:dark:text-black">
              Sign up
            </p>
          </div>
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
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="relative "
          >
            <Form.Item
              hasFeedback
              name="userFullName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              className="relative w-full "
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Input your username"
                className="pt-2 pb-2 text-base  rounded-xl"
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="userEmail"
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
              className="relative w-full "
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Input your email"
                className="pt-2 pb-2 text-base  rounded-xl"
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="userPhone"
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
              className="relative w-full "
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Input your phonenumber"
                className="pt-2 pb-2 text-base  rounded-xl"
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="userDayOfBirth"
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
              className="relative w-full "
            >
              <DatePicker
                prefix={<CalendarOutlined className="site-form-item-icon" />}
                className="w-full pt-2 pb-2 text-base  rounded-xl"
                placeholder="Select date of birth"
                format={dateFormatList}
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="userPassword"
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
                className="pt-2 pb-2 text-base  rounded-xl"
              />
            </Form.Item>

            <Form.Item className="mb-2 ">
              <SubmitButton
                form={form}
                content="Sign up"
                className="w-full text-[20px] pt-2 pb-10 rounded-[30px] xl:bg-white xl:text-black dark:text-black bg-slate-500 text-white dark:bg-white xl:dark:bg-slate-500 xl:dark:text-white"
              />
            </Form.Item>
          </Form>
        </div>
        <div className="">
          <p className=" xl:dark:text-black dark:text-white">
            Already have an account ?{" "}
            <Link to="/" className="text-blue-500 ">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
