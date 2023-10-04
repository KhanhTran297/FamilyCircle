/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const ViewMore = ({ children, limit }) => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  let content;
  if (children.length > limit) {
    content = children.slice(0, limit) + "...";
  } else {
    content = children;
  }
  return (
    <div>
      <div
        className="w-full h-auto text-sm font-normal read-more-read-less font-roboto"
        // dangerouslySetInnerHTML={{ __html: content }}
      >
        {content}
        <button
          className="text-sm  font-roboto text-[#A73574] font-medium"
          onClick={() => handleNavigation("")}
        >
          {children && children.length > limit ? "View more" : ""}
        </button>
      </div>
    </div>
  );
};

export default ViewMore;
