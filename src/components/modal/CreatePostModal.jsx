import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import AvtUser from "../shared/AvtUser";
import QuillEditor from "../shared/QuillEditor";
import { Select } from "antd";
import { useForm } from "react-hook-form";
import { useState } from "react";
import UsePost from "../../hooks/UsePost";

const CreatePostModal = (props) => {
  const { createPost } = UsePost();
  const [selectedKind, setSelectedKind] = useState("");
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const [contentError, setContentError] = useState(false);
  const onChange = (value) => {
    setSelectedKind(value);
    console.log(`selected ${value}`);
    console.log(selectedKind);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const {
    handleSubmit,
    // control,
    // formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      content: props.content ?? "",
    },
    mode: "onSubmit",
  });
  const handleCreatePost = (value) => {
    if (props.kind === 2) {
      const data = { ...value, kind: 2, privacy: 1 };
      createPost(data);
    }

    reset();
    props.handleClose();
  };
  const onSubmit = (values) => {
    const contentValue = values.content;
    if (
      !contentValue ||
      contentValue.trim() === "" ||
      contentValue.trim() === "<p><br></p>"
    ) {
      setContentError(true);
      return;
    }
    setContentError(false);
    if (props.kind === 2) {
      const data = { ...values, kind: 2, privacy: 1 };
      handleCreatePost(data);
    }
  };
  if (typeof document === "undefined")
    return <div className="createpostdetail"></div>;
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-5 createpostdetail ${
        props.open ? "" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute inset-0 bg-opacity-25 bg-modal overlay"
        onClick={props.handleClose}
      ></div>
      <form
        className="relative z-50 w-full shadow-modal bg-[#FFF8F8] px-6 pt-6 xl:p-6 gap-6 flex flex-col items-start modal-content max-w-[600px] h-[600px] rounded-[28px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full h-1">
          <div className="w-8 h-full rounded-[2px] m-auto bg-[#504348] opacity-40 xl:hidden "></div>
        </div>
        <div>
          <p className="text-2xl font-normal text-light_surface_on_surface font-roboto">
            New post
          </p>
        </div>
        <div className="w-full h-[1px] bg-[#F1DEE4]"></div>
        <div className="flex items-center gap-2 ">
          <AvtUser />
          <div className="xl:h-9 xl:w-[136px]">
            <p className="text-[#1F1A1C] font-medium items-center text-sm dark:text-[#CEC4C6] font-roboto">
              {props.fullname}
            </p>
            <p className="text-[#1F1A1C] font-normal text-xs dark:text-[#CEC4C6] font-roboto">
              {props.kind === 2 ? "User" : props.kind === 3 ? "Expert" : ""}
            </p>
          </div>
        </div>

        <div className={`${props.kind === 2 ? "hidden" : ""}`}>
          <Select
            showSearch
            placeholder="Select an option"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: "1",
                label: "Home",
              },
              {
                value: "2",
                label: "Forum",
              },
            ]}
          />
        </div>
        <div className="w-full h-full">
          <QuillEditor
            name="content"
            value={getValues("content")}
            onChange={(html) => setValue("content", html)}
            className="w-full h-full"
          />
        </div>
        {contentError && (
          <span className="w-full text-sm font-medium text-red-600 pointer-events-none ">
            This field is required
          </span>
        )}
        <div className="w-full h-[1px] bg-[#F1DEE4]"></div>
        <div className="flex items-center self-end gap-2">
          <button className="flex items-center h-10 px-3">
            <p
              className="text-sm font-normal font-roboto text-[#A73574]"
              onClick={props.handleClose}
            >
              Cancel
            </p>
          </button>
          <button className="flex items-center h-10 px-3" type="submit">
            <p className="text-sm font-normal font-roboto text-[#A73574]">
              Confirm
            </p>
          </button>
        </div>
      </form>
    </div>,
    document.querySelector("body")
  );
};

CreatePostModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  kind: PropTypes.number.isRequired,
};

export default CreatePostModal;
