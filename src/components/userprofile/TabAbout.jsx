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
  console.log(accountProfile);
  return (
    <div className="flex flex-col items-start gap-2 mt-4 ">
      <div className="flex flex-row justify-around w-full xl:justify-normal xl:items-start ">
        <p className=" xl:w-[240px] font-roboto text-sm font-normal text-light_surface_on_surface">
          Full name:
        </p>
        <p className="text-sm font-medium text-light_surface_on_surface font-roboto">
          {accountProfile?.data?.fullName}
        </p>
      </div>
      <div className="flex flex-row items-start justify-around w-full xl:justify-normal">
        <p className=" xl:w-[240px] font-roboto text-sm font-normal text-light_surface_on_surface">
          Date of birth:
        </p>
        <p className="text-sm font-medium text-light_surface_on_surface font-roboto">
          {handleConvertTime(accountProfile?.data?.dateOfBirth) ===
          "Invalid Date"
            ? "N/A"
            : handleConvertTime(accountProfile?.data?.dateOfBirth)}
        </p>
      </div>
      <div className="flex flex-row items-start justify-around w-full xl:justify-normal">
        <p className=" xl:w-[240px] font-roboto text-sm font-normal text-light_surface_on_surface">
          Phone number:
        </p>
        <p className="text-sm font-medium text-light_surface_on_surface font-roboto">
          {accountProfile?.data?.phone || "N/A"}
        </p>
      </div>
      {accountProfile?.data?.group?.kind === 3 && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-start justify-around w-full xl:justify-normal">
            <p className=" xl:w-[240px] font-roboto text-sm font-normal text-light_surface_on_surface">
              Hospital:
            </p>
            <p className="text-sm font-medium text-light_surface_on_surface font-roboto">
              {accountProfile?.data?.hospital?.categoryName +
                " , " +
                accountProfile?.data?.hospital?.categoryDescription}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-start justify-around w-full xl:justify-normal">
              <p className=" xl:w-[240px] font-roboto text-sm font-normal text-light_surface_on_surface">
                Hospital role:
              </p>
              <p className="text-sm font-medium text-light_surface_on_surface font-roboto">
                {accountProfile?.data?.hospitalRole?.categoryName}
              </p>
            </div>
            <div className="">
              <p className="text-[14px]">
                {accountProfile?.data?.hospitalRole?.categoryDescription}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start justify-around w-full xl:justify-normal">
            <p className=" xl:w-[240px] font-roboto text-sm font-normal text-light_surface_on_surface">
              Academic degree:
            </p>
            <p className="text-sm font-medium text-light_surface_on_surface font-roboto">
              {accountProfile?.data?.academicDegree?.categoryName +
                " , " +
                accountProfile?.data?.academicDegree?.categoryDescription}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-start justify-around w-full xl:justify-normal">
              <p className=" xl:w-[240px] font-roboto text-sm font-normal text-light_surface_on_surface">
                Department:
              </p>
              <p className="text-sm font-medium text-light_surface_on_surface font-roboto">
                {accountProfile?.data?.department?.categoryName}
              </p>
            </div>
            <div className="">
              <p className=" text-[14px]">
                {accountProfile?.data?.department?.categoryDescription}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
TabAbout.propTypes = {
  data: PropTypes.object.isRequired,
};
export default TabAbout;
