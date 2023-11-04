import { DatePicker, Form, Input, message } from "antd";
import { ILocalProfileButton } from "../svg/profile_button";
import TextArea from "antd/es/input/TextArea";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { ILocalCalender } from "../svg/calender";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfileApi } from "../../api/account";
import { editExpertAccountApi } from "../../api/expert";
import { useParams } from "react-router-dom";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
const EditingModal = ({
  handleCancel,
  handleCloseEditingModal,
  initValue,
  type,
}) => {
  const [form] = Form.useForm();
  const { profileId } = useParams();
  const accountProfile = useGetFetchQuery(["accountProfile", profileId]);
  var tempdata = {
    avatarPath: accountProfile?.data?.avatar,
    bio: accountProfile?.data?.bio,
    dateOfBirth: accountProfile?.data?.dateOfBirth,
    fullName: accountProfile?.data?.fullname,
    phone: accountProfile?.data?.phone,
  };
  const queryClient = useQueryClient();
  const { mutateAsync: editUserAccount } = useMutation({
    mutationFn: editProfileApi,
    onSuccess: (res) => {
      queryClient.invalidateQueries("accountProfile");
      message.success("Edit profile successfully");
    },
  });
  const { mutateAsync: editExpertAccount } = useMutation({
    mutationFn: editExpertAccountApi,
    onSuccess: (data) => {
      queryClient.setQueryData("accountProfile", data);
      message.success("Edit profile successfully");
    },
  });
  const handleSubmit = async (values) => {
    await handleConvertData(values).then(() => {
      if (accountProfile?.data?.kind === 2) {
        editUserAccount(tempdata).then(() => handleCloseEditingModal());
      } else {
        editExpertAccount(tempdata).then(() => handleCloseEditingModal());
      }
    });
  };
  const handleConvertData = async (values) => {
    if (type === "dateOfBirth") {
      const formatUserDayOfBirth = dayjs(values.dateOfBirth["$d"]).format(
        "DD/MM/YYYY HH:mm:ss"
      );
      tempdata.dateOfBirth = formatUserDayOfBirth;
    } else if (type === "fullname") {
      tempdata.fullName = values.fullname;
    } else if (type === "bio") {
      tempdata.bio = values.bio;
    } else {
      tempdata.phone = values.phone;
    }
  };
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className=" flex items-center gap-4">
        <ILocalProfileButton className=" flex w-10 h-10 p-[10px] flex-col justify-center gap-[10px]" />
        <p className=" text-light_surface_on_surface font-roboto text-base font-medium">
          Edit {type}
        </p>
      </div>
      <div className="">
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{ type: initValue }}
        >
          {type === "fullname" && (
            <Form.Item
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input defaultValue={initValue} size="large" allowClear />
            </Form.Item>
          )}
          {type === "bio" && (
            <Form.Item name="bio">
              <Input.TextArea
                showCount
                maxLength={240}
                size="large"
                defaultValue={initValue}
                allowClear
              />
            </Form.Item>
          )}
          {type === "phone" && (
            <Form.Item
              name="phone"
              validateDebounce={1000}
              rules={[
                {
                  min: 10,
                  message: "Phone must be 10 number",
                },
                {
                  pattern: /^[0-9]*$/, // Regular expression to allow only numeric input
                  message: "Please enter a valid phone number!",
                },
                {
                  required: true,
                  message: "Please input your phonenumber!",
                },
              ]}
            >
              <Input defaultValue={initValue} size="large" allowClear />
            </Form.Item>
          )}
          {type === "dateOfBirth" && (
            <Form.Item
              name="dateOfBirth"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your date of birth!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const selectedDate = dayjs(value);
                    const currentDate = dayjs();

                    if (selectedDate.isBefore(currentDate)) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "Please select a valid date of birth!"
                    );
                  },
                }),
              ]}
              rootClassName="w-full"
            >
              <DatePicker
                //   defaultPickerValue={initValue}
                //   defaultValue={initValue}
                prefix={<ILocalCalender className="mr-3" />}
                suffixIcon={<ILocalCalender className="mr-3" />}
                allowClear
                size="large"
                className="flex h-[56px] pt-2 pb-2 pl-3 pr-3 w-full  rounded-[12px] border-solid border-[1px] border-[#504348]"
                format={dateFormatList}
              />
            </Form.Item>
          )}
        </Form>

        {/* <TextArea
          placeholder="Phone number"
          autoSize
          size="large"
          allowClear
          defaultValue={initValue}
        /> */}
      </div>
      <div className=" w-full h-[1px] bg-[#F1DEE4]"></div>
      <div className=" flex justify-end items-center gap-2 self-stretch">
        <div
          className="flex h-10 pl-3 pr-3 items-center rounded-[36px] cursor-pointer hover:bg-menu"
          onClick={() => handleCloseEditingModal()}
        >
          <p className=" font-roboto text-sm font-medium text-button-submit-light">
            back
          </p>
        </div>
        <div
          className="flex h-10 pl-3 pr-3 items-center rounded-[36px] cursor-pointer hover:bg-menu "
          onClick={() => form.submit()}
        >
          <p className=" font-roboto text-sm font-medium text-button-submit-light">
            Save
          </p>
        </div>
      </div>
    </div>
  );
};
EditingModal.propTypes = {
  data: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleCloseEditingModal: PropTypes.func.isRequired,
  initValue: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default EditingModal;
