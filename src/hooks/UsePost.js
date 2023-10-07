import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { setListPost } from "../redux/slice/post";
import { createPostApi, getListPostApi } from "../api/post";
function UsePost() {
  const dispatch = useDispatch();
  // const postId = useSelector((state) => state.post.postId);

  const { data: listPost, refetch: getListPost } = useQuery({
    queryKey: ["listPost"],
    queryFn: () => getListPostApi(),
    enabled: false,
    retry: 0,
    onSuccess: (listPost) => {
      dispatch(setListPost(listPost.data));
    },
  });

  // // getPost
  // const { data: post, refetch: getPost } = useQuery(
  //   ["post", postId],
  //   () => getPostApi(postId),
  //   {
  //     enabled: false,
  //     retry: 0,
  //     onSuccess: (post) => {
  //       dispatch(setPostId(post.data));
  //     },
  //   }
  // );

  //createPost
  const { mutate: createPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (respone) => {
      if (respone.result) {
        getListPost();

        // useSuccess("Create post success!");
      } else {
        // useError("Create post fail!");
      }
    },
    onError: () => {
      //   useError("Save fail!!!!");
    },
  });

  return {
    listPost,
    getListPost,
    createPost,
  };
}

export default UsePost;
