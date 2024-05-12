import { ILocalComment } from "../svg/comment";
import { ILocalHeartComment } from "../svg/hear_comment";
import { ILocalReply } from "../svg/reply";
import IconFooter from "./IconFooter";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { ILocalEmptyHeart } from "../svg/empty_heart";
import useCommentMutate from "../../hooks/useMutate/useCommentMutate";
import { useGetFetchQuery } from "../../hooks/useGetFetchQuery";
import { child, get, getDatabase, ref } from "firebase/database";
import { pushNotificationApi } from "../../api/notification";
const CommentFooter = ({
  eventReply,
  data,
  countComment,
  eventShowReply,
  root,
  parentId,
}) => {
  const accountProfile = useGetFetchQuery(["accountProfile"]);
  const { reactcomment } = useCommentMutate(data?.id, parentId);
  const dbRef = ref(getDatabase());
  const handleReactComment = (check) => {
    reactcomment({ commentId: data?.id, kind: 1 }).then(() => {
      if (data?.owner?.id !== accountProfile?.data?.id && check === false) {
        handlePushNotification();
      }
    });
  };
  console.log("data", data);
  const handlePushNotification = () => {
    get(child(dbRef, `users/${data?.owner?.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          pushNotificationApi({
            message: {
              token: snapshot.val().token,
              notification: {
                title: accountProfile?.data?.fullName,
                body:
                  accountProfile?.data?.fullName + " has liked your comment",
                image: accountProfile?.data?.avatar,
              },
              webpush: {
                fcm_options: {
                  link: `https://familycircle.vercel.app/post/${data?.post?.id}`,
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
  const checkReact = () => {
    // if (profileAccount) {
    //   const check = data.commentReactions?.filter(
    //     (item) => item?.id === profileAccount?.data?.id
    //   );

    //   if (check) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } else {
    //   const check = data.commentReactions?.filter(
    //     (item) => item?.id === profileExpertAccount?.data?.id
    //   );
    //   if (check) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    const check = data.commentReactions?.filter((item) => {
      item?.id === accountProfile?.data?.id;
    });
    if (check) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    checkReact();
  }, []);
  return (
    <div className="flex flex-row gap-4 pb-4 mt-1 ">
      <IconFooter
        check={true}
        count={data.commentReactions?.length || 0}
        handleClick={() => handleReactComment(checkReact())}
      >
        {checkReact() ? (
          <ILocalHeartComment fill="#A73574" className="" />
        ) : (
          <ILocalEmptyHeart className="" />
        )}
      </IconFooter>
      {root && (
        <IconFooter
          count={countComment || 0}
          check={true}
          handleClick={() => {
            countComment && eventShowReply();
          }}
        >
          <ILocalComment fill="#A73574" width={24} height={24} className="" />
        </IconFooter>
      )}
      <IconFooter check={false} handleClick={() => eventReply()}>
        <ILocalReply fill="#1F1A1C" className="" />
      </IconFooter>
    </div>
  );
};
CommentFooter.propTypes = {
  eventReply: PropTypes.func.isRequired,
  eventShowReply: PropTypes.func,
  data: PropTypes.object.isRequired,
  countComment: PropTypes.number,
  root: PropTypes.bool.isRequired,
};
export default CommentFooter;
