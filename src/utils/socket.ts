import { io, Socket } from "socket.io-client";
import type { User } from "./Types";
import { store } from "../redux/store";
import { setActiveUsers } from "../features/dashboard/dashboardSlice";

export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(
      import.meta.env.VITE_APP_BASE_URL?.replace("/api", "") ||
        "http://localhost:5000",
      {
        auth: { token: localStorage.getItem("token") || "" },
      }
    );

    this.socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    this.socket.on("activeUsers", (users: User[]) => {
      store.dispatch(setActiveUsers(users));
    });

    this.socket.on("userStatus", (data: { id: string; isActive: boolean }) => {
      store.dispatch(
        setActiveUsers(
          store
            .getState()
            .dashboard.activeUsers.map((user) =>
              user.id === data.id ? { ...user, isActive: data.isActive } : user
            )
        )
      );
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export const socketService = new SocketService();
