import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/shared/SubmitButton";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  checkOtpApi,
  createNewPasswordApi,
  sentOtpApi,
} from "../../api/account";
const ForgetPassword = () => {
  const [toggleOtp, setToggleOtp] = useState(false);
  const [toggleCreateNewPass, setToggleCreateNewPass] = useState(false);
  const [nameButton, setNameButton] = useState("Send otp");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (value) => {
    if (toggleOtp == false) {
      sendOtp(value);
      setUserEmail((state) => (state = value?.email));
    } else if (toggleCreateNewPass == false) {
      checkOtp(value);
    } else {
      const newValue = { email: userEmail, newPassword: value?.newPassword };
      createNewPassword(newValue);
    }
  };
  //send Otp
  const { mutate: sendOtp, data: datasendOtp } = useMutation({
    mutationFn: sentOtpApi,
    onSuccess: (data) => {
      {
        if (data.result == true) {
          setToggleOtp((state) => (state = true));
          setNameButton((state) => (state = "Check otp"));
        } else {
          message.error("Email doesn't exist");
        }
      }
    },
    onError: () => {
      return false;
    },
  });
  //Check Otp
  const { mutate: checkOtp } = useMutation({
    mutationFn: checkOtpApi,
    onSuccess: (data) => {
      if (data.result == false) {
        message.error("wrong otp");
      } else {
        message.success("Check otp success");
        setToggleCreateNewPass((state) => (state = true));
        setNameButton((state) => (state = "Create new password"));
      }
    },
    onError: () => {
      message.error("Check otp fail");
    },
  });
  //Create newPassword
  const { mutate: createNewPassword } = useMutation({
    mutationFn: createNewPasswordApi,
    onSuccess: () => {
      message.success("Create success");
      navigate("/");
    },
    onError: () => {},
  });
  return (
    <div className=" absolute h-full w-full bg-white dark:bg-black flex justify-center items-center">
      <div className="flex flex-col gap-4 md:bg-primary md:p-8 md:rounded-2xl xl:bg-primary lg:bg-primary lg:w-[500px] lg:p-8 lg:rounded-2xl xl:w-[500px] xl:h-max xl:p-8 xl:rounded-2xl lg:dark:bg-white md:dark:bg-white">
        <div className="flex flex-col gap-6">
          <div className=" m-auto ">
            <p className=" text-2xl font-semibold dark:text-white lg:dark:text-black md:dark:text-black ">
              Forget Password
            </p>
          </div>
          <Form
            form={form}
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            {toggleCreateNewPass ? (
              <div className="">
                <Form.Item
                  hasFeedback
                  validateFirst
                  name="newPassword"
                  rules={[
                    {
                      min: 8,
                      message: "Password is at least 8 characters",
                    },
                    {
                      required: true,
                      message: "Please input your newPassword!",
                    },
                  ]}
                  className=" relative w-full"
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Input your new password"
                    className=" pt-2 pb-2 rounded-xl text-base"
                  />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  validateDebounce={1000}
                  name="confirmNewPass"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your newPassword!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                  className=" relative w-full dark:text-white"
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Confirm your new password"
                    className=" pt-2 pb-2 rounded-xl text-base"
                  />
                </Form.Item>
              </div>
            ) : toggleOtp ? (
              <Form.Item
                name="otp"
                className=" relative w-full"
                rules={[{ required: true, message: "Please input your otp" }]}
              >
                <Input
                  placeholder="Input your Otp"
                  className=" pt-2 pb-2 rounded-xl text-base"
                />
              </Form.Item>
            ) : (
              <Form.Item
                hasFeedback
                name="email"
                validateFirst
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    pattern: /^[^\s@]+@gmail\.com$/,
                    message: "Please enter a valid gmail address",
                  },
                ]}
                className=" relative w-full dark:text-white"
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="please input your email"
                  className=" pt-2 pb-2 rounded-xl text-base"
                />
              </Form.Item>
            )}
            <Form.Item className=" mb-2">
              <SubmitButton
                form={form}
                content={nameButton}
                className=" w-full h-max text-base font-semibold pt-2 pb-2 rounded-[30px] xl:bg-white md:bg-white lg:bg-white xl:text-black lg:hover:bg-secondary md:hover:bg-secondary lg:hover:!border-none md:hover:!border-none xl:hover:bg-secondary lg:hover:!text-neutral-800 md:hover:!text-neutral-800 xl:hover:!border-none xl:hover:!text-neutral-800 dark:text-black bg-primary text-black !border-none dark:bg-white lg:dark:bg-slate-500 lg:dark:text-white md:dark:bg-slate-500 md:dark:text-white"
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
