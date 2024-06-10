import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, DatePicker, Select, Radio } from "antd";
import dayjs from "dayjs";
import { Scheduler } from "@aldabil/react-scheduler";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import { ILocalArrowLeft } from "../../components/svg/arrow_left";
import Modal from "react-modal";
import { CloseOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getListCategoryApi } from "../../api/category";
import useEventMutate from "../../hooks/useMutate/useEventMutate";
import { getEventApi } from "../../api/event";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ReactQuill from "react-quill";
import bgSchedule from "../../../public/bgSchedule1.png";
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
    overflowY: "scroll",
    maxHeight: "100vh",
  },
};

const SchedulerPage = (props) => {
  const account = useGetFetchQuery(["accountProfile"]);
  const [value, setValue] = useState("");
  const [valueCourse, setValueCourse] = useState(1); // 1: Free, 2: Fee
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeFee, setActiveFee] = useState(1);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { createEvent } = useEventMutate();
  const { RangePicker } = DatePicker;
  function debouncedSetValue(value) {
    setTimeout(() => {
      setValue(value);
    }, 3000);
  }
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
              start: dayjs(item.startDate, "DD/MM/YYYY HH:mm:ss").toDate(),
              end: dayjs(item.endDate, "DD/MM/YYYY HH:mm:ss").toDate(),
              startTime: dayjs(item.startDate, "DD/MM/YYYY HH:mm:ss").toDate(),
              endTime: dayjs(item.endDate, "DD/MM/YYYY HH:mm:ss").toDate(),
              slots: item.slots,
              fee: item.fee,
              expertName: item.expert.expertFullName,
              expertAvatar: item.expert.expertAvatar,
              color: item.fee === 0 ? "green" : "pink",
              textColor: "white",
            };
          });
          return tempData;
        }
        console.log("res.data: ", res.data);
        return [];
      }),
  });

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleSwitchKindOfCourse = (e) => {
    if (e.target.value === 2) {
      setActiveFee(false);
      setValueCourse(2);
    } else {
      setActiveFee(true);
      setValueCourse(1);
      form.setFieldsValue({ fee: 0 });
    }
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  const onFinish = (values) => {
    const data = {
      title: values.title,
      description: values.description,
      slots: 0,
      fee: 0,
      joinUrl: values.joinUrl,
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
      <div className="">
        <img src={bgSchedule} alt="" className="w-full h-full rounded-xl" />
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
        view="month"
        agenda={false}
        week={{
          startHour: 6,
          endHour: 22,
          step: 60,
        }}
        day={{
          startHour: 6,
          endHour: 22,
          step: 60,
        }}
        editable={false}
        deletable={false}
        events={listEvent || []}
        id="main-scheduler"
      >
        {" "}
      </Scheduler>
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full "></div>
          <p className="text-base font-normal font-roboto">Free</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="w-3 h-3 bg-[#ffc0cb] rounded-full "></div>
          <p className="text-base font-normal font-roboto">Fee</p>
        </div>
      </div>
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
                {/* <TextArea rows={2} placeholder=" Description" allowClear /> */}
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={(value) => debouncedSetValue(value)}
                />
              </Form.Item>
              {/* <Form.Item
                label="Slots"
                name="slot"
              >
                <InputNumber
                  label="Slots"
                  placeholder="Slots"
                  min={1}
                  max={30}
                  className="w-full py-1"
                  disabled={activeFee}
                />
              </Form.Item> */}
              {/* <Form.Item>
                <Radio.Group
                  onChange={(e) => handleSwitchKindOfCourse(e)}
                  value={valueCourse}
                >
                  <Radio value={1}>Free</Radio>
                  <Radio value={2}>Fee</Radio>
                </Radio.Group>
              </Form.Item> */}
              {/* <Form.Item
                label="Fee"
                name="fee"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input fee!",
                //   },
                // ]}
              >
                <InputNumber
                  label="Fee"
                  placeholder="fee"
                  disabled={activeFee}
                  className="w-full py-1"
                />
              </Form.Item> */}
              <Form.Item
                label="Link online"
                name="joinUrl"
                rules={[
                  {
                    required: true,
                    message: "Please input link online for course!",
                  },
                ]}
              >
                <Input placeholder=" link online" />
              </Form.Item>
              <Form.Item
                label="Start Date - End Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please input start date - end date!",
                  },
                  () => ({
                    validator(_, value) {
                      const [startDate, endDate] = value;
                      const today = moment().startOf("day");

                      if (
                        startDate.isBefore(today) ||
                        endDate.isBefore(today)
                      ) {
                        return Promise.reject(
                          new Error(
                            "Start date and end date must be equal to or bigger than today!"
                          )
                        );
                      }

                      return Promise.resolve();
                    },
                  }),
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
