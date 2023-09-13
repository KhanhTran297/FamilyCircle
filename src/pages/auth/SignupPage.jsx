import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
const SignupPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  return (
    <div className=" absolute h-full w-full bg-white dark:bg-black flex justify-center items-center">
      <div className="flex flex-col gap-4 xl:bg-slate-300 xl:w-[50%] xl:h-max xl:p-8 xl:rounded-2xl xl:dark:bg-white">
        <div className="flex flex-col gap-6">
          <div className=" m-auto ">
            <p className=" text-2xl font-semibold dark:text-white xl:dark:text-black ">
              Sign up
            </p>
          </div>
          <Form
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
            className=" relative"
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
              className=" relative w-full"
            >
              <Input
                placeholder="Input your username"
                className=" pt-2 pb-2 rounded-xl text-base "
              />
            </Form.Item>
            <Form.Item
              label="Email"
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
              label="Phonenumber"
              name="phonenumber"
              rules={[
                {
                  required: true,
                  message: "Please input your phonenumber!",
                },
              ]}
              className=" relative w-full"
            >
              <Input
                placeholder="Input your phonenumber"
                className=" pt-2 pb-2 rounded-xl text-base "
              />
            </Form.Item>
            <Form.Item
              label="Date of birth"
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Please input your date of birth!",
                },
              ]}
              className=" relative w-full"
            >
              <DatePicker
                className=" w-full pt-2 pb-2 rounded-xl text-base"
                defaultValue={dayjs("01/01/2015", dateFormatList[0])}
                format={dateFormatList}
              />
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
        <div className="">
          <p className=" xl:dark:text-black dark:text-white">
            Already have an account ?{" "}
            <Link to="/login" className=" text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
