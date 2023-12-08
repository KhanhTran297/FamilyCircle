import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getListPostExpertClientApi } from "../../api/post";
import NewPostCard from "./NewPostCard";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const { data: getListPostExpertClient } = useQuery({
    queryKey: ["getListPostExpertClient"],
    queryFn: getListPostExpertClientApi,
  });
  console.log(getListPostExpertClient);
  const latestPosts = getListPostExpertClient?.data?.content || [];

  return (
    <div className="desktop:flex hidden flex-col items-start max-w-[320px] gap-6 p-6 pr-3 bg-[#FFF8F8] rounded-3xl min-w-[200px]  w-full">
      <div className="h-6">
        <p className="text-base font-medium font-roboto text-[#1F1A1C]">
          New Posts
        </p>
      </div>
      <div className="flex flex-col w-full gap-4">
        {latestPosts.slice(0, 4).map((post) => (
          <NewPostCard key={post.id} id={post.id} title={post.title} />
        ))}
      </div>
    </div>
  );
};

export default NewPost;
