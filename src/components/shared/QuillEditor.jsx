import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useFormField from "../../hooks/useFormField";

const QuillEditor = (props) => {
  const { rules } = useFormField(props);
  const { disabled, name, value, onChange } = props;

  const modules = {
    toolbar: [["image"]],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "list",
    "image",
  ];

  const quillRef = useRef(null);

  return (
    <div className="w-full h-full">
      <style>
        {`
          .ql-editor img {
            display: block;
            margin: 0 auto;
          }
        `}
      </style>
      <ReactQuill
        ref={quillRef}
        value={value}
        name={name}
        onChange={onChange}
        modules={modules}
        formats={formats}
        readOnly={disabled}
        className="w-full h-full overscroll-y-auto overscroll-x-none"
      />
    </div>
  );
};

export default QuillEditor;
