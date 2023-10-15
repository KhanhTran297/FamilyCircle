import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import AvtUser from "../shared/AvtUser";
import QuillEditor from "../shared/QuillEditor";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import UsePost from "../../hooks/UsePost";
import { Form, Modal } from "antd";

const CreatePostModal = (props) => {
  const { createPost, updatePost } = UsePost();
  const [isClosing, setIsClosing] = useState(false);
  const [contentError, setContentError] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    console.log(props.id);
  };
  const handleClose = () => {
    setIsClosing(true);
    setIsModalOpen(false);
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
  const handleContentChange = (html) => {
    const textOnlyContent = html.replace(/<[^>]*>/g, "");

    if (!textOnlyContent.trim()) {
      setContentError(true);
    } else {
      setContentError(false);
    }
    setValue("content", html);
  };

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
  const handleUpdatePost = (id, value) => {
    const data = { ...value, id: id };
    updatePost(data);
    handleClose();
  };
  const onSubmit = (values) => {
    if (contentError) {
      return;
    }
    if (props.isUpdate === true) {
      const data = { ...values };
      handleUpdatePost(props.id, data);
    } else if (props.isUpdate === false && props.kind === 2) {
      const data = { ...values, kind: 2, privacy: 1 };
      handleCreatePost(data);
    } else if (props.isUpdate === false && props.kind === 3) {
      const data = { ...values, kind: props.selectedKind, privacy: 1 };
      handleCreatePost(data);
    }
  };

  if (typeof document === "undefined")
    return <div className="createpostdetail"></div>;
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-[100] w-100vw h-100vh pt-[72px] xl:pt-0   createpostdetail ${
        props.open
          ? "translate-y-0 opacity-100 transition-transform duration-300 ease-in-out"
          : "translate-y-full opacity-0"
      } ${
        isClosing
          ? "translate-y-full opacity-0 transition-transform duration-300 ease-in-out"
          : ""
      }`}
    >
      <div className="w-full h-[52px] flex flex-col py-6 items-center gap-[10px] self-stretch bg-[#FFF8F8] rounded-tl-3xl rounded-tr-3xl xl:hidden">
        <div className="w-8 h-1 bg-[#504348] bg-opacity-40 rounded-[2px]"></div>
      </div>
      <div className="flex items-center xl:justify-center w-full px-6 xl:shadow-tile xl:h-14 h-8 bg-[#FFF8F8]">
        <p className="text-title text-light_surface_on_surface font-roboto">
          {props.isUpdate
            ? "Edit Post"
            : props.selectedKind === "1"
            ? "New post to Home"
            : "New post to Forum"}
        </p>
      </div>
      <div className="w-full h-[100%]">
        <form
          className=" w-full h-full xl:shadow-modal bg-[#FFF8F8] px-6 mb-6  xl:pt-6 pt-3 xl:p-0 flex flex-col items-start modal-content  "
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
        >
          {/* <div className="w-full h-1">
          <div className="w-8 h-full rounded-[2px] m-auto bg-[#504348] opacity-40 xl:hidden "></div>
        </div> */}

          <div className="flex items-start self-stretch justify-center flex-1 w-full pb-3 ">
            <div className="xl:w-[960px] xl:max-h-100vh flex-col flex py-3 xl:py-6 gap-6 h-full border-t-[1px] w-full border-t-[#F1DEE4] xl:border-0 ">
              <div className="flex w-full gap-2 ">
                <AvtUser />
                <div className="items-start flex-1 xl:h-9">
                  <p className="w-full text-[#1F1A1C] font-medium items-center text-sm dark:text-[#CEC4C6] font-roboto">
                    {props.fullname}
                  </p>
                  <p className=" text-[#1F1A1C] font-normal text-xs dark:text-[#CEC4C6] font-roboto">
                    {props.kind === 2
                      ? "User"
                      : props.kind === 3
                      ? "Expert"
                      : ""}
                  </p>
                </div>
                <div className="  flex items-center self-end gap-2 max-w-[186px] bottom-3 xl:bottom-auto xl:mt-0 mt-3 fixed xl:relative z-50 right-6 xl:right-auto">
                  <button
                    className="flex items-center h-10 px-3 rounded-[36px] hover:bg-buttonHoverLight"
                    onClick={handleClose}
                  >
                    <p className="text-sm font-medium font-roboto text-[#A73574] ">
                      Cancel
                    </p>
                  </button>
                  <button
                    className={`flex items-center h-10 px-4 gap-[7px] rounded-[36px]  hover:buttonHover hover:shadow-buttonHover ${
                      contentError ? "bg-disableButton" : "bg-[#A73574]"
                    }`}
                    onClick={showModal}
                    type="button"
                    disabled={contentError}
                  >
                    <p
                      className={`text-sm font-medium font-roboto  ${
                        contentError ? "text-disableButton" : "text-[#FFF]"
                      }`}
                    >
                      {props.isUpdate ? "Edit" : "Publish"}
                    </p>
                  </button>
                  <Modal
                    title={
                      <p className="text-[#1F1A1C]  text-titleModal">
                        {props.isUpdate ? "Edit post" : "Publish post"}
                      </p>
                    }
                    open={isModalOpen}
                    onOk={() => {
                      formRef.current.requestSubmit();
                    }}
                    onCancel={handleCancel}
                    okText={props.isUpdate ? "Edit" : "Publish"}
                    centered
                    style={{
                      fontFamily: "Roboto, sans-serif",
                    }}
                    className="publish"
                  >
                    {props.isUpdate
                      ? "Are you sure to update this post"
                      : "Are you sure to publish this post"}
                  </Modal>
                </div>
              </div>
              <div className="w-full">
                <QuillEditor
                  name="content"
                  value={getValues("content")}
                  onChange={handleContentChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
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
  content: PropTypes.string.isRequired,
};

export default CreatePostModal;
