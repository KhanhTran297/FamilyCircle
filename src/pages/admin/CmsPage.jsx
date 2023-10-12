import { useState } from "react";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, theme } from "antd";
import { Avatar } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import UseCookie from "../../hooks/UseCookie";
import UsersContent from "../../components/admin/UsersContent";
import ExpertsContent from "../../components/admin/ExpertsContent";
import HospitalContent from "../../components/admin/HospitalContent";
const { Header, Content, Footer, Sider } = Layout;

const CmsPage = () => {
  const { removeToken } = UseCookie();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate("/");
  };
  const params = useParams();
  const handleContents = (data) => {
    switch (data.key) {
      case "1":
        navigate(`/admin/${data.key}`);
        break;
      case "2":
        navigate(`/admin/${data.key}`);
        break;
      case "3":
        navigate(`/admin/${data.key}`);
        break;
      case "4":
        navigate(`/admin/${data.key}`);
        break;
      default:
        break;
    }
  };
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const siderItems = [
    getItem("Manage account", "sub1", <UserOutlined />, [
      getItem("User", 1),
      getItem("Expert", 2),
    ]),
    getItem("Manage category", "sub2", <FileOutlined />, [
      getItem("Hospital", 3),
      getItem("Department", 4),
    ]),
    // getItem("", "5", <FileOutlined />),
  ];
  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        handleLogout();
        break;
      default:
        break;
    }
  };
  const items = [
    {
      label: "Log out",
      key: "1",
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className=" absolute h-full w-full">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical flex justify-center place-items-center relative w-full h-[150px] bg-slate-400 rounded-2xl">
          <img
            src="../../logo.jpg"
            alt=""
            className=" absolute w-3/4 h-4/4 rounded-full"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={params.id}
          items={siderItems}
          onClick={(e) => handleContents(e)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className=" flex justify-between items-center pl-4 pr-4"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar
                size={{
                  xs: 40,
                  sm: 50,
                  md: 50,
                  lg: 50,
                  xl: 50,
                  xxl: 50,
                }}
                src="defaultavatar.jpg"
                className=" cursor-pointer hover:opacity-60"
              />
            </a>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          {params.id === "1" && <UsersContent bg={colorBgContainer} />}
          {params.id === "2" && <ExpertsContent bg={colorBgContainer} />}
          {params.id === "3" && <HospitalContent bg={colorBgContainer} />}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CmsPage;
