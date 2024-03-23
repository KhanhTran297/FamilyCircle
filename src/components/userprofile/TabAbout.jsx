import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
const TabAbout = () => {
  const { profileId } = useParams();
  const accountProfile = useGetFetchQuery(["accountProfile", profileId]);
  const handleConvertTime = (date) => {
    const rawtime = dayjs(date, "DD/MM/YYYY");
    const formatTime = dayjs(rawtime["$d"]).format("DD/MM/YYYY");
    return formatTime;
  };
  return (
    <div className=" flex flex-col items-start gap-2 mt-4">
      <div className="flex flex-row justify-around xl:justify-normal w-full   xl:items-start ">
        <p className=" xl:w-[240px] font-roboto text-sm font-normal text-light_surface_on_surface">
          Fullname:
        </p>
        <p className=" text-light_surface_on_surface text-sm font-medium font-roboto">
          {accountProfile?.data?.fullName}
        </p>
      </div>
      <div className="flex flex-row xl:justify-normal justify-around w-full items-start">
        <p className=" xl:w-[240px] font-roboto text-sm font-normal text-light_surface_on_surface">
          Date of birth:
        </p>
        <p className=" text-light_surface_on_surface text-sm font-medium font-roboto">
          {handleConvertTime(accountProfile?.data?.dateOfBirth) ===
          "Invalid Date"
            ? "N/A"
            : handleConvertTime(accountProfile?.data?.dateOfBirth)}
        </p>
      </div>
      <div className="flex flex-row xl:justify-normal w-full justify-around items-start">
        <p className=" xl:w-[240px] font-roboto text-sm font-normal text-light_surface_on_surface">
          Phone number:
        </p>
        <p className=" text-light_surface_on_surface text-sm font-medium font-roboto">
          {accountProfile?.data?.phone || "N/A"}
        </p>
      </div>
    </div>
  );
};
TabAbout.propTypes = {
  data: PropTypes.object.isRequired,
};
export default TabAbout;
