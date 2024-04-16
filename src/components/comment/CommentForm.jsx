import { Avatar, Input } from "antd";
import { ILocalArrowRight } from "../svg/arrow_right";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ILocalArrowComment } from "../svg/arrowcomment";
import useCommentMutate from "../../hooks/useMutate/useCommentMutate";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import TextArea from "antd/es/input/TextArea";
import useNotificationMutate from "../../hooks/useMutate/useNotificationMutate";
// import { Mention, MentionsInput } from "react-mentions";
import "../../assets/css/index.less";
import "../../assets/css/dynamic.less";
import defaultStyle from "../../assets/css/defaultStyle";
import Mentions from "rc-mentions";
import defaultMentionStyle from "../../assets/css/defaultMentionStyle";
import { useQuery } from "@tanstack/react-query";
import { getListFollowerApi, getListFollowingApi } from "../../api/follow";
import { Mention, MentionsInput } from "react-mentions";
import { get, set } from "react-hook-form";

const CommentForm = (props) => {
  const { createComment } = useCommentMutate(props.parentId, null);
  const accountProfile = useGetFetchQuery(["accountProfile"]);
  const [inputValue, setInputValue] = useState("");
  const [listTagUser, setListTagUser] = useState([]);
  const [comment, setComment] = useState("");
  const [listFriend, setListFriend] = useState([]);
  const { createNotification, createAnnounce } = useNotificationMutate();
  const { data: listFollowing } = useQuery({
    queryKey: ["listFollowing", accountProfile?.data?.id],
    queryFn: () => getListFollowingApi().then((res) => res.data),
  });

  const { data: listFollower } = useQuery({
    queryKey: ["listFollower", accountProfile?.data?.id],
    queryFn: () => getListFollowerApi().then((res) => res.data),
  });
  const handleCheckCommentOwnPost = () => {
    if (props?.idowner === accountProfile?.data?.id) {
      return true;
    }
    return false;
  };
  const onSelect = (option) => {
    setListTagUser([
      ...listTagUser,
      parseFloat(option.key.slice(0, option.key.indexOf("|"))),
    ]);
  };

  // const onFocus = () => {
  //   console.log("onFocus");
  // };

  // const onBlur = () => {
  //   console.log("onBlur");
  // };
  // const users = [
  //   {
  //     id: "1",
  //     display: "Khanh",
  //   },
  //   {
  //     id: "2",
  //     display: "Tuan",
  //   },
  //   {
  //     id: "3",
  //     display: "Huy",
  //   },
  // ];
  // const handleChange = (event, newValue) => {
  //   setComment(newValue);
  // };
  // function handleKeyDown(event) {
  //   if (event.key === "Enter") {
  //     // Submit the comment

  //     const listTag =
  //       comment?.match(/[^(]+(?=\))/g) == null
  //         ? []
  //         : comment?.match(/[^(]+(?=\))/g).map(Number);

  //     handleCreateComment(event.target.value, listTag);
  //   }
  // }
  const handleCreateComment = (values, listTag) => {
    const parentId = props.parentId ? props.parentId : "";
    const data = {
      postId: props.id,
      commentContent: values,
      parentId,
    };
    const dataNotification = {
      content: `commented on your post`,
      objectId: accountProfile?.data?.id,
      kind: 2,
    };

    // setInputValue("");

    createComment(data)
      .then((responeComment) => {
        if (handleCheckCommentOwnPost()) {
          if (listTag.length > 0) {
            listTag.map((tag) => {
              const dataNotificationTag = {
                content: `tagged you in a comment`,
                objectId: accountProfile?.data?.id,
                kind: 2,
              };
              createNotification(dataNotificationTag).then((response) => {
                const dataAnnounce = {
                  notificationId: response.data.id,
                  receivers: [tag],
                };
                createAnnounce(dataAnnounce);
              });
            });
          }
        } else {
          createNotification(dataNotification).then((response) => {
            const dataAnnounce = {
              notificationId: response.data.id,
              receivers: [responeComment?.data?.ownerIdOfPost],
            };
            if (props.socket && props.socket.connected) {
              props.socket.emit("send-notification-new-comment", {
                postId: responeComment?.data?.post?.id,
                commentId: responeComment?.data?.id,
                ownerIdOfPost: responeComment?.data?.ownerIdOfPost,
                commenter: accountProfile?.data?.id,
                tagList: listTag,
              });
            } else {
              console.log("socket not connect");
            }
            createAnnounce(dataAnnounce);
          });

          if (listTag.length > 0) {
            listTag.map((tag) => {
              const dataNotificationTag = {
                content: `tagged you in a comment`,
                objectId: accountProfile?.data?.id,
                kind: 2,
              };
              createNotification(dataNotificationTag).then((response) => {
                const dataAnnounce = {
                  notificationId: response.data.id,
                  receivers: [tag],
                };
                createAnnounce(dataAnnounce);
              });
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error creating notify comment:", error);
      })
      .finally(() => {
        setComment("");
        setListTagUser([]);
        // listTagUser.length = 0;
      });
  };

  const className =
    props.depth === 2
      ? "flex flex-row gap-2 pb-4 "
      : "w-full flex flex-row gap-2 pb-4 items-center ";
  const getListFriend = () => {
    Promise.resolve(listFollowing).then((value) => {
      if (value?.totalElements > 0) {
        let commonUsers = listFollowing?.content
          ?.filter((followingUser) =>
            listFollower?.content?.some(
              (followerUser) =>
                followerUser?.follower?.id === followingUser?.account?.id
            )
          )
          .map((user) => ({
            key: [user?.account?.id, user?.account?.fullName].join("|"),
            value: user?.account?.fullName,
            className: "dynamic-option",
            label: (
              <div className="flex flex-row items-center gap-3 ">
                <div className="flex items-center w-5 h-5">
                  <img
                    src={user?.account?.avatar}
                    alt={user?.account?.fullName}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>

                <span className="text-base font-normal font-roboto">
                  {user?.account?.fullName}
                </span>
              </div>
            ),
          }));

        Promise.resolve(commonUsers).then((value) => {
          setListFriend(value);
        });
      } else {
        setListFriend([]);
      }
    });
  };
  useEffect(() => {
    getListFriend();
  }, [listFollowing]);

  return (
    <div className={className}>
      {props.depth === 2 && (
        <div className=" w-[45px] flex justify-center items-center relative">
          <ILocalArrowComment className=" absolute right-[-5px] xl:right-0 w-[20px] h-[20px] top-0" />
        </div>
      )}

      <div className="">
        <Avatar
          src={accountProfile?.data?.avatar}
          className=" xl:w-10 xl:h-10 rounded-[40px] h-10 w-10 "
        />
      </div>

      {/* <TextArea
        placeholder="Say some thing about this post..."
        classNames=" flex flex-row-reverse pl-4 p-[0px] h-10 flex-1-0-0 rounded-[100px] items-center cursor-text hover:!border-gray-400 "
        prefix={
          <ILocalArrowRight
            fill="#1F1A1C"
            className="   p-[8px] ml-3 hover:bg-tab hover:bg-opacity-[8%] cursor-pointer rounded-full"
          />
        }
        onPressEnter={(values) => {
          handleCreateComment(values);
        }}
        autoSize
        showCount
        maxLength={200}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      ></TextArea> */}
      {/* <MentionsInput
        className=""
        value={comment}
        placeholder="Mention people using '@'..."
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        style={defaultStyle}
        allowSuggestionsAboveCursor
      >
        <Mention style={defaultMentionStyle} trigger="@" data={listFriend} />
      </MentionsInput> */}
      {/* <Mentions
        style={{
          width: "100%",
        }}
        onChange={(value) => {
          console.log(value);
          setComment(value);
        }}
        onSelect={(option, data) => {
          console.log("onSelect", option, data);
        }}
        onKeyDown={(e) => handleKeyDown(e)}
        value={comment}
        defaultValue="@afc163"
        options={listFriend}
      >
        <div className="">Hello</div>
      </Mentions> */}
      <Mentions
        autoFocus
        placeholder="Mention people using '@'..."
        autoSize
        onSelect={onSelect}
        value={comment}
        onPressEnter={(e) => handleCreateComment(e.target.value, listTagUser)}
        onChange={(e) => setComment(e)}
        className="w-full "
        options={listFriend}
      />
    </div>
  );
};
CommentForm.propTypes = {
  id: PropTypes.any,
  idowner: PropTypes.any,
  parentId: PropTypes.any,
  depth: PropTypes.any,
  socket: PropTypes.any,
};
export default CommentForm;
