import Notification from "../../components/notification/notification";

const NotificationPage = () => {
  return (
    <div className="w-full">
      <div className="flex self-stretch justify-center w-full desktop:w-[760px]">
        <div className="flex flex-col w-full">
          <div className="flex flex-col backdrop-blur-[32px] sticky top-14 desktop:top-0 z-20">
            <div className="flex items-start self-stretch px-6 py-2 ">
              <p className="font-medium text-title font-roboto">Notification</p>
            </div>
            <div className="flex flex-col">
              <Notification />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
