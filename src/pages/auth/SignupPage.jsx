import { Button, Checkbox, Form, Input } from "antd";
const SignupPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className=" absolute h-full w-full bg-white dark:bg-black flex justify-center items-center">
      <div className="flex flex-col gap-4 xl:bg-slate-300 xl:w-[50%] xl:h-[500px] xl:p-8 xl:rounded-2xl xl:dark:bg-white">
        <div className="flex flex-col gap-6">
          <div className=" m-auto ">
            <p className=" text-2xl font-semibold dark:text-white xl:dark:text-black ">
              Sign up
            </p>
          </div>
          <Form
            name="basic"
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
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              className=" relative w-full"
            >
              <Input
                placeholder="Input your email"
                className=" pt-2 pb-2 rounded-xl text-base "
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Input your password"
                className=" pt-2 pb-2 rounded-xl text-base"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className=" dark:text-white xl:dark:text-black">
                Remember me
              </Checkbox>
            </Form.Item>

            <Form.Item className=" mb-2">
              <Button
                type="default"
                htmlType="submit"
                className=" w-full text-[20px] pt-2 pb-10 rounded-[30px] xl:bg-white xl:text-black dark:text-black bg-slate-500 text-white dark:bg-white xl:dark:bg-slate-500 xl:dark:text-white"
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className=" border-t-2 border-t-slate-300 pt-3 xl:border-white xl:dark:border-t-slate-300 dark:border-b-white">
          <div className=" flex flex-row gap-4 cursor-pointer items-center justify-center place-items-center xl:dark:bg-slate-500 xl:dark:text-white xl:bg-white xl:text-black bg-slate-500 pt-2 pb-2 pl-8 pr-8 rounded-[30px] text-white dark:text-black dark:bg-white ">
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
            <p className="text-[20px] ">Đăng nhập bằng Google</p>
          </div>
        </div>
        <div className="">
          <p className=" xl:dark:text-black dark:text-white">
            Already have an account?
            <a href="" className=" text-blue-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
