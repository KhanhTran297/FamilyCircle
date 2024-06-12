import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Upload,
  message,
  Drawer,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHospitalApi,
  deleteCategoryApi,
  getListCategoryApi,
  updateCategoryApi,
} from "../../api/category";
import { uploadImageApi } from "../../api/file";
import Modal from "react-modal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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
const customTopicStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10000,
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
  const [check, setCheck] = useState(1);
  const [topicCheck, setTopicCheck] = useState(1);
  const [open, setOpen] = useState(false);
  const showDrawer = (record) => {
    setCommunityDetail(record);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [categoryId, setCategoryId] = useState(null);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [topicForm] = Form.useForm();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [topicModalIsOpen, setTopicIsOpen] = useState(false);
  const [imgComunity, setImgComunity] = useState(null);
  const [communityDetail, setCommunityDetail] = useState();
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const { data: listTopic } = useQuery({
    queryKey: ["listTopicDetail", communityDetail?.id],
    queryFn: () =>
      getListCategoryApi({ parentId: communityDetail.id }).then((res) => {
        return res?.data?.content;
      }),
    enabled: !!communityDetail?.id,
  });
  function closeModal() {
    form.resetFields();
    setImgComunity(null);
    setCheck(1);
    setIsOpen(false);
  }
  function closeTopicModal() {
    topicForm.resetFields();
    setImgComunity(null);
    setTopicCheck(1);
    setTopicIsOpen(false);
  }
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
  const handleSubmitTopic = (value) => {
    if (imgComunity !== null) {
      if (topicCheck === 1) {
        createCommunity({
          categoryName: value.categoryName,
          categoryDescription: value.categoryDescription,
          categoryImage: imgComunity,
          categoryKind: 6,
          categoryOrdering: 1,
          parentId: communityDetail.id,
          status: 1,
        }).then(() => {
          topicForm.resetFields();
          closeTopicModal();
        });
      } else {
        updateCommunity({
          id: categoryId,
          categoryName: value.categoryName,
          categoryDescription: value.categoryDescription,
          categoryImage: imgComunity,
          status: 1,
        }).then(() => {
          setTopicCheck(1);
          topicForm.resetFields();
          closeTopicModal();
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
  const handleSetTopicForm = (checkValue, values) => {
    if (checkValue === 1) {
      setTopicCheck(1);
      setTopicIsOpen(true);
    } else {
      setTopicCheck(2);
      setImgComunity(values.categoryImage);
      setCategoryId(values.id);
      setTopicIsOpen(true);
      topicForm.setFieldValue("categoryName", values.categoryName);
      topicForm.setFieldValue(
        "categoryDescription",
        values.categoryDescription
      );
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
              onClick={() => showDrawer(record)}
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
                    label="Community Name"
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
                      style={{ width: "300px", height: "150px" }}
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
      <Drawer title="List Topics" onClose={onClose} open={open}>
        <div className="flex flex-col h-full gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center w-full">
              <img
                src={communityDetail?.categoryImage}
                alt=""
                className="object-scale-down w-[120px] h-[120px] "
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-center gap-2">
                <p className="text-lg font-normal font-roboto">
                  Community name:
                </p>
                <p className="text-base font-normal font-roboto">
                  {communityDetail?.categoryName}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-normal font-roboto">Description:</p>
                <p className="text-base font-normal font-roboto">
                  {communityDetail?.categoryDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full gap-2">
            <div className="flex flex-row items-center justify-between">
              <p className="text-lg font-normal font-roboto">List Topics:</p>
              <Button type="default" onClick={() => setTopicIsOpen(true)}>
                Create{" "}
              </Button>
            </div>
            <div className="flex flex-col h-full gap-2 overflow-y-scroll ">
              {listTopic?.map((item, index) => {
                return (
                  <div className="flex flex-row justify-between " key={index}>
                    <div className="flex flex-row items-center gap-2">
                      <img
                        src={item.categoryImage}
                        alt=""
                        className="w-12 h-12 rounded-full "
                      />
                      <p className="text-base font-normal font-roboto">
                        {item.categoryName}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3 ">
                      <div
                        className="cursor-pointer hover:text-yellow-300"
                        onClick={() => handleSetTopicForm(2, item)}
                      >
                        <EditOutlined />
                      </div>
                      <div className="cursor-pointer hover:text-red-400">
                        <Popconfirm
                          title="Delete this topic?"
                          description="Are you sure to delete this topic?"
                          icon={
                            <QuestionCircleOutlined
                              style={{
                                color: "red",
                              }}
                            />
                          }
                          okType="default"
                          cancelType="danger"
                          onConfirm={() => deleteCommunity(item.id)}
                        >
                          <DeleteOutlined />
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Modal
          isOpen={topicModalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeTopicModal}
          style={customTopicStyles}
          contentLabel="Topic Modal"
        >
          <div className="flex flex-col w-full h-full gap-2 ">
            <div className=" border-b border-b-[#ccc]">
              <p className="text-lg font-roboto">
                {topicCheck === 1 ? "Create new topic" : "Update topic"}
              </p>
            </div>
            <div className="flex flex-row gap-4 ">
              <div className="flex flex-col items-center justify-center gap-2">
                <p>Topic Image</p>
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
                    {topicCheck === 1 ? "Click to Upload" : "Update Image"}
                  </Button>
                </Upload>
              </div>
              <div className="flex items-center justify-center w-max">
                <Form
                  form={topicForm}
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
                  onFinish={(value) => handleSubmitTopic(value)}
                  autoComplete="off"
                >
                  <Form.Item
                    label="topic Name"
                    name="categoryName"
                    className="items-center w-full "
                    rules={[
                      {
                        required: true,
                        message: "Please input topic name!",
                      },
                    ]}
                  >
                    <Input className=" w-[300px]" />
                  </Form.Item>

                  <Form.Item
                    label="topic Description"
                    name="categoryDescription"
                    className="items-center w-full"
                    rules={[
                      {
                        required: true,
                        message: "Please input topic description!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      className=" w-[300px], h-[400px]"
                      allowClear
                      style={{ width: "300px" }}
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className=" border-t border-t-[#ccc] flex justify-end">
              <div className="pt-2 ">
                <Button danger onClick={closeTopicModal} className="mr-2">
                  Cancel
                </Button>
                <Button
                  type="default"
                  onClick={() => topicForm.submit()}
                  loading={
                    topicCheck === 1
                      ? isLoadingCreateCommunity
                      : isLoadingUpdateCommunity
                  }
                >
                  {topicCheck === 1 ? "Create" : "Update"}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </Drawer>

      <div className="h-full ">
        <Table
          loading={isLoadingCommunity}
          dataSource={listCommunity}
          columns={columns}
          bordered={true}
          scroll={{
            y: 400,
          }}
        ></Table>
      </div>
    </div>
  );
};

CommunityContent.propTypes = {};

export default CommunityContent;
