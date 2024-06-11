import { Button, Form, Input, Modal, Popconfirm, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createHospitalApi,
  deleteCategoryApi,
  getListCategoryApi,
  updateCategoryApi,
} from "../../api/category";
import { QuestionCircleOutlined } from "@ant-design/icons";
const DepartmentContent = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [check, setCheck] = useState(1);
  const [categoryId, setCategoryId] = useState(null);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Department name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Department description",
      dataIndex: "categoryDescription",
      key: "categoryDescription",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "30%",
      className: "flex flex-row justify-center",
      render: (_, record) => {
        return (
          <div className="flex flex-row justify-center">
            <Button
              type="default"
              className="mr-2"
              onClick={() => handleSetForm(2, record)}
            >
              Edit
            </Button>

            <Popconfirm
              title="Delete this department ?"
              description="Are you sure to delete this department?"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              okType="default"
              cancelType="danger"
              onConfirm={() => handleDeleteCategory(record.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const { mutate: handleDeleteCategory } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      message.success("Delete department success");
      handleGetListCategory();
    },
    onError: () => {
      message.error("Delete department failed");
    },
  });
  const { mutate: handleUpdateCategory } = useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      message.success("Update department success");
      handleGetListCategory();
    },
    onError: () => {
      message.error("Update department failed");
    },
  });
  const {
    refetch: handleGetListCategory,
    data: listHospital,
    isLoading,
  } = useQuery({
    queryKey: ["getListCategory"],
    queryFn: () => getListCategoryApi({ kind: 2 }),
    enabled: false,
    retry: 0,
    onSuccess: () => {},
    onError: () => {
      console.log("error");
    },
  });
  const { mutate: handleCreateCategory } = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: createHospitalApi,
    onSuccess: () => {
      message.success("Create department successfully");
      handleGetListCategory();
    },
    onError: () => {
      message.error("Create department failed");
    },
  });
  const handleCancel = () => {
    setOpen(false);
  };
  const handleSetForm = (checkValue, values) => {
    if (checkValue === 1) {
      setCheck(1);
      setOpen(true);
      form.resetFields();
    } else {
      setCheck(2);
      setCategoryId(values.id);
      setOpen(true);
      form.setFieldValue("categoryName", values.categoryName);
      form.setFieldValue("categoryDescription", values.categoryDescription);
    }
  };

  const handleCreate = (values) => {
    const newvalues = {
      ...values,
      categoryImage: "",
      categoryKind: 2,
      categoryOrdering: 1,
      parentId: null,
      status: 1,
    };
    handleCreateCategory(newvalues);
  };
  const handleUpdate = (values) => {
    const newvalues = {
      ...values,
      id: categoryId,
      categoryImage: "",
      categoryOrdering: 1,
      status: 1,
    };
    handleUpdateCategory(newvalues);
  };
  const onFinish = async (values) => {
    setConfirmLoading(true);
    if (check === 1) {
      handleCreate(values);
    } else {
      handleUpdate(values);
    }
    setConfirmLoading(false);
    setOpen(false);
  };
  useEffect(() => {
    handleGetListCategory();
  }, []);
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "white",
      }}
      className="flex flex-col "
    >
      <div className=" pb-2 mb-2 border-b-[1px] border-solid border-black flex flex-row-reverse">
        <Button onClick={() => handleSetForm(1)}>Create</Button>
        <Modal
          title={check === 1 ? "Create new department" : "Edit department"}
          open={open}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 11,
            }}
            wrapperCol={{
              span: 20,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Department name"
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: "Please input department name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Department description"
              name="categoryDescription"
              rules={[
                {
                  required: true,
                  message: "Please input department description!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item className="w-full ">
              <div className="flex flex-row justify-end w-full gap-2">
                <Button type="default" htmlType="submit">
                  {check === 1 ? "Create" : "Edit"}
                </Button>
                <Button
                  type="default"
                  className="bg-red-500 "
                  danger
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="h-full ">
        <Table
          loading={isLoading}
          dataSource={listHospital?.data?.content}
          columns={columns}
          scroll={{
            y: 400,
          }}
        ></Table>
      </div>
    </div>
  );
};

export default DepartmentContent;
