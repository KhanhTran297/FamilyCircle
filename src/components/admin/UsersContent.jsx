import { Avatar, Button, Form, Input, Table, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useQuery } from "@tanstack/react-query";
import { getAccountListApi } from "../../api/account";

const UsersContent = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();
  const queryParam = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );
  const handleSearch = async (values) => {
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        // Kiểm tra xem thuộc tính có bằng undefined không
        if (values[key] === undefined) {
          // Gán thuộc tính bằng ""
          values[key] = "";
        }
      }
    }
    setSearchParams(values);
  };
  const handleReset = () => {
    setSearchParams({});
    form.resetFields();
  };
  const promise = new Promise((resolve) => {
    resolve(queryParam);
  });
  const {
    data: listUserAccounts,
    refetch: getListUserAccounts,
    isLoading,
  } = useQuery({
    queryKey: ["listUsersAccount", queryParam],
    queryFn: () =>
      promise.then((res) => {
        return getAccountListApi(res);
      }),
    enabled: false,
    retry: 0,
    onSuccess: () => {
      message.success("Get list user success");
    },
  });
  const columns = [
    {
      title: "Avatar",
      dataIndex: "userAvatar",
      key: "userAvatar",
      render: (_, record) => <Avatar src={record.userAvatar} />,
    },
    {
      title: "Fullname",
      dataIndex: "userFullName",
      key: "userFullName",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (_, record) => {
        const rawtime = dayjs(record.dateOfBirth, "DD/MM/YYYY");
        const formatTime = dayjs(rawtime["$d"]).format("DD/MM/YYYY");
        return <p>{formatTime}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        var status = " ";
        var bgcss = "";
        switch (record.status) {
          case 1:
            status = "Active";
            bgcss = "bg-green-500";
            break;
          case 2:
            status = "Pending";
            bgcss = "bg-yellow-500";
            break;
          case 3:
            status = "Lock";
            bgcss = "bg-red-500";
            break;
          default:
            break;
        }
        return (
          <div
            className={`${bgcss} p-1 rounded-md place-items-center flex justify-center`}
          >
            <p>{status}</p>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getListUserAccounts();
  }, [location.search]);
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "white",
      }}
    >
      <div className=" mb-2 pb-2 border-b-[1px] border-black border-solid">
        <Form layout="inline" onFinish={handleSearch} form={form}>
          <Form.Item label="Fullname" name="fullName">
            <Input defaultValue={searchParams.get("fullName")}></Input>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input defaultValue={searchParams.get("email")}></Input>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Search</Button>
          </Form.Item>
          <Form.Item>
            <Button
              className=" bg-red-600 text-white hover:!text-white hover:!border-none"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="h-full ">
        <Table
          loading={isLoading}
          dataSource={listUserAccounts?.data?.content}
          columns={columns}
          scroll={{
            y: 400,
          }}
        ></Table>
      </div>
    </div>
  );
};

export default UsersContent;
