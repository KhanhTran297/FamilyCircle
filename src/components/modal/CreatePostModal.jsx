import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import AvtUser from "../shared/AvtUser";
import QuillEditor from "../shared/QuillEditor";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Form, Input, Modal } from "antd";
import usePostMutate from "../../hooks/useMutate/usePostMutate";

const CreatePostModal = (props) => {
  const { createPost, updatePost } = usePostMutate();
  const [isClosing, setIsClosing] = useState(false);
  const [contentError, setContentError] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempContent, setTempContent] = useState("");
  const [tempTitle, setTempTitle] = useState("Untitled");

  const [editState, setEditState] = useState(0); // 0: không chỉnh sửa, 1: đã nhấn, 2: đang chỉnh sửa
  const [title, setTitle] = useState("Untitled");
  const [hover, setHover] = useState(false);
  const [titleCharCount, setTitleCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const { handleSubmit, reset, getValues, setValue } = useForm({
    defaultValues: {
      content: props?.content ? props.content : "",
      title: props?.title ? props.title : "Untitled",
    },
    mode: "onSubmit",
  });
  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleClick = () => {
    setEditState((prev) => {
      // Nếu ở trạng thái 0, chuyển sang 1 để đổi màu, từ 1 sang 2 để chỉnh sửa
      return prev === 0 ? 1 : 2;
    });
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
    setTitleCharCount(event.target.value.length);
    setValue("title", event.target.value);
  };

  const handleBlur = () => {
    setEditState(0);
    if (!title.trim()) {
      setTitle("Untitled");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEditState(0);
    }
  };
  const checkIsSubmitDisabled = () => {
    if (props.isUpdate) {
      return getValues("title") === "Untitled" || contentError;
    }

    if (props.selectedKind === "1") {
      return title === "Untitled" || contentError;
    }
    return contentError;
  };

  const formRef = useRef();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleContentChange = (html) => {
    // console.log("HTML in handleContentChange:", html);
    if (html !== undefined && html !== null) {
      const textOnlyContent = html.replace(/<[^>]*>/g, "");
      const characterCount = textOnlyContent.trim().length; // Count characters in the text content

      // You can now use this character count as needed
      setWordCount(characterCount);
      if (
        !textOnlyContent.trim() ||
        ((props.kind === 2 ||
          (props.kind === 3 && props.selectedKind === "2")) &&
          characterCount > 250)
      ) {
        setContentError(true);
      } else {
        setContentError(false);
      }
      setValue("content", html);
    }
    // console.log("getValues('content'):", getValues("content"));
  };
  const handleClose = () => {
    if (!isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        props.handleClose();
        setIsClosing(false);
        setValue("content", tempContent); // Đặt lại giá trị của content
        setContentError(true); // Đặt lại trạng thái contentError
        setValue("title", tempTitle);
      }, 300);
      console.log("close");
    }
  };

  const handleCreatePost = (value) => {
    console.log(props.selectedKind);

    if (props.kind === 2) {
      const data = { ...value, kind: 2, privacy: 1, status: 1 };
      createPost(data);
    }
    if (props.kind === 3) {
      if (props.selectedKind === "1") {
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
  };
  const handleUpdatePost = (id, value) => {
    const data = { ...value, id: id };

    updatePost(data);
  };
  const onSubmit = (values) => {
    if (
      (props.selectedKind === "2" && contentError) ||
      isClosing ||
      (props.selectedKind === "1" && title === "Untitled" && contentError)
    ) {
      return;
    }

    if (props.isUpdate === true) {
      const data = { ...values };
      handleUpdatePost(props.id, data);
      handleClose();
      setIsModalOpen(false);
    } else if (props.isUpdate === false && props.kind === 2) {
      const data = { ...values, kind: 2, privacy: 1 };
      handleCreatePost(data);

      handleClose();
      setIsModalOpen(false);
      reset();
    } else if (props.isUpdate === false && props.kind === 3) {
      const data = { ...values, kind: props.selectedKind, privacy: 1 };
      handleCreatePost(data);
      handleClose();
      setIsModalOpen(false);
      reset();
    }
  };
  useEffect(() => {
    const initialTitle = props?.title || "Untitled";
    setTitle(initialTitle);

    setValue("content", props?.content || "");
    setValue("title", props?.title === "Untitled" ? undefined : props?.title);
  }, [props?.content, props?.title, setValue]);
  useEffect(() => {
    if (props.open) {
      setTempContent(getValues("content"));
      setTempTitle(getValues("title"));
    }
  }, [props.open, getValues]);
  useEffect(() => {
    const initialTextOnlyContent = (props?.content || "").replace(
      /<[^>]*>/g,
      ""
    );
    const initialCharacterCount = initialTextOnlyContent.trim().length;

    if (
      initialCharacterCount === 0 ||
      (props.selectedKind === "2" && initialCharacterCount > 250)
    ) {
      setContentError(true);
    } else {
      setContentError(false);
    }
  }, [props.content, props.selectedKind]);
  if (typeof document === "undefined")
    return <div className="createpostdetail"></div>;
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-[100] w-100vw h-100vh pt-[72px] desktop:pt-0 items-center justify-center flex  createpostdetail ${
        props.open ? " " : "invisible opacity-0"
      } `}
    >
      <div className="absolute inset-0 bg-modal" onClick={handleClose}></div>
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
              <div className="flex flex-col w-full h-full gap-2 ">
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
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleClick}
                  className={`p-2 inline-flex items-center gap-2  rounded-xl   max-w-full bg-[#FFF8F8] ${
                    hover && editState === 0 ? "bg-menuOption   " : ""
                  } ${
                    editState != 0 ? " border-[#A73574] border-[1px]  " : ""
                  } `}
                >
                  {editState === 2 ? (
                    <input
                      type="text"
                      value={getValues("title")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                      className="outline-none w-full bg-[#FFF8F8] font-roboto text-title font-medium text-[#1F1A1C]"
                      autoFocus
                      maxLength={120}
                      name="title"
                    />
                  ) : (
                    <span
                      className={`${
                        editState === 1 ? "bg-[#00658D] " : ""
                      }  overflow-hidden whitespace-pre-wrap break-words`}
                    >
                      <p
                        className={`${
                          editState === 1 ? "text-[#FFFFFF]" : ""
                        } font-roboto text-title font-medium text-[#1F1A1C] `}
                      >
                        {title}
                      </p>
                    </span>
                  )}

                  {/* Hiển thị thông báo nếu trống */}
                </div>
                <div className=" text-sm text-gray-600">
                  {titleCharCount}/120
                </div>
                {props.selectedKind === "1" && title === "Untitled" && (
                  <div className=" text-red-500 text-left">
                    Title cannot be empty.
                  </div>
                )}

                <div className="relative w-full min-h-[350px] max-h-[400px]">
                  <QuillEditor
                    name="content"
                    value={getValues("content")}
                    onChange={handleContentChange}
                    selectedKind={props.selectedKind}
                  />
                </div>
                {(props.kind === 2 || props.selectedKind === "2") && (
                  <div className="relative mt-10 text-sm text-gray-600">
                    {wordCount}/250 (Limit 250)
                  </div>
                )}
              </div>
              <div className="fixed z-50 flex items-center self-end  gap-2 mt-3 bottom-3 desktop:bottom-auto desktop:mt-0  right-6 desktop:right-0 desktop:top-[0.5px] desktop:items-start desktop:absolute ">
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
                    checkIsSubmitDisabled()
                      ? "bg-disableButton"
                      : "bg-[#A73574]"
                  }`}
                  onClick={showModal}
                  type="button"
                  disabled={checkIsSubmitDisabled()}
                >
                  <p
                    className={`text-sm font-medium font-roboto  ${
                      checkIsSubmitDisabled()
                        ? "text-disableButton"
                        : "text-[#FFF]"
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
