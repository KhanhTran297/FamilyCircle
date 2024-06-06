import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  ReadOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { ILocalArrowLeft } from "../../components/svg/arrow_left";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEventDetailApi } from "../../api/event";
import dayjs from "dayjs";
import FlowerButton from "../../components/shared/FlowerButton";
import Modal from "react-modal";
import {
  CloseOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Form, Input } from "antd";
import useEventMutate from "../../hooks/useMutate/useEventMutate";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
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
const EventDetailPage = (props) => {
  const navigate = useNavigate();
  const payOSConfig = {
    RETURN_URL: "https://familycircle.vercel.app/", // required
    ELEMENT_ID: "test", // required
    CHECKOUT_URL: "https://familycircle.vercel.app/schedule", // required
    onSuccess: (event) => {
      console.log("onSuccess: ", event);
      //TODO: Hành động sau khi người dùng thanh toán đơn hàng thành công
    },
    onCancel: (event) => {
      console.log("onCancel: ", event);
      //TODO: Hành động sau khi người dùng Hủy đơn hàng
    },
    onExit: (event) => {
      console.log("onExit: ", event);
      //TODO: Hành động sau khi người dùng tắt Pop up
    },
  };
  const account = useGetFetchQuery(["accountProfile"]);
  const param = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const { registerEvent } = useEventMutate();
  const { data: eventDetail } = useQuery({
    queryKey: ["eventDetail"],
    queryFn: () => getEventDetailApi({ id: param.id }).then((res) => res.data),
  });

  function openModal() {
    setIsOpen(true);
  }
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
      courseId: param.id,
      email: values.email,
      fullName: values.fullName,
      phone: values.phoneNumber,
    };
    registerEvent(data).then(() => {
      form.resetFields();
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col gap-8 py-3 ">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center">
          <div
            className="flex flex-row text-center cursor-pointer "
            onClick={() => navigate("/schedule")}
          >
            <ILocalArrowLeft fill="black" />
          </div>
          <div
            className="px-6 py-2 rounded-lg cursor-pointer w-max"
            onClick={() => navigate("/schedule")}
          >
            Back to schedule
          </div>
        </div>

        <div className="" onClick={() => openModal()}>
          <FlowerButton />
        </div>
      </div>
      <div className="flex flex-row justify-center text-center">
        <p className="text-base font-medium font-roboto">
          {eventDetail?.title}
        </p>
      </div>
      <div className="flex flex-col justify-center gap-6 pb-4 border shadow-modal rounded-xl bg-[#fff8f8]">
        <div className="flex flex-row justify-center">
          <div className="flex flex-row px-6 py-2 text-center bg-green-400 rounded-bl-xl rounded-br-xl">
            <p className="text-base font-normal font-roboto">
              General information of the class
            </p>
          </div>
        </div>
        <div className="grid grid-flow-col grid-cols-[50%_50%]">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="grid grid-flow-col grid-cols-[10%_20%_70%]  w-[250px] right-0 ">
              <CalendarOutlined />
              <p className="text-base font-medium font-roboto">Date: </p>
              <p className="text-base font-normal font-roboto">
                {dayjs(eventDetail?.startDate, "DD/MM/YYYY HH:mm:ss").format(
                  "DD/MM/YYYY"
                )}
              </p>
            </div>
            <div className="grid grid-flow-col grid-cols-[10%_20%_70%]  w-[250px] right-0">
              <ClockCircleOutlined />
              <p className="text-base font-medium font-roboto">Time: </p>
              <p className="text-base font-normal font-roboto">
                {dayjs(eventDetail?.startDate, "DD/MM/YYYY HH:mm:ss").format(
                  "HH:mm a"
                ) +
                  " - " +
                  dayjs(eventDetail?.endDate, "DD/MM/YYYY HH:mm:ss").format(
                    "HH:mm a"
                  )}
              </p>
            </div>
            <div className="grid grid-flow-col grid-cols-[10%_20%_70%]  w-[250px] right-0 ">
              <TeamOutlined />
              <p className="text-base font-medium font-roboto">Slot: </p>
              <p className="text-base font-normal font-roboto">
                {eventDetail?.slots}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="grid grid-flow-col grid-cols-[10%_20%_70%]  w-[250px] right-0">
              <ReadOutlined />
              <p className="text-base font-medium font-roboto">Topic: </p>
              <p className="text-base font-normal font-roboto">
                {eventDetail?.topic?.categoryName}
              </p>
            </div>
            <div className="grid grid-flow-col grid-cols-[10%_20%_70%]  w-[250px] right-0">
              <DollarOutlined />
              <p className="text-base font-medium font-roboto">Fee: </p>
              <p className="text-base font-normal font-roboto">
                {eventDetail?.fee} Vnd
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 pb-4 border rounded-xl shadow-modal bg-[#fff8f8] ">
        <div className="flex flex-row justify-center bg-[#fff8f8]">
          <div className="flex flex-row px-6 py-2 text-center bg-pink-300 rounded-bl-xl rounded-br-xl">
            <p className="text-base font-medium text-black font-roboto">
              Class details
            </p>
          </div>
        </div>
        <div
          className="px-4 py-2 "
          dangerouslySetInnerHTML={{ __html: eventDetail?.description }}
        ></div>
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
            <p className="text-base font-normal font-roboto">Form register</p>
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
                label="Fullname"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your fullName!",
                  },
                ]}
              >
                <Input placeholder=" FullName" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                label="Phone number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input phone Number!",
                  },
                  {
                    pattern: /^[0-9\b]+$/,
                    message: "Enter a valid phone number!",
                  },
                ]}
              >
                <Input placeholder=" phone number" prefix={<PhoneOutlined />} />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input placeholder=" email" prefix={<MailOutlined />} />
              </Form.Item>
              <div className="">
                <div
                  className="px-6 py-2 text-center text-white bg-pink-400 cursor-pointer rounded-xl hover:bg-pink-500"
                  onClick={() => form.submit()}
                >
                  Register
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
      <div className="" id="test"></div>
    </div>
  );
};

EventDetailPage.propTypes = {};

export default EventDetailPage;
