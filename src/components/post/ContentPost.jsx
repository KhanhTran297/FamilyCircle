import PropTypes from "prop-types";
import ViewMore from "../shared/ViewMore";
import ImgPost from "./ImgPost";

const ContentPost = ({ content }) => {
  return (
    <div className="flex flex-col items-start gap-6 shrink-0">
      <ViewMore limit={224}>{content}</ViewMore>
      <ImgPost />
    </div>
  );
};

ContentPost.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ContentPost;
