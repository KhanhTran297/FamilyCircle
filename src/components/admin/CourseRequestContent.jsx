// @quokka
import {  useMemo, useState } from "react";
import {
  Button,
  Form,

  Input,
 
 
  Table,
} from "antd";

import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";


import queryString from "query-string";
import { useLocation, useSearchParams } from "react-router-dom";
import { listCourseRequestApi } from "../../api/event";

const CourseRequestContent = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const queryParam = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );
  console.log(queryParam);
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
    searchForm.resetFields();
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (_, record) => <div className="">{record.id}</div>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Email register",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Register name",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Register phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Start date",
      dataIndex: `startDate`,
      key: "startDate",
      align: "center",
      render: (_, record) => {
        const rawtime = dayjs(record.startDate, "DD/MM/YYYY");
        const formatTime = dayjs(rawtime["$d"]).format("DD/MM/YYYY");
        return <p>{formatTime}</p>;
      },
    },
  ];

  const { data: listCourseRequest, isLoading } = useQuery({
    queryKey: ["getListCourseRequests", queryParam],
    queryFn: () =>
      listCourseRequestApi(queryParam).then((res) => {
        if (res.data.totalElements === 0) {
          return [];
        } else {
          const tempData = res.data.content.map((item) => {
            return {
              id: item.id,
              title: item.course.title,
              email: item.email,
              fullName: item.fullName,
              startDate: item.course.startDate,
              phone: item.phone,
            };
          });
          return tempData;
        }
      }),
  });
  console.log(listCourseRequest);

  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "white",
      }}
      className="flex flex-col "
    >
      <div className=" pb-2 mb-2 border-solid border-black border-b-[1px] flex flex-row justify-between">
        <div className="">
          <Form
            layout="inline"
            onFinish={handleSearch}
            form={searchForm}
            // initialValues={searchParams.get("fullName") && ""}
          >
            <Form.Item label="Register name" name="fullName">
              <Input defaultValue={searchParams.get("fullName")}></Input>
            </Form.Item>
            <Form.Item
              label="Register Email"
              name="email"
              // initialValue={searchParams.get("email") && ""}
            >
              <Input defaultValue={searchParams.get("email")}></Input>
            </Form.Item>
            <Form.Item
              label="Register phone"
              name="phone"
              // initialValue={searchParams.get("email") && ""}
            >
              <Input defaultValue={searchParams.get("phone")}></Input>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Search</Button>
            </Form.Item>
            <Form.Item>
              <Button
              danger
                className="text-white "
                onClick={handleReset}
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="">
          {/* <Button onClick={showModal}>Create</Button> */}
        </div>
      </div>
      <div className="h-full ">
        <Table
          loading={isLoading}
          dataSource={listCourseRequest}
          columns={columns}
          scroll={{
            y: 400,
          }}
        ></Table>
      </div>
    </div>
  );
};

export default CourseRequestContent;
