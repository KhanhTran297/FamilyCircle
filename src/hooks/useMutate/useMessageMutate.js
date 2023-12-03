import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessageApi } from "../../api/message";
import { useLocation } from "react-router-dom";

export default function useMessageMutate() {
  const location = useLocation();
  const conversationId = location.search.split("=")[1] || null;
  const queryClient = useQueryClient();
  const { mutateAsync: sendMesssage, isPending: isSending } = useMutation({
    mutationKey: ["createMessage"],
    mutationFn: createMessageApi,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "listMessageinConversation",
        conversationId,
      ]);
    },
  });
  return { sendMesssage, isSending };
}
