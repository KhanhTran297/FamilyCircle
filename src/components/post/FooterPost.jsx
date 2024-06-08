import { useNavigate } from "react-router-dom";
import { ILocalComment } from "../svg/comment";
import { ILocalEmptyHeart } from "../svg/empty_heart";
import { ILocalHeart } from "../svg/heart";
import { ILocalShared } from "../svg/shared";
import { CopyOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";
import { message } from "antd";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
    transition: "all 0.5s ease-in-out",
  },
};
const FooterPost = (props) => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    setUrl(window.location.origin + `/post/${props.PostId}`);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    setTimeout(() => {
      setCopyStatus(false);
    }, 1000);
  }, [copyStatus]);
  return (
    <div className="flex flex-row w-full h-10 desktop:pl-12">
      {props.isLike ? (
        <button
          className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu"
          onClick={props.handleActionUnreact}
        >
          <div>
            <ILocalHeart fill="#A73574" className="w-[18px] h-[18px]" />
          </div>

          <p className="text-sm font-medium font-roboto text-[#A73574]">
            {props.reactCount}
          </p>
        </button>
      ) : (
        <button
          className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu"
          onClick={props.handleActionReact}
        >
          <div>
            <ILocalEmptyHeart className="" width="18px" height="18px" />
          </div>

          <p className="text-sm font-medium font-roboto text-[#A73574]">
            {props.reactCount}
          </p>
        </button>
      )}
      <div className="border-[1px] h-10 border-[#F1DEE4]"></div>
      <div
        className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu pl-3 pr-3"
        onClick={() => navigate(`/post/${props.id}`)}
      >
        <ILocalComment fill="#A73574" />
        <p className="text-sm font-medium font-roboto text-[#A73574]">
          {props?.countComment}
        </p>
      </div>
      <div className="border-[1px] h-10 border-[#F1DEE4]"></div>

      <div
        className="flex flex-row items-center justify-center flex-1 gap-2 rounded-[36px] hover:bg-menu pl-3 pr-3"
        onClick={() => openModal()}
      >
        <ILocalShared fill="#A73574" />
        <p className="text-sm font-medium font-roboto text-[#A73574]">Shared</p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className=" flex flex-col gap-4 w-[300px] h-[150px]">
          <div className="flex border-b border-gray-500 ">
            <p className="text-base font-roboto">Share to:</p>
          </div>
          <div className="flex flex-row justify-around gap-2 ">
            <div className="">
              <FacebookShareButton url={url}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
            </div>
            {/* <div className="">
              <FacebookMessengerShareButton url={url}>
                <FacebookMessengerIcon size={32} round={true} color="pink" />
              </FacebookMessengerShareButton>
            </div> */}
            <div className="">
              <TwitterShareButton url={url}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
            </div>
            <div className="">
              <TelegramShareButton url={url}>
                <TelegramIcon size={32} round={true} />
              </TelegramShareButton>
            </div>
          </div>
          <div className="flex flex-row justify-around ">
            <div className="">
              <input
                type="text"
                value={url}
                readOnly
                className=" border border-gray-500 w-[250px] h-10 px-2 rounded-[10px] bg-[#cccc]"
              />
            </div>

            <CopyToClipboard
              text={url}
              onCopy={() => {
                setCopyStatus(true);
                message.success("copied successful");
              }}
            >
              {copyStatus ? (
                <CheckCircleOutlined className="text-green-400 " />
              ) : (
                <CopyOutlined />
              )}
              {/* <CopyOutlined /> */}
              {/* <CheckCircleOutlined className="text-green-400 " /> */}
            </CopyToClipboard>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FooterPost;
