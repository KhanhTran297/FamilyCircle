import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAccount from "./useAccount";

const useNotificationSocket = () => {
  const { accountProfile } = useAccount();
  const accountId = accountProfile?.data?.id;

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (accountId) {
      const newSocket = io("https://social-networking-websocket.onrender.com", {
        query: { accountId },
      });
      setSocket(newSocket);

      return () => newSocket.disconnect();
    }
  }, [accountId]);

  return socket;
};

export default useNotificationSocket;
