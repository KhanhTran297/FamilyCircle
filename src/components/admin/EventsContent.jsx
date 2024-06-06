import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Scheduler } from "@aldabil/react-scheduler";
import { useQuery } from "@tanstack/react-query";
import { getEventApi } from "../../api/event";
import dayjs from "dayjs";
import useEventMutate from "../../hooks/useMutate/useEventMutate";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import useNotificationMutate from "../../hooks/useMutate/useNotificationMutate";
import { getDatabase, ref, child, get } from "firebase/database";
const EventsContent = (props) => {
  const [listEventState, setListEventState] = useState([]);
  const [idEvent, setIdEvent] = useState(null);
  const [eventDetail, setEventDetail] = useState();
  const navigate = useNavigate();
  const { approveEvent, deleteEvent, rejectEvent } = useEventMutate();
  const { pushNotification } = useNotificationMutate();
  const dbRef = ref(getDatabase());

  const { data: listEvent } = useQuery({
    queryKey: ["listEvent"],
    queryFn: async () =>
      getEventApi().then((res) => {
        if (res?.data?.totalElements > 0) {
          const tempData = res?.data?.content?.map((item) => {
            return {
              event_id: item.id,
              title: item.title,
              description: item.description,
              start: dayjs(item.startDate, "DD/MM/YYYY HH:mm:ss").toDate(),
              status: item.status,
              fee: item.fee,
              end: dayjs(item.endDate, "DD/MM/YYYY HH:mm:ss").toDate(),
              startTime: dayjs(item.startDate, "DD/MM/YYYY HH:mm:ss").toDate(),
              endTime: dayjs(item.endDate, "DD/MM/YYYY HH:mm:ss").toDate(),
              slots: item.slots,
              expertName: item.expert.expertFullName,
              expertAvatar: item.expert.expertAvatar,
              expertId: item.expert.id,
              color: item.status === 1 ? "pink" : "red",
              textColor: "white",
            };
          });
          setListEventState(tempData);
          return tempData;
        }
        return res.data;
      }),
  });

  const handleApproveEvent = (id) => {
    // approveEvent({ id: id }).then((res) => {
    //   setListEventState(
    //     listEventState.map((item) => {
    //       if (item.event_id === id) {
    //         return {
    //           ...item,
    //           status: 1,
    //           color: "pink",
    //         };
    //       }
    //       return item;
    //     })
    //   );
    // });
    approveEvent({ id: id }).then((res) => {
      setListEventState((prevState) =>
        prevState.map(
          (item) => {
            if (item.event_id === id) {
              setEventDetail(item);
              return {
                ...item,
                status: 1,
                color: "pink",
              };
            } else {
              return item;
            }
          }
          // item.event_id === id ? { ...item, status: 1, color: "pink" } : item
        )
      );
    });
  };
  const handleRejectEvent = (id) => {
    rejectEvent({ id: id }).then((res) => {
      setListEventState((prevState) =>
        prevState.filter((event) => event.event_id !== id)
      ); //
    });
  };
  const handleDeleteEvent = (id) => {
    deleteEvent(id).then((res) => {
      setListEventState((prevState) =>
        prevState.filter((event) => event.event_id !== id)
      ); // Update state using callback
    });
  };
  useEffect(() => {
    if (eventDetail !== null) {
      get(child(dbRef, `users/${eventDetail?.expertId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            pushNotification({
              message: {
                token: snapshot.val().token,
                notification: {
                  title: "Your event has been approved",
                  body: `Your event ${eventDetail?.title} has been approved by admin`,
                },
                // webpush: {
                //   fcm_options: {
                //     link: "http://localhost:5173.com",
                //   },
                // },
              },
            });
          } else {
            console.log("No data available");
          }
        })
        .then(() => {
          setEventDetail(null);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [eventDetail]);
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "white",
        overflowY: "scroll",
        height: "100%",
      }}
    >
      <div className=" mb-2 pb-2 border-b-[1px] border-black border-solid overflow-y-scroll"></div>
      <div className="h-full overflow-y-scroll">
        <Scheduler
          view="month"
          events={listEventState || []}
          editable={false}
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
          viewerExtraComponent={(fields, event) => {
            return (
              <div className="flex flex-col gap-2 pb-4">
                <div className="flex flex-row items-center gap-2">
                  <div className="w-8 h-8 rounded-full ">
                    <img
                      src={event.expertAvatar}
                      alt=""
                      className="w-full h-full rounded-full "
                    />
                  </div>
                  <div className="text-sm text-black font-roboto">
                    {event.expertName}
                  </div>
                </div>
                <div className="flex flex-row gap-2 border-b border-b-[#ccc] ">
                  <p className="text-sm font-medium font-roboto">Fee:</p>
                  <p className="text-sm font-normal font-roboto">
                    {event.fee} Vnd
                  </p>
                </div>
                <div className="flex flex-row justify-end gap-2 mt-3">
                  {event.status === 0 && (
                    <div
                      className="px-6 py-2 bg-green-400 cursor-pointer rounded-xl hover:bg-green-500"
                      onClick={() => handleApproveEvent(event.event_id)}
                    >
                      Approve
                    </div>
                  )}
                  <div
                    className="px-6 py-2 bg-yellow-400 cursor-pointer rounded-xl hover:bg-yellow-500"
                    onClick={() => navigate(`/events/${event.event_id}`)}
                  >
                    More
                  </div>
                  {event.status === 0 && (
                    <div
                      className="px-6 py-2 bg-red-400 cursor-pointer rounded-xl hover:bg-red-500"
                      onClick={() => handleRejectEvent(event.event_id)}
                    >
                      Reject
                    </div>
                  )}
                </div>
              </div>
            );
          }}
          eventRenderer={({ event, ...props }) => {
            return (
              <div
                className={`flex flex-col h-full gap-2 px-2 pt-1 `}
                style={{ backgroundColor: event.color }}
                {...props}
              >
                <div className="flex flex-row items-center gap-2 ">
                  <div className="w-5 h-5 rounded-full ">
                    <img
                      src={event.expertAvatar}
                      alt=""
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <div className="">
                    <p className="text-sm text-white font-roboto">
                      {event.title}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-1">
                  <div className="text-sm text-white font-roboto">
                    {event.start.toLocaleTimeString("en-US", {
                      timeStyle: "short",
                    })}
                  </div>
                  <div className="text-sm text-white font-roboto">-</div>
                  <div className="text-sm text-white font-roboto">
                    {event.end.toLocaleTimeString("en-US", {
                      timeStyle: "short",
                    })}
                  </div>
                </div>
              </div>
            );
          }}
          onEventClick={(event) => {
            setIdEvent(event.event_id);
          }}
          onDelete={(Idevent) => {
            handleDeleteEvent(Idevent);
          }}
        />
      </div>
    </div>
  );
};

EventsContent.propTypes = {};

export default EventsContent;
