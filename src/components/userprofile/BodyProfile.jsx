import { ILocalEdit } from "../svg/edit";
import PropTypes from "prop-types";
import TabProfile from "./TabProfile";
import { ILocalMessProfile } from "../svg/messProfile";
import { ILocalFollowProfile } from "../svg/followprofile";
import { useParams } from "react-router-dom";
import { Avatar, Upload, message } from "antd";
import { useState } from "react";
import ProfileModal from "../shared/ProfileModal";
import EditingModal from "../shared/EditingModal";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImageApi } from "../../api/file";
import ImgCrop from "antd-img-crop";
import { editProfileApi } from "../../api/account";
import { editExpertAccountApi } from "../../api/expert";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import useFollowMutate from "../../hooks/useMutate/useFollowMutate";
import useNotificationSocket from "../../hooks/useNotificationSocket";
import useNotificationMutate from "../../hooks/useMutate/useNotificationMutate";
import "./img.css";
// import EditingModal from "../shared/EditingModal";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const BodyProfile = () => {
  const { profileId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState("");
  const [text, setText] = useState("Following");
  const [color, setColor] = useState("#A73574");
  const [initValue, setInitValue] = useState("");

  const { createNotification, createAnnounce } = useNotificationMutate();

  const accountProfile = useGetFetchQuery(["accountProfile", profileId]);
  const myAccountProfile = useGetFetchQuery(["accountProfile"]);
  const accountProfile2 = useGetFetchQuery(["accountProfile"]);

  const accountProfileId = accountProfile2?.data?.id;
  const accountProfileFullname = accountProfile2?.data?.fullName;
  const accountProfileAvatar = accountProfile2?.data?.avatar;

  const socket = useNotificationSocket();
  const listFollowing = useGetFetchQuery(["listFollowingById", profileId]);
  const listFollower = useGetFetchQuery(["listFollowerById", profileId]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const checkFollowAlready = () => {
    const check = listFollower?.data?.content?.some((item) => {
      return item?.follower?.id === myAccountProfile?.data?.id;
    });
    if (check) {
      return true;
    }
    return false;
  };
  const handleOpenEditingModal = (value, type) => {
    handleSetInitvalue(value)
      .then(() => setIsEditing(true))
      .then(() => setType(type));
  };
  const handleCloseEditingModal = () => {
    handleSetInitvalue("").then(() => setIsEditing(false));
  };
  const handleSetInitvalue = async (value) => {
    setInitValue(value);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const queryClient = useQueryClient();
  const { mutateAsync: editUserAccount } = useMutation({
    mutationFn: editProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries("profileUserById");
      queryClient.invalidateQueries("accountProfile");
      message.success("Edit profile successfully");
    },
  });
  const { mutateAsync: editExpertAccount } = useMutation({
    mutationFn: editExpertAccountApi,
    onSuccess: () => {
      queryClient.invalidateQueries("accountProfile");
      message.success("Edit profile successfully");
    },
  });
  const { createFollow, unFollow } = useFollowMutate();
  const { mutateAsync: upLoadImage } = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: (res) => {
      if (accountProfile?.data?.kind === 3) {
        const newData = {
          avatarPath: res.data.filePath,
          bio: accountProfile?.data?.bio,
          dateOfBirth: accountProfile?.data?.dateOfBirth,
          fullName: accountProfile?.data?.fullName,
          phone: accountProfile?.data?.phone,
        };
        editExpertAccount(newData);
      } else {
        const newData = {
          avatarPath: res.data.filePath,
          bio: accountProfile?.data?.bio,
          dateOfBirth: accountProfile?.data?.dateOfBirth,
          fullName: accountProfile?.data?.fullName,
          phone: accountProfile?.data?.phone,
        };
        editUserAccount(newData);
      }
    },
    onError: () => {
      message.error("Upload image fail");
    },
  });

  const checkAccount = () => {
    if (myAccountProfile?.data?.id === accountProfile?.data?.id) {
      return true;
    }
    return false;
  };
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className=" flex flex-col pl-6 pr-6 gap-4 items-start self-stretch mt-[-64px]">
      <div className="flex items-end self-stretch justify-between ava">
        {/* <div className=" bg-[url('https://i.pinimg.com/236x/9b/b1/b9/9bb1b9aa5182b06836642a5f737fc5ea.jpg')] w-[128px] h-[128px] rounded-[1000px] bg-cover bg-no-repeat "></div> */}

        <div className=" w-32 h-32">
          {checkAccount() ? (
            <ImgCrop cropShape="round" modalOk="save">
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader "
                showUploadList={false}
                action={(value) => {
                  upLoadImage({ file: value, type: "avatar" });
                }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {accountProfile?.data?.avatar ? (
                  <Avatar
                    className=" w-full h-full"
                    src={accountProfile?.data?.avatar}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </ImgCrop>
          ) : (
            <Avatar
              className=" w-full h-full"
              src={accountProfile?.data?.avatar}
            />
          )}
        </div>
        {checkAccount() ? (
          <div className="h-10">
            <div
              onClick={() => showModal()}
              className="flex h-10 pr-4 pl-4 items-center gap-[7px] rounded-[36px] border border-solid border-button-submit-light cursor-pointer hover:bg-buttonHoverLight hover:border-button-submit-light"
            >
              <ILocalEdit fill="#A73574" className=" w-[18px] h-[18px]" />
              <p className="text-sm font-medium font-roboto text-button-submit-light">
                Edit Profile
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start h-10 gap-4 ">
            <div className=" flex h-10 pr-4 pl-4 items-center gap-[7px] rounded-[36px] border border-solid border-button-submit-light cursor-pointer hover:bg-buttonHoverLight hover:border-button-submit-light">
              <ILocalMessProfile className=" w-[18px] h-[18px]" />
              <p className="text-sm font-medium text-button-submit-light font-roboto">
                Message
              </p>
            </div>
            {checkFollowAlready() ? (
              <div
                onClick={() =>
                  unFollow({ accountId: profileId }).then(() => {
                    if (socket && socket.connected) {
                      socket.emit("send-notification-unfollow", {
                        followingId: profileId,
                      });
                    } else {
                      console.error("Socket not connected");
                    }
                  })
                }
                onMouseEnter={() => {
                  setText("Unfollow"), setColor("#BA1A1A");
                }}
                onMouseLeave={() => {
                  setText("Following"), setColor("#A73574");
                }}
                className="  flex h-10 pr-4 pl-4 items-center gap-[7px] rounded-[36px] border border-solid border-button-submit-light cursor-pointer hover:bg-bgErrorButton hover:border-[#BA1A1A]"
              >
                <p
                  className={` text-[${color}] font-roboto text-sm font-medium `}
                >
                  {text}
                </p>
              </div>
            ) : (
              <div
                onClick={() =>
                  createFollow({ accountId: profileId }).then(() => {
                    const content = ` started following you`;
                    const data2 = {
                      content: content,
                      objectId: accountProfileId,
                      kind: 5,
                    };
                    createNotification(data2)
                      .then((response) => {
                        if (socket && socket.connected) {
                          socket.emit("send-notification-new-follower", {
                            accountId: accountProfileId,
                            followerId: profileId,
                            id: response.data.id,
                            status: response.data.status,
                            createdDate: response.data.createdDate,
                            content: response.data.content,
                            kind: response.data.kind,
                            avatar: accountProfileAvatar,
                            fullname: accountProfileFullname,
                          });
                        } else {
                          console.error("Socket not connected");
                        }
                        const dataAnnounce = {
                          notificationId: response.data.id,
                          receivers: [profileId],
                        };
                        createAnnounce(dataAnnounce);
                      })
                      .catch((error) => {
                        console.error("Lỗi khi tạo thông báo:", error);
                      });
                  })
                }
                className=" flex h-10 pr-4 pl-4 items-center gap-[7px] rounded-[36px] bg-button-submit-light hover:bg-button-hover-light cursor-pointer hover:shadow-buttonHover"
              >
                <ILocalFollowProfile className=" w-[18px] h-[18px]" />
                <p className=" text-[#fff] font-roboto text-sm font-medium ">
                  Follow
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col items-start gap-[10px] self-stretch">
        <p className=" font-roboto text-[22px] leading-7 font-medium text-center text-light_surface_on_surface">
          {accountProfile?.data?.fullName}
        </p>
        {accountProfile?.data?.kind === 3 && (
          <div className="flex flex-col items-start ">
            <p>
              {accountProfile?.data?.hospitalRole?.categoryName +
                " of " +
                accountProfile?.data?.hospital?.categoryName}
            </p>
            <p>{accountProfile?.data?.academicDegree?.categoryName}</p>
            <p>{accountProfile?.data?.department?.categoryName}</p>
          </div>
        )}
      </div>
      <div className="">
        <p className="self-stretch text-sm font-normal text-light_surface_on_surface font-roboto">
          {accountProfile?.data?.bio}
        </p>
      </div>
      <div className="flex flex-row items-start gap-2 ">
        <div className="flex flex-row gap-2 ">
          <p className="text-sm font-extrabold text-center font-roboto text-light_surface_on_surface">
            {listFollowing?.data?.totalElements}
          </p>
          <p className="text-sm font-normal text-light_surface_on_surface font-roboto">
            {listFollowing?.data?.totalElements <= 1
              ? "following"
              : "followings"}
          </p>
        </div>
        <div className=" w-[1px] h-5 bg-[#F1DEE4]"></div>
        <div className="flex flex-row gap-2 ">
          <p className="text-sm font-extrabold text-center font-roboto text-light_surface_on_surface">
            {listFollower?.data?.totalElements}
          </p>
          <p className="text-sm font-normal text-light_surface_on_surface font-roboto">
            {listFollower?.data?.totalElements <= 1 ? "follower" : "followers"}
          </p>
        </div>
      </div>
      <TabProfile data={""} />
      {isModalOpen && (
        <div className=" fixed inset-0 z-[100] w-100vw h-100vh pt-[72px] desktop:pt-0 items-center justify-center flex bg-modal">
          <div className=" flex xl:w-[720px] p-6 flex-col items-start gap-6 flex-shrink-0 rounded-[28px] bg-editModal shadow-modal">
            <div
              className="flex flex-col items-start gap-4"
              onClick={showModal}
            >
              <p className="text-2xl font-normal font-roboto text-light_surface_on_surface">
                Edit Profile
              </p>
            </div>
            <div className=" w-full h-[1px] bg-[#F1DEE4]"></div>
            {isEditing ? (
              <EditingModal
                initValue={initValue}
                handleCancel={handleCancel}
                handleCloseEditingModal={handleCloseEditingModal}
                type={type}
              />
            ) : (
              <ProfileModal
                handleCancel={handleCancel}
                handleOpenEditingModal={handleOpenEditingModal}
              />
            )}
            {/* <div className="flex flex-col w-full gap-6">
              <div className="flex items-center gap-4 ">
                <ILocalProfileButton className=" flex w-10 h-10 p-[10px] flex-col justify-center gap-[10px]" />
                <p className="text-base font-medium text-light_surface_on_surface font-roboto">
                  Edit full name
                </p>
              </div>
              <div className="">
                <TextArea
                  placeholder="Autosize height based on content lines"
                  autoSize
                  size="large"
                  allowClear
                  defaultValue={data?.userFullName || data?.expertFullName}
                />
              </div>
              <div className=" w-full h-[1px] bg-[#F1DEE4]"></div>
              <div className="flex items-center self-stretch justify-end gap-2 ">
                <div
                  className="flex h-10 pl-3 pr-3 items-center rounded-[36px] cursor-pointer hover:bg-menu"
                  onClick={handleCancel}
                >
                  <p className="text-sm font-medium font-roboto text-button-submit-light">
                    back
                  </p>
                </div>
                <div
                  className="flex h-10 pl-3 pr-3 items-center rounded-[36px] cursor-pointer hover:bg-menu "
                  onClick={handleCancel}
                >
                  <p className="text-sm font-medium font-roboto text-button-submit-light">
                    Save
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};
BodyProfile.propTypes = {
  data: PropTypes.object.isRequired,
};
export default BodyProfile;
