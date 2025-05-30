import { useEffect } from "react";
import { useAppSelector } from "../redux/hook";
import { socketService } from "./socket";

const SocketInitializer = () => {
  const { isAuthenticated, token, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && token && user && !socketService.isConnected()) {
      socketService.connect(token);
    }
  }, [isAuthenticated]);

  return null;
};

export default SocketInitializer;
