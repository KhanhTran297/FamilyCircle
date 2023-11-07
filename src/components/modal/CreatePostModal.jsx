import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import AvtUser from "../shared/AvtUser";
import QuillEditor from "../shared/QuillEditor";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { Form, Modal } from "antd";
import usePostMutate from "../../hooks/useMutate/usePostMutate";

const CreatePostModal = (props) => {
  const { createPost, updatePost } = usePostMutate();
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
  };
  const handleClose = () => {
    setIsClosing(true);
    setIsModalOpen(false);
    setTimeout(() => {
      setIsClosing(false);
      props.handleClose();
    }, 300);
    console.log("close");
  };
  const { handleSubmit, reset, getValues, setValue } = useForm({
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
    console.log(props.selectedKind);
    if (props.kind === 2) {
      const data = { ...value, kind: 2, privacy: 1, status: 1 };
      createPost(data);
    }
    if (props.kind === 3) {
      if (props.selectedKind == 1) {
        const data = {
          ...value,
          kind: 1,
          privacy: 1,
          status: 0,
        };
        createPost(data);
      } else {
        const data = {
          ...value,
          kind: 2,
          privacy: 1,
          status: 1,
        };
        createPost(data);
      }
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
      className={`fixed inset-0 z-[100] w-100vw h-100vh pt-[72px] desktop:pt-0 items-center justify-center flex  createpostdetail ${
        props.open ? " " : "invisible opacity-0"
      } `}
    >
      <div
        className="absolute inset-0 bg-modal"
        onClick={props.handleClose}
      ></div>
      {/* <div className="relative z-10 w-full bg-white p-6 modal-content max-w-[650px] h-[720px]">
        <div className="flex flex-col py-6 items-center gap-[10px] self-stretch bg-[#FFF8F8] rounded-tl-3xl rounded-tr-3xl desktop:hidden">
          <div className="w-8 h-1 bg-[#504348] bg-opacity-40 rounded-[2px]"></div>
        </div> */}
      {/* <div className="flex items-center desktop:justify-center  px-6 desktop:shadow-tile desktop:h-14 h-8 bg-[#FFF8F8]">
          <p className="text-title text-light_surface_on_surface font-roboto">
            {props.isUpdate
              ? "Edit Post"
              : props.selectedKind === "1"
              ? "New post to Home"
              : "New post to Forum"}
          </p>
        </div> */}
      <div className="relative z-10 w-full h-full bg-[#FFF8F8] desktop:p-6 px-6 desktop:max-w-[840px] desktop:h-[720px] desktop:shadow-modal  desktop:rounded-[28px]  rounded-t-[28px]">
        <form
          className=" w-full h-full  bg-[#FFF8F8] px-6 mb-6   desktop:p-0 flex flex-col items-start  "
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
        >
          {/* <div className="w-full h-1">
          <div className="w-8 h-full rounded-[2px] m-auto bg-[#504348] opacity-40 desktop:hidden "></div>
        </div> */}

          <div className="flex items-start self-stretch justify-center flex-1 w-full ">
            <div className="relative flex flex-col w-full h-full gap-3 desktop:gap-4 desktop:py-0">
              <div className="flex flex-col w-full ">
                <div className="py-6 desktop:hidden">
                  <div className="w-full h-1">
                    <div className="w-8 h-full rounded-[2px] m-auto bg-[#504348] opacity-40  "></div>
                  </div>
                </div>
                <p className="font-normal tex-2xl text-light_surface_on_surface font-roboto">
                  {props.isUpdate
                    ? "Edit Post"
                    : props.selectedKind === "1"
                    ? "New post to Home"
                    : "New post to Forum"}
                </p>
              </div>
              <div className="w-full h-[1px] bg-[#F1DEE4] desktop:hidden"></div>
              <div className="flex flex-col w-full h-full gap-6 ">
                <div className="flex w-full gap-2 ">
                  <AvtUser />
                  <div className="items-start flex-1 desktop:h-9">
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
                </div>
                <div className="relative w-full desktop:h-[500px] h-[500px]">
                  <QuillEditor
                    name="content"
                    value={getValues("content")}
                    onChange={handleContentChange}
                  />
                </div>
              </div>
              <div className="fixed z-50 flex items-center self-end  gap-2 mt-3 bottom-3 desktop:bottom-auto desktop:mt-0  right-6 desktop:right-0 desktop:top-[0.5px] desktop:items-start desktop:absolute ">
                <button
                  className="flex items-center h-10 px-3 rounded-[36px] hover:bg-buttonHoverLight"
                  onClick={() => handleClose()}
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
          </div>
        </form>
        {/* </div> */}
      </div>
    </div>,
    document.querySelector("body")
  );
};

CreatePostModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fullname: PropTypes.string,
  kind: PropTypes.number,
  selectedKind: PropTypes.string,
};

export default CreatePostModal;
