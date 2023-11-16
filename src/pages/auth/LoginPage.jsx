import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/shared/SubmitButton";
import { ILocalLogo } from "../../components/svg/svg";
import { ILocalKey } from "../../components/svg/key";
import { ILocalMail } from "../../components/svg/mail";
import useAccountMutate from "../../hooks/useMutate/useAccountMutate";
import { useGoogleLogin } from "@react-oauth/google";
import { ILocalGoogle } from "../../components/svg/google";
import axios from "axios";
const LoginPage = () => {
  const { handleLogin, handleLoginGoogle, loadingLogin } = useAccountMutate();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const newValues = {
      grant_type: "password",
      username: values.email,
      password: values.password,
    };
    handleLogin(newValues);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await axios
          .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          })
          .then((res) => {
            console.log(res);
            const content = {
              grant_type: "google",
              google: `{"sub":"${res.data.sub}","name": "${res.data.name}", "email": "${res.data.email}", "picture":"${res.data.picture}"}`,
            };
            console.log(content);
            handleLoginGoogle(content);
          });

        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  const [form] = Form.useForm();

  return (
    <div className=" absolute h-full w-full bg-authen-page dark:bg-black flex justify-center pt-16">
      <div className="flex flex-col shadow-formAuthen justify-evenly gap-6 md:bg-primary md:p-8 md:rounded-2xl xl:bg-white  lg:bg-white lg:w-[500px] lg:p-8 lg:rounded-2xl xl:w-[640px] xl:h-max xl:p-6 xl:gap-6 xl:rounded-2xl lg:dark:bg-white md:dark:bg-white">
        <div className="flex flex-col gap-6">
          <div className=" justify-center flex flex-col gap-6 items-center ">
            <ILocalLogo className="w-[74px] h-[64px]" />
            <p className=" text-2xl  dark:text-white lg:dark:text-black md:dark:text-black font-roboto xl:text-[32px] xl:leading-10 xl:font-normal">
              Sign in
            </p>
          </div>
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
            <Form.Item
              hasFeedback
              name="email"
              validateFirst
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address!",
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
                prefix={
                  <ILocalKey className=" flex justify-center items-center mr-3" />
                }
                placeholder="Input your password"
                className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                size="large"
              />
            </Form.Item>
            <Form.Item className="">
              <div
                className=" self-stretch text-right font-roboto text-base font-normal text-[#1F1A1c] cursor-pointer"
                onClick={() => navigate("/forgotpassword")}
              >
                {" "}
                Forgot password?
              </div>
            </Form.Item>

            <Form.Item className=" mb-[0px]">
              <SubmitButton
                form={form}
                content="Sign in"
                isLoading={loadingLogin}
                className=" w-full xl:h-[40px] xl:pr-4 xl:pl-4 xl:rounded-[36px] bg-button-submit-light text-white font-roboto text-[14px] leading-5 font-medium hover:!border-none hover:!text-white"
              />
            </Form.Item>
          </Form>
          <div className="flex flex-row gap-6 justify-center items-center">
            <div className=" ml-[27px] w-full h-[1px] bg-[#F1DEE4]"></div>
            <div className="font-roboto text-base font-normal text-[#1F1A1C]">
              Or
            </div>
            <div className=" mr-[27px] w-full h-[1px] bg-[#F1DEE4]"></div>
          </div>
          <div
            onClick={() => googleLogin()}
            className=" hover:bg-secondary  flex flex-row gap-[7px] cursor-pointer content-center items-center justify-center place-items-center xl:h-[40px] xl:pt-0 xl:pb-0 xl:pl-4 xl:pr-4 self-stretch rounded-[36px] border-[1px] border-solid border-button-submit-light "
          >
            {" "}
            <ILocalGoogle className="w-[18px] h-[18px] content-center" />
            <p className=" font-roboto text-[14px] font-medium leading-5 text-button-submit-light flex content-center">
              Continue with Google
            </p>
            {/* <GoogleOAuthProvider clientId="988889415719-oogj3aqv6nlpdaj1mpn9sb0rjvtlakco.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialRespone) => {
                const details = jwtDecode(credentialRespone.credential);
                console.log(details);
              }}
              onError={() => {
                console.log("login fail");
              }}
            ></GoogleLogin>
          </GoogleOAuthProvider> */}
          </div>
          <div className="flex flex-row gap-6 justify-center items-center">
            <div className=" ml-[27px] w-1/2 h-[1px] bg-[#F1DEE4]"></div>
            <div className=" font-roboto text-base font-normal text-[#1F1A1C] w-2/3 text-center">
              You don't have an account?
            </div>
            <div className=" mr-[27px] w-1/2 h-[1px] bg-[#F1DEE4]"></div>
          </div>
          <div
            className=" hover:bg-secondary flex flex-row gap-[7px] cursor-pointer content-center items-center justify-center place-items-center xl:h-[40px] xl:pt-0 xl:pb-0 xl:pl-4 xl:pr-4 self-stretch rounded-[36px] border-[1px] border-solid border-button-submit-light "
            onClick={() => navigate("signup")}
          >
            <p className=" font-roboto text-[14px] font-medium leading-5 text-button-submit-light flex content-center">
              Create an account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
