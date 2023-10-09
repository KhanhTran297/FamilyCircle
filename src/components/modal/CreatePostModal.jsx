import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import AvtUser from "../shared/AvtUser";
import QuillEditor from "../shared/QuillEditor";
import { useForm } from "react-hook-form";
import { useState } from "react";
import UsePost from "../../hooks/UsePost";

const CreatePostModal = (props) => {
  const { createPost } = UsePost();
  const [isClosing, setIsClosing] = useState(false);
  const [contentError, setContentError] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      props.handleClose();
    }, 300);
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
    if (props.kind === 3) {
      const data = { ...value, kind: props.selectedKind, privacy: 1 };
      createPost(data);
    }
    reset();
    handleClose();
  };

  const onSubmit = (values) => {
    const contentValue = values.content;

    const textOnlyContent = contentValue.replace(/<[^>]*>/g, "");

    if (!textOnlyContent.trim()) {
      setContentError(true);
      return;
    }
    setContentError(false);
    if (props.kind === 2) {
      const data = { ...values, kind: 2, privacy: 1 };
      handleCreatePost(data);
    }
    if (props.kind === 3) {
      const data = { ...values, kind: props.selectedKind, privacy: 1 };
      handleCreatePost(data);
    }
  };

  if (typeof document === "undefined")
    return <div className="createpostdetail"></div>;
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 w-100vw h-100vh   createpostdetail ${
        props.open
          ? "translate-y-0 opacity-100 transition-transform duration-300 ease-in-out"
          : "translate-y-full opacity-0"
      } ${
        isClosing
          ? "translate-y-full opacity-0 transition-transform duration-300 ease-in-out"
          : ""
      }`}
    >
      {/* <div
        className="absolute inset-0 bg-opacity-25 bg-modal overlay"
        onClick={props.handleClose}
      ></div> */}

      <div className="flex items-center justify-center w-full px-6 shadow-tile h-14 bg-[#FFF8F8]">
        <p className="text-title text-light_surface_on_surface font-roboto">
          {props.selectedKind === "1"
            ? "New post to Home"
            : "New post to Forum"}
        </p>
      </div>
      <form
        className="relative z-50 w-full h-full shadow-modal bg-[#FFF8F8] px-6 pt-6 xl:p-0 flex flex-col items-start modal-content "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <div className="w-full h-1">
          <div className="w-8 h-full rounded-[2px] m-auto bg-[#504348] opacity-40 xl:hidden "></div>
        </div> */}

        <div className="flex items-start self-stretch justify-center flex-1 w-full h-full ">
          <div className="xl:w-[960px] flex-col flex py-6 gap-6 h-full ">
            <div className="flex w-full gap-2 ">
              <AvtUser />
              <div className="items-start flex-1 xl:h-9">
                <p className="w-full text-[#1F1A1C] font-medium items-center text-sm dark:text-[#CEC4C6] font-roboto">
                  {props.fullname}
                </p>
                <p className=" text-[#1F1A1C] font-normal text-xs dark:text-[#CEC4C6] font-roboto">
                  {props.kind === 2 ? "User" : props.kind === 3 ? "Expert" : ""}
                </p>
              </div>
              <div className="flex items-center self-end gap-2 max-w-[186px]">
                <button
                  className="flex items-center h-10 px-3 rounded-[36px] hover:bg-buttonHoverLight"
                  onClick={handleClose}
                >
                  <p className="text-sm font-medium font-roboto text-[#A73574] ">
                    Cancel
                  </p>
                </button>
                <button
                  className="flex items-center h-10 px-4 gap-[7px] rounded-[36px] bg-[#A73574] hover:buttonHover hover:shadow-buttonHover"
                  type="submit"
                >
                  <p className="text-sm font-medium font-roboto text-[#FFF] ">
                    Publish
                  </p>
                </button>
              </div>
            </div>
            <div className="w-full h-[80%]">
              <QuillEditor
                name="content"
                value={getValues("content")}
                onChange={(html) => setValue("content", html)}
                className="w-full h-full "
              />
            </div>
          </div>
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
  selectedKind: PropTypes.string.isRequired,
};

export default CreatePostModal;
