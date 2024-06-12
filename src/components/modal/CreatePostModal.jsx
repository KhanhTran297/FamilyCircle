import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import AvtUser from "../shared/AvtUser";
import QuillEditor from "../shared/QuillEditor";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import usePostMutate from "../../hooks/useMutate/usePostMutate";
import { useQuery } from "@tanstack/react-query";
import { getListCategoryApi } from "../../api/category";
const CreatePostModal = (props) => {
  const { createPost, updatePost } = usePostMutate();
  const [isClosing, setIsClosing] = useState(false);
  const [listCommunity, setListCommunity] = useState([]);
  const [listTopic, setListTopic] = useState([]);
  const [listTopicSelected, setListTopicSelected] = useState([]);
  const [contentError, setContentError] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempContent, setTempContent] = useState("");
  const [tempTitle, setTempTitle] = useState("Untitled");
  const [communityId, setCommunityId] = useState(props.community?.id || null);
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
  const { refetch: getListCommunity } = useQuery({
    queryKey: ["getListCommunity", props.open],
    queryFn: () =>
      getListCategoryApi({ kind: 5 }).then((res) => {
        const newData = res.data.content.map((item) => {
          return { value: item.id, label: item.categoryName };
        });
        setListCommunity(newData);
        return res.data.content;
      }),
  });

  const { data } = useQuery({
    queryKey: ["getListTopic", communityId],
    queryFn: () =>
      getListCategoryApi({ parentId: communityId }).then((res) => {
        if (res?.data?.totalElements !== 0 && communityId !== null) {
          const newData = res?.data?.content?.map((item) => {
            return { value: item.id, label: item.categoryName };
          });
          setListTopic(newData);
          return res.data.content;
        } else {
          setListTopic([]);
          return [];
        }
      }),
  });

  const onChange = (value) => {
    setCommunityId(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
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
    setTempTitle(event.target.value);
  };

  const handleBlur = () => {
    setEditState(0);
    if (!title.trim()) {
      setTitle("Untitled");
    }
    setTempTitle(title);
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

    // if (props.selectedKind === "1") {
    //   return title === "Untitled" || contentError;
    // }
    if (communityId === null) {
      return true;
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
      if (!textOnlyContent.trim()) {
        setContentError(true);
      } else {
        setContentError(false);
      }
      setValue("content", html);
    }
    setTempContent(html);
    setTempTitle(getValues("title"));
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
        setTitle("Untitled");
        reset();
        setListTopicSelected([]);
        setCommunityId(null);
      }, 300);
    }
  };

  const handleCreatePost = (value) => {
    // if (props.kind === 2) {
    //   const data = { ...value, kind: 2, privacy: 1, status: 1 };
    //   createPost(data);
    // }
    // console.log("value:", value);
    // const data = { ...value, kind: 2, privacy: 1, status: 1 };
    createPost(value);
    // if (props.kind === 3) {
    //   if (props.selectedKind === "1") {
    //     const data = {
    //       ...value,
    //       kind: 1,
    //       privacy: 1,
    //       status: 0,
    //     };
    //     createPost(data);
    //   } else {
    //     const data = {
    //       ...value,
    //       kind: 2,
    //       privacy: 1,
    //       status: 1,
    //     };
    //     createPost(data);
    //   }
    // }
  };
  const handleUpdatePost = (id, value) => {
    const data = { ...value, id: id };

    updatePost(data);
  };
  const onSubmit = (values) => {
    // if (
    //   (props.selectedKind === "2" && contentError) ||
    //   isClosing ||
    //   (props.selectedKind === "1" && title === "Untitled" && contentError)
    // ) {
    //   return;
    // }

    if (props.isUpdate === true) {
      const data = {
        ...values,
        // communityId: communityId,
        topics: listTopicSelected,
      };
      handleUpdatePost(props.id, data);
      handleClose();
      setIsModalOpen(false);
      console.log("cancel");
    } else {
      const data = {
        ...values,
        status: 0,
        communityId: communityId,
        privacy: 1,
        topics: listTopicSelected,
      };
      handleCreatePost(data);
      handleClose();
      setIsModalOpen(false);
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
    if (initialCharacterCount === 0) {
      setContentError(true);
    } else {
      setContentError(false);
    }
    // if (
    //   initialCharacterCount === 0 ||
    //   (props.selectedKind === "2" && initialCharacterCount > 250)
    // ) {
    //   setContentError(true);
    // } else {
    //   setContentError(false);
    // }
  }, [props.content]);
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
                  {props.isUpdate ? "Edit Post" : "New post to Home"}
                </p>
              </div>
              <div className="w-full h-[1px] bg-[#F1DEE4] desktop:hidden"></div>
              <div className="flex flex-col w-full h-full gap-2 ">
                <div className="flex w-full gap-2 ">
                  <AvtUser imageUrl={props.avatar} />
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
                <div className="text-base font-roboto text-[red]  ">
                  Please note that the post must be valid, free from profanity,
                  profanity, or images
                </div>
                <div className="flex flex-row justify-around gap-2">
                  <div className="flex flex-row items-center flex-1 gap-2">
                    <div className="">
                      <p className="text-sm font-roboto"> Post to community:</p>
                    </div>
                    <div className="w-full">
                      <Select
                        showSearch
                        placeholder="Select community"
                        optionFilterProp="children"
                        value={communityId || undefined}
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={listCommunity}
                        style={{ width: "100%" }}
                        disabled={props.isUpdate}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row items-center flex-1 gap-2">
                    <div className="">
                      <p className="text-sm font-roboto">Choose topics :</p>
                    </div>
                    <div className="w-full ">
                      <Select
                        mode="multiple"
                        placeholder="Select Topics"
                        value={listTopicSelected}
                        onChange={(value) => setListTopicSelected(value)}
                        style={{
                          width: "100%",
                        }}
                        options={listTopic}
                      />
                    </div>
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
                <div className="text-sm text-gray-600 ">
                  {titleCharCount}/120
                </div>
                {/* Ham check phai co title  */}
                {/* {props.selectedKind === "1" && title === "Untitled" && (
                  <div className="text-left text-red-500 ">
                    Title cannot be empty.
                  </div>
                )} */}

                <div className="relative w-full min-h-[350px] max-h-[400px]">
                  <QuillEditor
                    name="content"
                    value={getValues("content")}
                    onChange={handleContentChange}
                    // selectedKind={props.selectedKind}
                  />
                </div>
                {/* {(props.kind === 2 || props.selectedKind === "2") && (
                  <div className="relative mt-10 text-sm text-gray-600">
                    {wordCount}/250 (Limit 250)
                  </div>
                )} */}
              </div>
              <div className="fixed z-50 flex items-center self-end  gap-2 mt-3 bottom-3 desktop:bottom-auto desktop:mt-0  right-6 desktop:right-0 desktop:top-[0.5px] desktop:items-start desktop:absolute ">
                <div
                  className="flex items-center h-10 px-3 rounded-[36px] hover:bg-buttonHoverLight hover:cursor-pointer"
                  onClick={() => handleClose()}
                >
                  <p className="text-sm font-medium font-roboto text-[#A73574] ">
                    Cancel
                  </p>
                </div>
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
                    ? "Are you sure to update this post? Please note that the post must be valid, free from profanity, profanity, or images"
                    : "Are you sure to publish this post? Please note that the post must be valid, free from profanity, profanity, or images"}
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
  // community: PropTypes.object,
  // selectedKind: PropTypes.string,
};

export default CreatePostModal;
