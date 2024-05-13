import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "antd";
import AccountCard from "./AccountCard";
import Post from "../post/Post";

const SearchList = (props) => {
  return (
    <div className="flex flex-col gap-1 ">
      <div className="">
        <p className="text-base font-normal font-roboto">
          {props.kind == 1 ? "People" : "Post"}
        </p>
      </div>
      <div className="flex flex-col gap-2 ">
        {props.loading ? (
          <Skeleton
            avatar
            paragraph={{
              rows: 2,
            }}
          />
        ) : (
          props.listSearch.map((item, index) => {
            console.log("item", item);
            if (props.kind === 1) {
              return <AccountCard account={item} key={index} />;
            } else {
              return (
                <Post
                  key={index}
                  id={item.id}
                  content={item.content}
                  fullname={item.owner.fullName}
                  kind={item.owner.kind}
                  modifiedDate={item.modifiedDate}
                  createdDate={item.createdDate}
                  idowner={item.owner.id}
                  kindPost={item.kind}
                  avatar={item.owner.avatar}
                  title={item.title}
                  countComment={item?.commentList?.length || 0}
                  community={item?.community || "undefined"}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

SearchList.propTypes = {
  listSearch: PropTypes.array,
  kind: PropTypes.number,
  loading: PropTypes.bool,
};

export default SearchList;
