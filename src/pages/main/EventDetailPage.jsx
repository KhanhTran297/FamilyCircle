import React from "react";
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

const EventDetailPage = (props) => {
  const navigate = useNavigate();
  const param = useParams();

  const { data: eventDetail } = useQuery({
    queryKey: ["eventDetail"],
    queryFn: () => getEventDetailApi({ id: param.id }).then((res) => res.data),
  });

  return (
    <div className="flex flex-col gap-8 py-3 ">
      <div className="flex flex-row items-center ">
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
      <div className="flex flex-row justify-center text-center">
        <p className="text-base font-medium font-roboto">
          {eventDetail?.title}
        </p>
      </div>
      <div className="flex flex-col justify-center gap-6 pb-4 border shadow-modal rounded-xl">
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
      <div className="flex flex-col gap-6 pb-4 border rounded-xl shadow-modal ">
        <div className="flex flex-row justify-center">
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
    </div>
  );
};

EventDetailPage.propTypes = {};

export default EventDetailPage;
