import { Space, Spin } from "antd";

const LoadingPage = (props) => {
  const { css } = props;
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      className={css}
    >
      <Space>
        <Spin tip="Loading" size="large" className=" text-9xl">
          {/* <div className="content p-[50px] bg-primary rounded-[4px]" /> */}
        </Spin>
      </Space>
    </Space>
  );
};

export default LoadingPage;
