import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEventDetailApi } from "../../api/event";
import { ILocalArrowLeft } from "../svg/arrow_left";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  ReadOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useEventMutate from "../../hooks/useMutate/useEventMutate";
dayjs.extend(customParseFormat);
const EventDetailContent = (props) => {
  const params = useParams();
  const { approveEvent, rejectEvent } = useEventMutate();
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState({});
  const { data: eventDetailQuery } = useQuery({
    queryKey: ["eventDetail", params.id],
    queryFn: () =>
      getEventDetailApi({ id: params.id }).then((res) => {
        setEventDetail(res.data);
        return res.data;
      }),
  });
  const handleApproveEvent = () => {
    approveEvent({ id: params.id }).then((res) => {
      setEventDetail({
        ...eventDetail,
        status: 1,
      });
    });
  };
  const handleRejectEvent = () => {
    rejectEvent({ id: params.id }).then((res) => {
      navigate("/events");
    });
  };
  console.log(eventDetail);
  console.log(
    dayjs(eventDetail?.startDate, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY")
  );
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "white",
        overflowY: "scroll",
        height: "100%",
      }}
      className="flex flex-col gap-4 "
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2 ">
          <ILocalArrowLeft fill="black" />
          <p
            className="text-base font-normal cursor-pointer font-roboto"
            onClick={() => navigate("/events")}
          >
            Back to schedule
          </p>
        </div>
        {eventDetail?.status === 0 && (
          <div className="flex flex-row gap-2">
            <div
              className="px-6 py-2 bg-green-400 cursor-pointer hover:bg-green-500 rounded-xl"
              onClick={() => handleApproveEvent()}
            >
              Approve
            </div>
            <div
              className="px-6 py-2 bg-red-400 cursor-pointer hover:bg-red-500 rounded-xl"
              onClick={() => handleRejectEvent()}
            >
              Reject
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center justify-center">
          <p className="text-base font-normal font-roboto">
            {eventDetail.title}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 ">
          <div className="flex items-center justify-center w-full h-full ">
            <img
              src={eventDetail?.expert?.expertAvatar}
              className="w-40 h-40 rounded-full "
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="flex flex-row gap-2">
              <UserOutlined />
              <p className="text-base font-normal font-roboto">
                {eventDetail?.expert?.expertFullName}
              </p>
            </div>
            <div className="flex flex-row gap-2 ">
              <MailOutlined />
              <p className="text-base font-normal font-roboto">
                {eventDetail?.expert?.expertEmail}
              </p>
            </div>
            <div className="flex flex-row gap-2 ">
              <PhoneOutlined />
              <p className="text-base font-normal font-roboto">
                {eventDetail?.expert?.phone}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 ">
          <div className="flex flex-row items-center justify-center">
            <p className="text-base font-medium font-roboto">Overview</p>
          </div>
          <div className="grid grid-flow-col grid-cols-[50%_50%]">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="grid grid-flow-col grid-cols-[10%_20%_70%]  w-[250px] right-0 ">
                <CalendarOutlined />
                <p className="text-base font-medium font-roboto">Date: </p>
                <p className="text-base font-normal font-roboto">
                  {dayjs(eventDetail.startDate, "DD/MM/YYYY HH:mm:ss").format(
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-center ">
            <p className="text-base font-medium font-roboto">Description</p>
          </div>
          <div className="">
            <div
              className="text-base font-normal font-roboto"
              dangerouslySetInnerHTML={{ __html: eventDetail?.description }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

EventDetailContent.propTypes = {};

export default EventDetailContent;
