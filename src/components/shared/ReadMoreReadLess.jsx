import React, { useRef, useState } from "react";

const ReadMoreReadLess = ({ children, limit }) => {
  const content =
    children.length > limit ? children.slice(0, limit) + "..." : children;
  return (
    <div>
      <div
        className="read-more-read-less break-all"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default ReadMoreReadLess;
