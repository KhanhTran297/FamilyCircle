import { useState } from "react";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileOutlined,
  ContainerOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, theme } from "antd";
import { Avatar } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UseCookie from "../../hooks/UseCookie";
const { Header, Content, Footer, Sider } = Layout;

const CmsPage = () => {
  const { removeToken } = UseCookie();
  const location = useLocation();
  const defaultKey = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    localStorage.clear();
    navigate("/");
  };
  const handleContents = (data) => {
    switch (data.key) {
      case "users":
        navigate(`/admin/${data.key}`);
        break;
      case "experts":
        navigate(`/admin/${data.key}`);
        break;
      case "hospital":
        navigate(`/admin/${data.key}`);
        break;
      case "hospitalrole":
        navigate(`/admin/${data.key}`);
        break;
      case "academicdegree":
        navigate(`/admin/${data.key}`);
        break;
      case "department":
        navigate(`/admin/${data.key}`);
        break;
      case "posts":
        navigate(`/admin/${data.key}`);
        break;
      case "community":
        navigate(`/admin/${data.key}`);
        break;
      case "courses":
        navigate("/events");
        break;
      case "rpposts":
        navigate(`/report/posts`);
        break;
      case "rpcomments":
        navigate(`/report/comments`);
        break;
      case "courserequest":
        navigate(`/courserequests`);
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
      getItem("User", "users"),
      getItem("Expert", "experts"),
    ]),
    getItem("Manage category", "sub2", <FileOutlined />, [
      getItem("Hospital", "hospital"),
      getItem("Hospital Role", "hospitalrole"),
      getItem("Department", "department"),
      getItem("Academic Degree", "academicdegree"),
      getItem("Community", "community"),
    ]),
    getItem("Moderate posts", "posts", <ContainerOutlined />),
    getItem("Manage Report", "sub4", <FlagOutlined />, [
      getItem("Posts", "rpposts"),
      getItem("Comments", "rpcomments"),
    ]),
    getItem("Moderate courses", "courses", <ContainerOutlined />),
    getItem("Course requests", "courserequest", <ContainerOutlined />),
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
    <Layout className="absolute w-full h-full ">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={() => {}}
        onCollapse={() => {}}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical flex justify-center place-items-center relative w-full h-[150px] bg-slate-400 rounded-2xl">
          <img
            src="https://socialavatar.s3.ap-southeast-1.amazonaws.com/AVATAR_xRB0dIFCXp.jpg"
            alt=""
            className="absolute w-3/4 rounded-full h-4/4"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[defaultKey]}
          items={siderItems}
          onClick={(e) => handleContents(e)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className="flex items-center justify-between pl-4 pr-4 "
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
                src="https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg"
                className="cursor-pointer hover:opacity-60"
              />
            </a>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "24px 16px 0",
            // overflow: "scroll",
          }}
        >
          {/* {params.id === "1" && <UsersContent bg={colorBgContainer} />}
          {params.id === "2" && <ExpertsContent bg={colorBgContainer} />}
          {params.id === "3" && <HospitalContent bg={colorBgContainer} />} */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CmsPage;
