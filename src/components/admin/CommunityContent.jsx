import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popconfirm, Table, Upload, message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHospitalApi,
  deleteCategoryApi,
  getListCategoryApi,
  updateCategoryApi,
} from "../../api/category";
import { uploadImageApi } from "../../api/file";
import UseCookie from "../../hooks/UseCookie";
import Modal from "react-modal";
import { useForm } from "antd/es/form/Form";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
  },
};
const CommunityContent = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isDetailCommunity, setIsDetailCommunity] = useState(false);
  const [dataDetailCommunity, setDataDetailCommunity] = useState({});
  const [check, setCheck] = useState(1);
  const [categoryId, setCategoryId] = useState(null);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imgComunity, setImgComunity] = useState(null);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  async function handleChangeModal() {
    setIsDetailCommunity(true);
  }
  function closeModal() {
    setImgComunity(null);
    setIsOpen(false);
  }
  const handleOpenDetailCommunity = async (record) => {
    handleChangeModal().then(() => openModal());
  };
  const handleSubmit = (value) => {
    if (imgComunity !== null) {
      if (check === 1) {
        createCommunity({
          categoryName: value.categoryName,
          categoryDescription: value.categoryDescription,
          categoryImage: imgComunity,
          categoryKind: 5,
          categoryOrdering: 1,
          parentId: null,
          status: 1,
        }).then(() => {
          form.resetFields();
          closeModal();
        });
      } else {
        updateCommunity({
          id: categoryId,
          categoryName: value.categoryName,
          categoryDescription: value.categoryDescription,
          categoryImage: imgComunity,
          categoryKind: 5,
          categoryOrdering: 1,
          parentId: null,
          status: 1,
        }).then(() => {
          setCheck(1);
          form.resetFields();
          closeModal();
        });
      }
    } else {
      message.error("Please upload image");
    }
  };
  const { data: listCommunity, isLoading: isLoadingCommunity } = useQuery({
    queryKey: ["listCommunity"],
    queryFn: () =>
      getListCategoryApi({ kind: 5 }).then((res) => {
        return res?.data?.content;
      }),
  });
  const { mutateAsync: uploadImage, isLoading: isLoadingUploadImage } =
    useMutation({
      mutationKey: ["uploadImage"],
      mutationFn: uploadImageApi,
      onSuccess: (res) => {
        setImgComunity(res.data.filePath);
      },
    });
  const { mutateAsync: updateCommunity, isLoading: isLoadingUpdateCommunity } =
    useMutation({
      mutationKey: ["updateCommunity"],
      mutationFn: updateCategoryApi,
      onSuccess: () => {
        message.success("Update community success");
        queryClient.invalidateQueries("listCommunity");
      },
    });
  const { mutateAsync: createCommunity, isLoading: isLoadingCreateCommunity } =
    useMutation({
      mutationKey: ["createCommunity"],
      mutationFn: createHospitalApi,
      onSuccess: () => {
        message.success("Create community successfully");
        queryClient.invalidateQueries("listCommunity");
      },
    });
  const { mutateAsync: deleteCommunity } = useMutation({
    mutationKey: ["deleteCommunity"],
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      message.success("Delete community successfully");
      queryClient.invalidateQueries("listCommunity");
    },
  });
  const handleSetForm = (checkValue, values) => {
    if (checkValue === 1) {
      setCheck(1);
      setIsOpen(true);
    } else {
      setCheck(2);
      setImgComunity(values.categoryImage);
      setCategoryId(values.id);
      setIsOpen(true);
      form.setFieldValue("categoryName", values.categoryName);
      form.setFieldValue("categoryDescription", values.categoryDescription);
    }
  };
  const columns = [
    {
      title: "Community Image",
      dataIndex: "categoryImage",
      key: "categoryImage",
      align: "center",
      render(_, record) {
        return (
          <div className="flex justify-center h-20 items-centerw-20 ">
            <img src={record.categoryImage} alt="categoryImage" />
          </div>
        );
      },
    },
    {
      title: "Community name",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "30%",
      align: "center",

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
            <Button
              type="default"
              className="mr-2"
              onClick={() => handleOpenDetailCommunity(record)}
            >
              More
            </Button>
            <Popconfirm
              title="Delete this community?"
              description="Are you sure to delete this community?"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              okType="default"
              cancelType="danger"
              onConfirm={() => deleteCommunity(record.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
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
        <Button type="default" onClick={() => setIsOpen(true)}>
          Create
        </Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="flex flex-col w-full h-full gap-2 ">
            <div className=" border-b border-b-[#ccc]">
              <p className="text-lg font-roboto">
                {check === 1 ? "Create new community" : "Update community"}
              </p>
            </div>
            <div className="flex flex-row gap-4 ">
              <div className="flex flex-col items-center justify-center gap-2">
                <p>Community Image</p>
                <div className=" bg-slate-400 w-[250px] h-[250px] rounded-md ">
                  <img
                    src={
                      imgComunity
                        ? imgComunity
                        : "https://via.placeholder.com/250"
                    }
                    alt="categoryImage"
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
                <Upload
                  action={(file) => {
                    uploadImage({ file: file, type: "avatar" });
                  }}
                  showUploadList={false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    loading={isLoadingUploadImage}
                  >
                    {check === 1 ? "Click to Upload" : "Update Image"}
                  </Button>
                </Upload>
              </div>
              <div className="flex items-center justify-center w-max">
                <Form
                  form={form}
                  name="basic"
                  layout="vertical"
                  labelCol={{
                    span: 16,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    minWidth: "100%",
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  className="flex flex-col content-center justify-center gap-4"
                  onFinish={(value) => handleSubmit(value)}
                  autoComplete="off"
                >
                  <Form.Item
                    label="community Name"
                    name="categoryName"
                    className="items-center w-full "
                    rules={[
                      {
                        required: true,
                        message: "Please input categoryName!",
                      },
                    ]}
                  >
                    <Input className=" w-[300px]" />
                  </Form.Item>

                  <Form.Item
                    label="Community Description"
                    name="categoryDescription"
                    className="items-center w-full"
                    rules={[
                      {
                        required: true,
                        message: "Please input community description!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      className=" w-[300px]"
                      allowClear
                      style={{ width: "300px" }}
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className=" border-t border-t-[#ccc] flex justify-end">
              <div className="pt-2 ">
                <Button danger onClick={closeModal} className="mr-2">
                  Cancel
                </Button>
                <Button
                  type="default"
                  onClick={() => form.submit()}
                  loading={
                    check === 1
                      ? isLoadingCreateCommunity
                      : isLoadingUpdateCommunity
                  }
                >
                  {check === 1 ? "Create" : "Update"}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className="">
        <Table
          loading={isLoadingCommunity}
          dataSource={listCommunity}
          columns={columns}
          bordered={true}
        ></Table>
      </div>
    </div>
  );
};

CommunityContent.propTypes = {};

export default CommunityContent;
