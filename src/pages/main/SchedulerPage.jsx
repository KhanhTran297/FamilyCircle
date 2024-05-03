import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { Scheduler } from "@aldabil/react-scheduler";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import { ILocalArrowLeft } from "../../components/svg/arrow_left";
import Modal from "react-modal";
import { CloseOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useQuery } from "@tanstack/react-query";
import { getListCategoryApi } from "../../api/category";
import useEventMutate from "../../hooks/useMutate/useEventMutate";
import { getEventApi } from "../../api/event";
import { Navigate, useNavigate } from "react-router-dom";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
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

const SchedulerPage = (props) => {
  const account = useGetFetchQuery(["accountProfile"]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { createEvent } = useEventMutate();
  const { RangePicker } = DatePicker;
  function openModal() {
    setIsOpen(true);
  }
  //Get list topic
  const { data: listTopic } = useQuery({
    queryKey: ["listTopic"],
    queryFn: async () =>
      getListCategoryApi({ kind: 6 }).then((res) => {
        if (res?.data?.totalElements > 0) {
          const tempData = res?.data?.content.map((item) => {
            return {
              label: (
                <div className="flex flex-row gap-2">
                  <div className="w-10 h-10 rounded-full ">
                    <img
                      src={item.categoryImage}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex items-center font-normal font-roboto">
                    {item.categoryName}
                  </div>
                </div>
              ),
              value: item.id,
            };
          });
          return tempData;
        }
        return res.data;
      }),
  });
  //Get list event
  const { data: listEvent } = useQuery({
    queryKey: ["listEvent"],
    queryFn: async () =>
      getEventApi({ status: 1 }).then((res) => {
        if (res?.data?.totalElements > 0) {
          const tempData = res?.data?.content?.map((item) => {
            return {
              event_id: item.id,
              title: item.title,
              description: item.description,
              start: new Date(
                dayjs(item.startDate).format("DD/MM/YYYY HH:mm:ss")
              ),
              end: new Date(dayjs(item.endDate).format("DD/MM/YYYY HH:mm:ss")),
              startTime: new Date(item.startDate),
              endTime: new Date(item.endDate),
              slots: item.slots,
              fee: item.fee,
              expertName: item.expert.expertFullName,
              expertAvatar: item.expert.expertAvatar,
              color: "pink",
              textColor: "white",
            };
          });
          return tempData;
        }
        return res.data;
      }),
  });

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  const onFinish = (values) => {
    // console.log(
    //   "Success:",
    //   // dayjs(values.date[0]["$d"]).format("dd/MM/yyyy HH:mm:ss")
    //   values.date[0]
    // );
    const data = {
      title: values.title,
      description: values.description,
      slots: values.slot,
      fee: values.fee,
      startDate: dayjs(values.date[0]).format("DD/MM/YYYY HH:mm:ss"),
      endDate: dayjs(values.date[1]).format("DD/MM/YYYY HH:mm:ss"),
      topicId: values.topic,
      expertId: account?.data?.id,
      status: 0,
    };
    createEvent(data).then(() => {
      form.resetFields();
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const calendarRefMU = useRef(null);
  return (
    <div className="flex flex-col gap-2 pb-3">
      <div className="flex flex-row items-center justify-between mt-3">
        <div className="flex items-center " onClick={() => history.back()}>
          <ILocalArrowLeft fill="black" />
        </div>
        {account?.data?.kind === 3 && (
          <div
            className="px-6 py-2 text-white bg-pink-400 cursor-pointer rounded-xl font-roboto hover:bg-pink-500"
            onClick={() => openModal()}
          >
            Create
          </div>
        )}
      </div>
      <Scheduler
        ref={calendarRefMU}
        viewerExtraComponent={(fields, event) => {
          return (
            <div className="flex flex-col gap-2 py-2">
              <div className="flex flex-row items-center gap-2 text-center">
                <div className="w-10 h-10 rounded-full ">
                  <img
                    src={event.expertAvatar}
                    className="w-full h-full rounded-full "
                    alt=""
                  />
                </div>
                <div className="flex flex-row items-center ">
                  <div className="text-sm font-roboto">{event.expertName}</div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 ">
                <div className="text-lg font-medium font-roboto">Slots:</div>
                <div className="text-sm font-normal font-roboto">
                  {event.slots}
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 ">
                <div className="text-lg font-medium font-roboto">Fee:</div>
                <div className="text-sm font-normal font-roboto">
                  {event.fee} Vnd
                </div>
              </div>
              <div className="flex flex-row justify-center">
                <div
                  className="px-3 py-2 text-white bg-pink-300 rounded-lg cursor-pointer hover:bg-pink-400"
                  onClick={() => navigate(`/schedule/${event.event_id}`)}
                >
                  {" "}
                  More and Register
                </div>
              </div>
            </div>
          );
        }}
        editable={false}
        deletable={false}
        events={listEvent || []}
        id="main-scheduler"
      >
        {" "}
      </Scheduler>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col gap-2 w-[600px]">
          <div className="flex flex-row justify-between border-b border-b-[#ccc] pb-2">
            <p className="text-base font-normal font-roboto">
              Create new event
            </p>
            <div className="cursor-pointer " onClick={() => closeModal()}>
              <CloseOutlined />
            </div>
          </div>
          <div className="">
            <Form
              form={form}
              name="basic"
              // labelCol={{
              //   span: 6,
              // }}
              // wrapperCol={{
              //   span: 18,
              // }}
              initialValues={{
                remember: true,
              }}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input title event!",
                  },
                ]}
              >
                <Input placeholder=" Title" />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input description!",
                  },
                ]}
              >
                <TextArea rows={2} placeholder=" Description" allowClear />
              </Form.Item>
              <Form.Item
                label="Slots"
                name="slot"
                rules={[
                  {
                    required: true,
                    message: "Please input slots!",
                  },
                ]}
              >
                <InputNumber
                  label="Slots"
                  placeholder="Slots"
                  min={1}
                  max={30}
                  className="w-full py-1"
                />
              </Form.Item>
              <Form.Item
                label="Fee"
                name="fee"
                rules={[
                  {
                    required: true,
                    message: "Please input fee!",
                  },
                ]}
              >
                <InputNumber
                  label="Fee"
                  placeholder="fee"
                  min={50000}
                  className="w-full py-1"
                />
              </Form.Item>
              <Form.Item
                label="Start Date - End Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please input start date - end date!",
                  },
                ]}
              >
                <RangePicker
                  showTime={{
                    format: "HH:mm",
                  }}
                  format="DD/MM/YYYY HH:mm"
                  onChange={(value, dateString) => {
                    console.log("Selected Time: ", value);
                    console.log("Formatted Selected Time: ", dateString);
                  }}
                  className="w-full py-1"
                  onOk={onOk}
                />
              </Form.Item>
              <Form.Item
                label="Topic"
                name="topic"
                rules={[
                  {
                    required: true,
                    message: "Please choose topic!",
                  },
                ]}
              >
                <Select
                  options={listTopic}
                  size="large"
                  allowClear
                  placeholder="Choose topic"
                />
              </Form.Item>
              {/* <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item> */}
              <div className="">
                <div
                  className="px-6 py-2 text-center text-white bg-pink-400 cursor-pointer rounded-xl hover:bg-pink-500"
                  onClick={() => form.submit()}
                >
                  Create
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

SchedulerPage.propTypes = {};

export default SchedulerPage;
