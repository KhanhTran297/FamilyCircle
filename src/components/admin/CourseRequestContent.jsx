// @quokka
import { useMemo } from "react";
import { Button, Form, Input, Select, Table } from "antd";

import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

import queryString from "query-string";
import { useLocation, useSearchParams } from "react-router-dom";
import { listCourseAutoComplete, listCourseRequestApi } from "../../api/event";

const CourseRequestContent = () => {
  const location = useLocation();

  const [searchForm] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();

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
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onChange = () => {};
  const onSearch = () => {};
  const handleClear = () => {};
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (_, record) => <div className="">{record.id}</div>,
    },
    {
      title: "CourseId",
      dataIndex: "courseId",
      key: "courseId",
      render: (_, record) => <div className="">{record.courseId}</div>,
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
              courseId: item.course.id,
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
  const { data: listCourseAuto } = useQuery({
    queryKey: ["listCourseAutoComplete"],
    queryFn: () =>
      listCourseAutoComplete().then((res) => {
        const newData = res?.data?.content?.map((item) => {
          return {
            label: item.title,
            value: item.id,
          };
        });
        return newData;
      }),
  });

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
            className="flex flex-row gap-3"
            // initialValues={searchParams.get("fullName") && ""}
          >
            <Form.Item label="CourseId" name="courseId">
              {/* <Input
                defaultValue={searchParams.get("courseId")}
                type="number"
                className=" max-w-[150px]"
              ></Input> */}
              <Select
                options={listCourseAuto}
                showSearch
                placeholder="Select a courseName"
                optionFilterProp="children"
                onSearch={onSearch}
                onChange={onChange}
                filterOption={filterOption}
                allowClear
                onClear={() => handleClear()}
                className=" min-w-max max-w-[300px] w-[300px]"
                style={{ width: "250px" }}
              ></Select>
            </Form.Item>
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
              <Input
                defaultValue={searchParams.get("phone")}
                type="number"
                className=" max-w-[160px]"
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Search</Button>
            </Form.Item>
            <Form.Item>
              <Button danger className="text-white " onClick={handleReset}>
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
