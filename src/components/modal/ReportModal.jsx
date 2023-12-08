import { useEffect, useState } from "react";

import ReactDOM from "react-dom";
import RadioButton from "../shared/RadioButton";
import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ILocalClearable } from "../svg/clearable";
import useReportMutate from "../../hooks/useMutate/useReportMutate";
const ReportModal = (props) => {
  const { createReport } = useReportMutate();
  const [selectedValue, setSelectedValue] = useState(null);
  const [showOtherReason, setShowOtherReason] = useState(false);
  const [otherReason, setOtherReason] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [countdown, setCountdown] = useState(5);
  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const handleConfirm = () => {
    if (selectedValue === "Others" && otherReason.trim() !== "") {
      const data = {
        content: otherReason,
        kind: props.kind,
        objectId: props.id,
      };
      createReport(data);
      props.handleClose();

      setShowSuccessModal(true);
    } else if (selectedValue) {
      const data = {
        content: selectedValue,
        kind: props.kind,
        objectId: props.id,
      };
      createReport(data);
      props.handleClose();
      setShowSuccessModal(true);
    } else {
      console.log("error");
    }
    setSelectedValue(null);
  };

  if (showSuccessModal) {
    setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        setShowSuccessModal(false);
        setCountdown(5);
      }
    }, 1000);
  }
  if (typeof document === "undefined")
    return <div className="reportpostdetail"></div>;
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-[100] w-100vw h-100vh  desktop:pt-0 items-center justify-center flex reportpostdetail ${
        props.open ? " " : "invisible opacity-0"
      } `}
    >
      <div
        className="absolute inset-0 bg-modal"
        onClick={() => {
          props.handleClose();
          setSelectedValue(null);
        }}
      ></div>
      <div className=" z-10 w-full h-auto bg-[#FFF8F8] desktop:p-6 px-6 desktop:max-w-[600px] desktop:h-auto desktop:shadow-modal  desktop:rounded-[28px]  rounded-t-[28px] fixed bottom-0 desktop:relative">
        <div className="py-6 desktop:hidden">
          <div className="w-full h-1">
            <div className="w-8 h-full rounded-[2px] m-auto bg-[#504348] opacity-40  "></div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-6">
          <div className="flex flex-col w-full gap-4">
            <div className="text-2xl font-normal font-roboto text-[#1F1A1C]">
              Report
            </div>
            <div className="text-sm font-normal font-roboto text-[#1F1A1C]">
              Please select a problem to this post. This can help us to improve
              other post’s quality in the future.
            </div>
          </div>
          <div className="bg-[#F1DEE4] w-full h-[1px]"></div>
          <div className="flex flex-col w-full">
            <RadioButton
              value="Misunderstanding or scam"
              isChecked={selectedValue === "Misunderstanding or scam"}
              onChange={() => {
                handleRadioChange("Misunderstanding or scam");
                setShowOtherReason(false);
              }}
            />
            <RadioButton
              value="Restricted content"
              isChecked={selectedValue === "Restricted content"}
              onChange={() => {
                handleRadioChange("Restricted content");
                setShowOtherReason(false);
              }}
            />
            <RadioButton
              value="Spam"
              isChecked={selectedValue === "Spam"}
              onChange={() => {
                handleRadioChange("Spam");
                setShowOtherReason(false);
              }}
            />
            <RadioButton
              value="Others"
              isChecked={selectedValue === "Others"}
              onChange={() => {
                setSelectedValue("Others");
                setShowOtherReason(true);
              }}
            />
            {showOtherReason && (
              <div className="flex flex-col gap-1">
                <TextArea
                  maxLength={200}
                  type="text"
                  placeholder="Description"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  allowClear={<ILocalClearable fill="#504348" />}
                  style={{
                    height: "56px",
                  }}
                >
                  {/* <ILocalClearable fill="#504348" /> */}
                </TextArea>
                <div className="text-xs font-normal font-roboto text-[#504348] px-4">
                  Please describe the problem of this post | 0/200 characters
                </div>
              </div>
            )}
          </div>
          <div className="bg-[#F1DEE4] w-full h-[1px]"></div>
          <div className="flex flex-row items-center self-end gap-2">
            <button
              className="flex items-center h-10 px-3 rounded-[36px]"
              onClick={() => {
                props.handleClose();
                setSelectedValue(null);
              }}
            >
              <p className="font-medium ext-sm font-roboto text-[#A73574]">
                Cancel
              </p>
            </button>
            <button
              className="flex items-center h-10 px-3 rounded-[36px]"
              onClick={handleConfirm}
              disabled={
                !selectedValue ||
                (selectedValue === "Others" && otherReason.trim() === "")
              }
            >
              <p
                className={`font-medium ext-sm font-roboto  ${
                  !selectedValue ||
                  (selectedValue === "Others" && otherReason.trim() === "")
                    ? "text-disableButton"
                    : "text-[#A73574]"
                }`}
              >
                Confirm
              </p>
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={showSuccessModal}
        closable={false}
        footer={null}
        centered
        className="reportsuccess"
      >
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-4 ">
            <div className="text-2xl font-normal font-roboto text-[#1F1A1C]">
              Report successfully!
            </div>
            <div className="text-sm font-normal font-roboto text-[#1F1A1C]">
              Your report is now being processed by our team. Thank you for
              letting us know. We will announce you the final judgment as soon
              as possible.
            </div>
          </div>
          <button
            className="flex items-center h-10 px-3 rounded-[36px] self-end "
            onClick={() => setShowSuccessModal(false)}
          >
            <p className="font-medium ext-sm font-roboto text-[#A73574]">
              Close ( {countdown})
            </p>
          </button>
        </div>
      </Modal>
    </div>,
    document.querySelector("body")
  );
};

export default ReportModal;
