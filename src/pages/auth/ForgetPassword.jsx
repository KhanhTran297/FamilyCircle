import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/shared/SubmitButton";
import { useState } from "react";
import { ILocalLogo } from "../../components/svg/svg";
import { ILocalArrowLeft } from "../../components/svg/arrow_left";
import { ILocalMail } from "../../components/svg/mail";
import useAccountMutate from "../../hooks/useMutate/useAccountMutate";
const ForgetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {
    sendOtp,
    checkOtp,
    createNewPassword,
    loadingCheckOtp,
    loadingCreateNewPassword,
    loadingSentOtp,
    successCreateNewPassword,
  } = useAccountMutate();
  const [isCheckOtp, setIsCheckOtp] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [email, setEmail] = useState("");
  const onFinish = (values) => {
    if (isCheckOtp) {
      if (isChangePassword) {
        const newValues = {
          email: email,
          newPassword: values.newPassword,
        };
        createNewPassword(newValues);
      } else {
        const newValues = {
          otp: values.otp,
          email: email,
        };
        checkOtp(newValues).then((data) => {
          if (data.code == "ERROR-ACCOUNT-006") {
            message.error("incorrect code");
          } else {
            setIsChangePassword(true);
          }
          // setIsChangePassword(true);
        });
      }
    } else {
      sendOtp(values).then(() => {
        setIsCheckOtp(true);
        setEmail(values.email);
      });
    }
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div className=" absolute h-full w-full bg-authen-page dark:bg-black flex justify-center pt-16">
      <div className="flex flex-col shadow-formAuthen justify-evenly gap-6 md:bg-primary md:p-8 md:rounded-2xl xl:bg-white  lg:bg-white lg:w-[500px] lg:p-8 lg:rounded-2xl xl:w-[640px] xl:h-max xl:p-6 xl:gap-6 xl:rounded-2xl lg:dark:bg-white md:dark:bg-white">
        <div className="flex flex-col gap-6">
          <div className=" justify-center flex flex-col gap-6 items-center ">
            <ILocalLogo className="w-[74px] h-[64px]" />
            <div className=" flex items-center gap-4 self-stretch relative justify-center">
              <ILocalArrowLeft
                className=" absolute left-0 flex w-10 h-10 p-[10px] flex-col justify-center items-center gap-[10px] cursor-pointer"
                fill="#1F1F1F"
                eventClick={() => history.back()}
              />
              {isCheckOtp ? (
                isChangePassword ? (
                  successCreateNewPassword ? (
                    <p className="  dark:text-white lg:dark:text-black md:dark:text-black font-roboto xl:text-[32px] xl:leading-10 xl:font-normal">
                      Update password successfully
                    </p>
                  ) : (
                    <p className="  dark:text-white lg:dark:text-black md:dark:text-black font-roboto xl:text-[32px] xl:leading-10 xl:font-normal">
                      Reset new password
                    </p>
                  )
                ) : (
                  <p className="  dark:text-white lg:dark:text-black md:dark:text-black font-roboto xl:text-[32px] xl:leading-10 xl:font-normal">
                    We sent you a code
                  </p>
                )
              ) : (
                <p className="  dark:text-white lg:dark:text-black md:dark:text-black font-roboto xl:text-[32px] xl:leading-10 xl:font-normal">
                  Find your account
                </p>
              )}
            </div>
          </div>
          <div className=" self-stretch text-center font-roboto text-base font-normal text-[#1F1A1C]">
            {isCheckOtp
              ? isChangePassword
                ? "Enter a new password"
                : `We have sent you a verification code to “${email}”. Please enter the verification code to change password.`
              : " Enter the email that used to create your account. We will send you a verification code to trigger changing password process."}
          </div>
          {successCreateNewPassword ? (
            <div className=" flex gap-6 flex-col">
              <div className=" self-stretch text-center font-roboto text-base font-normal text-[#1F1A1C]">
                Your password has been updated. Please retry log in to your
                account
              </div>
              <Button
                onClick={() => navigate("/")}
                className=" w-full xl:h-[40px] xl:pr-4 xl:pl-4 xl:rounded-[36px] bg-button-submit-light text-white font-roboto text-[14px] leading-5 font-medium hover:!border-none hover:!text-white"
              >
                Go to log-in
              </Button>
            </div>
          ) : (
            <Form
              form={form}
              name="basic"
              layout="vertical"
              // labelCol={{
              //   span: 8,
              // }}
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
              // autoComplete="off"
              className=" relative "
            >
              {isCheckOtp ? (
                isChangePassword ? (
                  <div className="">
                    <Form.Item
                      hasFeedback
                      name="newPassword"
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
                        placeholder="New password"
                        className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      hasFeedback
                      name="confirm password"
                      dependencies={["newPassword"]} // This makes the validation depend on the 'password' field
                      validateDebounce={1000}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "The two passwords do not match"
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder="Confirm password"
                        className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                        size="large"
                      />
                    </Form.Item>
                  </div>
                ) : (
                  <Form.Item
                    hasFeedback
                    name="otp"
                    validateFirst
                    rules={[
                      {
                        required: true,
                        message: "Please input otp",
                      },
                      // ({ getFieldValue }) => ({
                      //   validator(_, value) {
                      //     if (isChangePassword) {
                      //       return Promise.resolve();
                      //     }
                      //     return Promise.reject("incorrect code");
                      //   },
                      // }),
                    ]}
                    className=" relative  w-full"
                  >
                    <Input
                      placeholder="Verification code"
                      className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                      size="large"
                    />
                  </Form.Item>
                )
              ) : (
                <Form.Item
                  hasFeedback
                  name="email"
                  validateFirst
                  rules={[
                    {
                      type: "email",
                      message:
                        "Invalid email! Please type the email you used to create account!",
                    },
                    {
                      required: true,
                      message: "Please input your email! address",
                    },
                  ]}
                  className=" relative  w-full"
                >
                  <Input
                    prefix={
                      <ILocalMail className=" flex justify-center items-center mr-3" />
                    }
                    placeholder="Email"
                    className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                    size="large"
                  />
                </Form.Item>
              )}

              <Form.Item className=" mb-[0px]">
                {successCreateNewPassword ? (
                  <Button
                    onClick={() => navigate("/")}
                    className=" w-full xl:h-[40px] xl:pr-4 xl:pl-4 xl:rounded-[36px] bg-button-submit-light text-white font-roboto text-[14px] leading-5 font-medium hover:!border-none hover:!text-white"
                  >
                    Go to log-in
                  </Button>
                ) : (
                  <SubmitButton
                    form={form}
                    content={isCheckOtp ? "Confirm" : "Continue"}
                    isLoading={
                      isCheckOtp
                        ? isChangePassword
                          ? loadingCreateNewPassword
                          : loadingCheckOtp
                        : loadingSentOtp
                    }
                    className=" w-full xl:h-[40px] xl:pr-4 xl:pl-4 xl:rounded-[36px] bg-button-submit-light text-white font-roboto text-[14px] leading-5 font-medium hover:!border-none hover:!text-white"
                  />
                )}
              </Form.Item>
            </Form>
          )}
          {/* <Form
            form={form}
            name="basic"
            layout="vertical"
            // labelCol={{
            //   span: 8,
            // }}
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
            // autoComplete="off"
            className=" relative "
          >
            {isCheckOtp ? (
              isChangePassword ? (
                <div className="">
                  <Form.Item
                    hasFeedback
                    name="newPassword"
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
                      placeholder="New password"
                      className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    name="confirm password"
                    dependencies={["newPassword"]} // This makes the validation depend on the 'password' field
                    validateDebounce={1000}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "The two passwords do not match"
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm password"
                      className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                      size="large"
                    />
                  </Form.Item>
                </div>
              ) : (
                <Form.Item
                  hasFeedback
                  name="otp"
                  validateFirst
                  rules={[
                    {
                      required: true,
                      message: "Please input otp",
                    },
                  ]}
                  className=" relative  w-full"
                >
                  <Input
                    placeholder="Verification code"
                    className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                    size="large"
                  />
                </Form.Item>
              )
            ) : (
              <Form.Item
                hasFeedback
                name="email"
                validateFirst
                rules={[
                  {
                    type: "email",
                    message:
                      "Invalid email! Please type the email you used to create account!",
                  },
                  {
                    required: true,
                    message: "Please input your email! address",
                  },
                ]}
                className=" relative  w-full"
              >
                <Input
                  prefix={
                    <ILocalMail className=" flex justify-center items-center mr-3" />
                  }
                  placeholder="Email"
                  className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                  size="large"
                />
              </Form.Item>
            )}

            <Form.Item className=" mb-[0px]">
              <SubmitButton
                form={form}
                content={isCheckOtp ? "Confirm" : "Continue"}
                isLoading={
                  isCheckOtp
                    ? isChangePassword
                      ? loadingCreateNewPassword
                      : loadingCheckOtp
                    : loadingSentOtp
                }
                className=" w-full xl:h-[40px] xl:pr-4 xl:pl-4 xl:rounded-[36px] bg-button-submit-light text-white font-roboto text-[14px] leading-5 font-medium hover:!border-none hover:!text-white"
              />
            </Form.Item>
          </Form> */}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
