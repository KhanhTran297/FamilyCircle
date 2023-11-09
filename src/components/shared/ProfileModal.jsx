import { ILocalProfileButton } from "../svg/profile_button";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
const ProfileModal = ({ handleCancel, handleOpenEditingModal }) => {
  const handleConvertTime = (date) => {
    const rawtime = dayjs(date, "DD/MM/YYYY");
    const formatTime = dayjs(rawtime["$d"]).format("DD/MM/YYYY");
    return formatTime;
  };
  const { profileId } = useParams();

  const accountProfile = useGetFetchQuery(["accountProfile", profileId]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className=" flex flex-row items-center gap-6 self-stretch">
        <div className=" flex flex-col items-start gap-2 flex-[1_0_0]">
          <p className=" text-light_surface_on_surface font-roboto text-base font-medium">
            Full name
          </p>
          <p className=" text-light_surface_on_surface font-roboto text-sm font-normal">
            {accountProfile?.data?.fullName}
          </p>
        </div>
        <div
          className=" cursor-pointer hover:opacity-60"
          onClick={() =>
            handleOpenEditingModal(accountProfile?.data?.fullName, "fullname")
          }
        >
          <ILocalProfileButton className=" flex w-10 h-10 p-[10px] flex-col justify-center items-center gap-[10px]" />
        </div>
      </div>
      <div className=" flex items-center gap-6 self-stretch">
        <div className=" flex flex-col items-start gap-2 flex-[1_0_0]">
          <p className=" text-light_surface_on_surface font-roboto text-base font-medium">
            Bio
          </p>
          <p className=" text-light_surface_on_surface font-roboto text-sm font-normal">
            {accountProfile?.data?.bio || "N/A"}
          </p>
        </div>
        <div
          onClick={() => {
            handleOpenEditingModal(accountProfile?.data?.bio, "bio");
          }}
          className="cursor-pointer hover:opacity-60"
        >
          <ILocalProfileButton className=" flex w-10 h-10 p-[10px] flex-col justify-center items-center gap-[10px]" />
        </div>
      </div>
      <div className=" w-full h-[1px] bg-[#F1DEE4]"></div>
      <div className=" flex items-center gap-6 self-stretch">
        <div className=" flex flex-col items-start gap-2 flex-[1_0_0]">
          <p className=" text-light_surface_on_surface font-roboto text-base font-medium">
            Date of Birth
          </p>
          <p className=" text-light_surface_on_surface font-roboto text-sm font-normal">
            {handleConvertTime(accountProfile?.data?.dateOfBirth) ===
            "Invalid Date"
              ? "N/A"
              : handleConvertTime(accountProfile?.data?.dateOfBirth)}
          </p>
        </div>
        <div
          onClick={() =>
            handleOpenEditingModal(
              accountProfile?.data?.dateOfBirth,
              "dateOfBirth"
            )
          }
          className=" cursor-pointer hover:opacity-6"
        >
          <ILocalProfileButton className=" flex w-10 h-10 p-[10px] flex-col justify-center items-center gap-[10px]" />
        </div>
      </div>
      <div className=" flex items-center gap-6 self-stretch">
        <div className=" flex flex-col items-start gap-2 flex-[1_0_0]">
          <p className=" text-light_surface_on_surface font-roboto text-base font-medium">
            Phone
          </p>
          <p className=" text-light_surface_on_surface font-roboto text-sm font-normal">
            {accountProfile?.data?.phone || "N/A"}
          </p>
        </div>
        <div
          onClick={() => {
            handleOpenEditingModal(accountProfile?.data?.phone, "phone");
          }}
          className=" cursor-pointer hover:opacity-60"
        >
          <ILocalProfileButton className=" flex w-10 h-10 p-[10px] flex-col justify-center items-center gap-[10px]" />
        </div>
      </div>
      <div className=" w-full h-[1px] bg-[#F1DEE4]"></div>
      <div className=" flex justify-end items-center gap-2 self-stretch">
        <div
          className="flex h-10 pl-3 pr-3 items-center rounded-[36px] cursor-pointer hover:bg-menu"
          onClick={() => handleCancel()}
        >
          <p className=" font-roboto text-sm font-medium text-button-submit-light">
            Close
          </p>
        </div>
      </div>
    </div>
  );
};
ProfileModal.propTypes = {
  data: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleOpenEditingModal: PropTypes.func.isRequired,
};
export default ProfileModal;
