import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHospitalApi,
  deleteCategoryApi,
  getListCategoryApi,
  updateCategoryApi,
} from "../../api/category";
import { Button, Dropdown, Form, Input, Upload, message } from "antd";
import { ILocalMore } from "../svg/more";
import Modal from "react-modal";
import { UploadOutlined } from "@ant-design/icons";
import { uploadImageApi } from "../../api/file";
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
const TopicContent = (props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataTopic, setDataTopic] = useState(null);
  const [topicId, setTopicId] = useState(null);
  const [typeModal, setTypeModal] = useState("create");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgTopic, setImgTopic] = useState("");
  const showModalDelete = () => {
    setIsModalDeleteOpen(true);
  };
  const handleOkDelete = () => {
    setIsModalDeleteOpen(false);
  };
  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };
  function closeModal() {
    form.resetFields();
    setImgTopic(null);
    setTypeModal(1);
    setIsModalOpen(false);
  }
  function afterOpenModal() {}

  const queryClient = useQueryClient();
  const { mutateAsync: updateTopic, isLoading: isLoadingUpdateCommunity } =
    useMutation({
      mutationKey: ["updateTopic"],
      mutationFn: updateCategoryApi,
      onSuccess: () => {
        message.success("Update topic success");
        queryClient.invalidateQueries("listTopic");
      },
    });
  const { mutateAsync: createTopic, isLoading: isLoadingCreateCommunity } =
    useMutation({
      mutationKey: ["createTopic"],
      mutationFn: createHospitalApi,
      onSuccess: () => {
        message.success("Create topic successfully");
        queryClient.invalidateQueries("listTopic");
      },
    });
  const { mutateAsync: uploadImage, isLoading: isLoadingUploadImage } =
    useMutation({
      mutationKey: ["uploadImage"],
      mutationFn: uploadImageApi,
      onSuccess: (res) => {
        setImgTopic(res.data.filePath);
      },
    });
  const { mutateAsync: deleteTopic } = useMutation({
    mutationKey: ["deletetopic"],
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      message.success("Delete topic successfully");
      queryClient.invalidateQueries("listTopic");
    },
  });
  const handleSubmit = (value) => {
    if (imgTopic !== null) {
      if (typeModal === "create") {
        createTopic({
          categoryName: value.categoryName,
          categoryDescription: value.categoryDescription,
          categoryImage: imgTopic,
          categoryKind: 6,
          categoryOrdering: 1,
          parentId: id,
          status: 1,
        }).then(() => {
          form.resetFields();
          closeModal();
        });
      } else {
        updateTopic({
          id: topicId,
          categoryName: value.categoryName,
          categoryDescription: value.categoryDescription,
          categoryImage: imgTopic,
          categoryKind: 5,
          categoryOrdering: 1,
          parentId: id,
          status: 1,
        }).then(() => {
          setTypeModal("create");
          form.resetFields();
          closeModal();
        });
      }
    } else {
      message.error("Please upload image");
    }
  };
  const items = [
    {
      label: (
        <p className=" font-roboto" onClick={() => handleSetForm(2, dataTopic)}>
          Edit
        </p>
      ),
      key: "0",
    },
    {
      label: (
        <p className=" font-roboto" onClick={() => showModalDelete()}>
          Delete
        </p>
      ),

      key: "1",
    },
  ];
  const { data: listTopic } = useQuery({
    queryKey: ["listTopic", id],
    queryFn: () =>
      getListCategoryApi({ parentId: id }).then((res) => {
        return res.data;
      }),
  });

  const { data: detailCommunity } = useQuery({
    queryKey: ["getCommunity", id],
    queryFn: () =>
      getListCategoryApi({ id: id }).then((res) => {
        return res.data.content[0];
      }),
  });

  const handleSetForm = (checkValue, values) => {
    setDataTopic(values);
    if (checkValue === 1) {
      setTypeModal("create");
      setIsModalOpen(true);
    } else {
      setTypeModal("update");
      setImgTopic(values.categoryImage);
      setTopicId(values.id);
      setIsModalOpen(true);
      form.setFieldValue("categoryName", values.categoryName);
      form.setFieldValue("categoryDescription", values.categoryDescription);
    }
  };
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        height: "100%",
        background: "white",
      }}
      className="grid grid-flow-col "
    >
      <div className="flex flex-col gap-2 w-full border-r border-[#ccc]">
        <div className=" w-full h-[300px] object-cover">
          <img
            src={detailCommunity?.categoryImage}
            alt=""
            className="object-scale-down w-full h-full "
          />
        </div>
        <div className="w-full ">
          <div className="flex flex-row gap-2 ">
            <p className="font-normal  font-roboto">Name:</p>
            <p>{detailCommunity?.categoryName}</p>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="font-normal  font-roboto">Description:</p>
            <p>{detailCommunity?.categoryDescription}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 pl-2 ">
        <div className="flex flex-row justify-between">
          <p>List topics</p>
          <Button type="default" onClick={() => setIsModalOpen(true)}>
            Add topic
          </Button>
        </div>
        <div className="flex flex-col">
          {listTopic?.content?.map(
            (item, index) => (
              console.log(item),
              (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between gap-2"
                >
                  <div className="flex flex-row items-center gap-2 ">
                    <div className="w-10 h-10 rounded-full ">
                      <img
                        src={item.categoryImage}
                        alt=""
                        className="object-scale-down w-full h-full rounded-full "
                      />
                    </div>
                    <p>{item.categoryName}</p>
                  </div>

                  <div className="cursor-pointer ">
                    <Dropdown
                      menu={{
                        items,
                      }}
                      trigger={["click"]}
                    >
                      <div
                        className=""
                        onClick={() => {
                          setDataTopic(item);
                        }}
                      >
                        <ILocalMore fill="black" />
                      </div>
                    </Dropdown>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
      <Modal
        title="Confirm Delete"
        isOpen={isModalDeleteOpen}
        onRequestClose={handleOkDelete}
        style={customStyles}
        onCancel={handleCancelDelete}
      >
        <div className="flex flex-col gap-2 ">
          <div className="">
            <p>Confirm delete</p>
          </div>
          <div className="">Are you sure to delete this topic?</div>
          <div className="flex flex-row justify-end gap-1 ">
            <Button type="primary" danger onClick={handleOkDelete}>
              cancle
            </Button>
            <Button
              type="default"
              onClick={() =>
                deleteTopic(dataTopic.id).then(() => handleOkDelete())
              }
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col w-full h-full gap-2 ">
          <div className=" border-b border-b-[#ccc]">
            <p className="text-lg font-roboto">
              {typeModal === "create" ? "Create new topic" : "Update topic"}
            </p>
          </div>
          <div className="flex flex-row gap-4 ">
            <div className="flex flex-col items-center justify-center gap-2">
              <p>Topic Image</p>
              <div className=" bg-slate-400 w-[250px] h-[250px] rounded-md ">
                <img
                  src={imgTopic ? imgTopic : "https://via.placeholder.com/250"}
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
                  {typeModal === "create" ? "Click to Upload" : "Update Image"}
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
                  label="Topic Name"
                  name="categoryName"
                  className="items-center w-full "
                  rules={[
                    {
                      required: true,
                      message: "Please input topicName!",
                    },
                  ]}
                >
                  <Input className=" w-[300px]" />
                </Form.Item>

                <Form.Item
                  label="Topic Description"
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
                  typeModal === "create"
                    ? isLoadingCreateCommunity
                    : isLoadingUpdateCommunity
                }
              >
                {typeModal === "create" ? "Create" : "Update"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

TopicContent.propTypes = {};

export default TopicContent;
