import useAccount from "../../hooks/useAccount";
import { Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/shared/SubmitButton";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
const LoginPage = () => {
  const { handleLogin } = useAccount();
  const navigate = useNavigate();
  const onFinish = (values) => {
    handleLogin(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();
  return (
    <div className=" absolute h-full w-full bg-white dark:bg-black flex justify-center items-center">
      <div className="flex flex-col justify-evenly gap-6 md:bg-primary md:p-8 md:rounded-2xl xl:bg-primary lg:bg-primary lg:w-[500px] lg:p-8 lg:rounded-2xl xl:w-[500px] xl:h-max xl:p-8 xl:rounded-2xl lg:dark:bg-white md:dark:bg-white">
        <div className="flex flex-col gap-6">
          <div className=" m-auto ">
            <p className=" text-2xl font-semibold dark:text-white lg:dark:text-black md:dark:text-black ">
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
            autoComplete="off"
            className=" relative"
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

            <Form.Item name="remember" valuePropName="checked">

              <Form.Item className=" float-left">
                <Checkbox className=" dark:text-white lg:dark:text-black md:dark:text-black">
                  Remember me
                </Checkbox>
              </Form.Item>
              <p
                className=" float-right cursor-pointer hover:text-blue-400"
                onClick={() => {
                  navigate("forgotpassword");
                }}
              >
                Forgot password
              </p>
            </Form.Item>

            <Form.Item className=" mb-2">
              <SubmitButton
                form={form}
                content="Sign in"
                className=" w-full h-max text-base font-semibold pt-2 pb-2 rounded-[30px] xl:bg-white md:bg-white lg:bg-white xl:text-black lg:hover:bg-secondary md:hover:bg-secondary lg:hover:!border-none md:hover:!border-none xl:hover:bg-secondary lg:hover:!text-neutral-800 md:hover:!text-neutral-800 xl:hover:!border-none xl:hover:!text-neutral-800 dark:text-black bg-primary text-black !border-none dark:bg-white lg:dark:bg-slate-500 lg:dark:text-white md:dark:bg-slate-500 md:dark:text-white"
              />
            </Form.Item>
          </Form>
        </div>
        <div className=" flex flex-col gap-4 border-t-2 border-t-slate-300 pt-3 xl:border-white xl:dark:border-t-slate-300 dark:border-b-white">
          <div className=" flex flex-row gap-4 cursor-pointer items-center justify-center place-items-center xl:hover:bg-secondary  lg:hover:bg-secondary md:hover:bg-secondary lg:dark:bg-slate-500 lg:dark:text-white md:dark:bg-slate-500 md:dark:text-white xl:bg-white lg:bg-white md:bg-white lg:text-black xl:text-black md:text-black bg-primary pt-2 pb-2 pl-8 pr-8 rounded-[30px] text-black dark:text-black dark:bg-white ">
            <div className="icon google">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <g>
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </g>
              </svg>
            </div>
            <p className="text-base font-semibold  ">Đăng nhập bằng Google</p>
          </div>
          <div className="">
            <p className=" lg:dark:text-black md:dark:text-black dark:text-white text-sm">
              Don{"'"}t have an account ?{" "}
              <Link to="/signup" className=" text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
