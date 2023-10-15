import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useFormField from "../../hooks/useFormField";

const QuillEditor = (props) => {
  const { rules } = useFormField(props);
  const { disabled, name, value, onChange } = props;
  const modules = {
    toolbar: [
      [{ size: [false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }],
      [{ background: [] }],

      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["image"],
    ],
  };

  return (
    <ReactQuill
      value={value}
      name={name}
      onChange={onChange}
      modules={modules}
      readOnly={disabled}
      className="xl:h-[600px] xl:max-h-[700px] h-[450px] max-h-[550px] overscroll-y-auto overscroll-x-none"
    />
  );
};
export default QuillEditor;
