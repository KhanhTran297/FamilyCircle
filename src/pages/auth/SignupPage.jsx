import { DatePicker, Form, Input, message } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import SubmitButton from "../../components/shared/SubmitButton";
import { ILocalLogo } from "../../components/svg/svg";
import { ILocalArrowLeft } from "../../components/svg/arrow_left";
import { ILocalProfile } from "../../components/svg/profile";
import { ILocalMail } from "../../components/svg/mail";
import { ILocalPhone } from "../../components/svg/phone";
import { ILocalCalender } from "../../components/svg/calender";
import { ILocalKey } from "../../components/svg/key";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { authSignup } = useAccount();
  const onFinish = async (values) => {
    const formatUserDayOfBirth = dayjs(values.dateOfBirth["$d"]).format(
      "DD/MM/YYYY HH:mm:ss"
    );
    const data = {
      avatarPath:
        "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg",
      bio: "",
      fullname: values.fullName,
      phone: values.phone,
      email: values.email,
      password: values.password,
    };
    data.dateOfBirth = formatUserDayOfBirth;
    if (handleCheckValidBirth(values.dateOfBirth["$y"])) {
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
  const handleBack = () => {
    navigate("/");
  };
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  return (
    <div className="absolute flex bg-authen-page pt-16 justify-center w-full h-full bg-white  dark:bg-black">
      <div className="flex flex-col gap-6 xl:w-[640px] rounded-3xl bg-white shadow-formAuthen md:p-8  lg:w-[500px] lg:p-8  xl:h-max xl:p-8  lg:dark:bg-white md:dark:bg-white">
        <div className="flex flex-col gap-6">
          <div className="justify-center flex flex-col gap-6 items-center">
            <ILocalLogo className="w-[74px] h-[64px]" />

            <div className=" text-2xl relative flex justify-center items-center w-full  dark:text-white lg:dark:text-black md:dark:text-black font-roboto xl:text-[32px] xl:leading-10 xl:font-normal">
              <ILocalArrowLeft
                fill="#1F1F1F"
                className=" absolute left-0 w-6 h-6 cursor-pointer"
                eventClick={handleBack}
              />
              Create an account
            </div>
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
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              className="relative w-full "
            >
              <Input
                prefix={<ILocalProfile className=" mr-3" fill="#504348" />}
                placeholder="Username"
                className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                size="large"
              />
            </Form.Item>
            <Form.Item className=" relative mb-0">
              <div className=" flex flex-row gap-3 ">
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
                  rootClassName="w-full"
                >
                  <DatePicker
                    prefix={<ILocalCalender className="mr-3" />}
                    suffixIcon={<ILocalCalender className="mr-3" />}
                    className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3 w-full  rounded-[12px] border-solid border-[1px] border-[#504348] "
                    size="large"
                    placeholder="Date of birth"
                    format={dateFormatList}
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
                  className="w-full"
                >
                  <Input
                    prefix={<ILocalPhone className="mr-3" />}
                    placeholder="Phone number"
                    className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                    size="large"
                  />
                </Form.Item>
              </div>
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
              className="relative w-full "
            >
              <Input
                prefix={<ILocalMail className="mr-3" />}
                placeholder="Email"
                className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                size="large"
              />
            </Form.Item>

            {/* <Form.Item
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
              className="relative w-full "
            >
              <DatePicker
                prefix={<CalendarOutlined className="site-form-item-icon" />}
                className="w-full pt-2 pb-2 text-base rounded-xl"
                placeholder="Select date of birth"
                format={dateFormatList}
              />
            </Form.Item> */}
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
                prefix={<ILocalKey className="mr-3" />}
                placeholder="Password"
                className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                size="large"
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="confirm password"
              dependencies={["password"]} // This makes the validation depend on the 'password' field
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("The two passwords do not match");
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<ILocalKey className="mr-3" />}
                placeholder="Confirm password"
                className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                size="large"
              />
            </Form.Item>
            <Form.Item className="mb-2 ">
              <SubmitButton
                form={form}
                content="Submit"
                className=" w-full xl:h-[40px] xl:pr-4 xl:pl-4 xl:rounded-[36px] bg-button-submit-light text-white font-roboto text-[14px] leading-5 font-medium hover:!border-none hover:!text-white"
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
