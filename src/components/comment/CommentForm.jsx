import { Avatar } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ILocalArrowComment } from "../svg/arrowcomment";
import useCommentMutate from "../../hooks/useMutate/useCommentMutate";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
// import { Mention, MentionsInput } from "react-mentions";
import "../../assets/css/index.less";
import "../../assets/css/dynamic.less";
import Mentions from "rc-mentions";
import { useQuery } from "@tanstack/react-query";
import { getListFollowerApi, getListFollowingApi } from "../../api/follow";
import { child, get, getDatabase, ref } from "firebase/database";
import { pushNotificationApi } from "../../api/notification";

const CommentForm = (props) => {
  const { createComment } = useCommentMutate(props.parentId, null);
  const accountProfile = useGetFetchQuery(["accountProfile"]);
  const [listTagUser, setListTagUser] = useState([]);
  const [comment, setComment] = useState("");
  const [listFriend, setListFriend] = useState([]);
  const dbRef = ref(getDatabase());
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
  const handlePushNotification = (id, body, kind) => {
    get(child(dbRef, `users/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          pushNotificationApi({
            message: {
              token: snapshot.val().token,
              notification: {
                title: accountProfile?.data?.fullName,
                body:
                  kind == 1
                    ? body
                    : accountProfile?.data?.fullName +
                      " mentioned you in their comments",
                image: accountProfile?.data?.avatar,
              },
              webpush: {
                fcm_options: {
                  link: `https://familycircle.vercel.app/post/${props.id}`,
                },
              },
            },
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleCreateComment = (values, listTag) => {
    const parentId = props.parentId ? props.parentId : "";
    const data = {
      postId: props.id,
      commentContent: values,
      parentId,
      taggedAccountIds: listTag,
    };
    createComment(data)
      .then((responeComment) => {
        const contentBody =
          props.depth === 1
            ? accountProfile?.data?.fullName + " commented on your post"
            : accountProfile?.data?.fullName + " replied to your comment";
        const pushUserId = props.depth === 1 ? props.idowner : props.parentUser;
        if (handleCheckCommentOwnPost()) {
          if (listTag.length > 0) {
            listTag.map((tag) => {
              handlePushNotification(tag, contentBody, 2);
            });
          }
        } else {
          handlePushNotification(pushUserId, contentBody, 1);
          if (listTag.length > 0) {
            listTag.map((tag) => {
              handlePushNotification(tag, contentBody, 2);
            });
          }
        }

        // handlePushNotification(pushUserId, contentBody, 1);
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
  parentUser: PropTypes.any,
};
export default CommentForm;
