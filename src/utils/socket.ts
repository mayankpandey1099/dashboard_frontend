import { io, Socket } from "socket.io-client";
import { setActiveUsers } from "../features/dashboard/dashboardSlice";
import type { User } from "./Types";
import { store } from "../redux/store";
import { setBananaCount } from "../features/player/playerSlice";
import { setRanking } from "../features/ranks/rankSlice";

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

    this.socket.on("bananaCount", (data: { bananaCount: number }) => {
      console.log({ bananaData: data });
      store.dispatch(setBananaCount(data));
    });

    this.socket.on("activeUsers", (users: User[]) => {
      console.log({ users });
      store.dispatch(setActiveUsers(users));
    });

    this.socket.on("ranking", (ranking: User[]) => {
      store.dispatch(setRanking(ranking));
    });

    this.socket.on("userStatus", (data: any) => {
      // store.dispatch(
      //   setActiveUsers(
      //     store
      //       .getState()
      //       .dashboard.activeUsers.map((user) =>
      //         user.id === data.id ? { ...user, isActive: data.isActive } : user
      //       )
      //   )
      // );
      console.log({ data });
    });
  }

  emitBananaClick() {
    if (this.socket.connected) {
      console.log("Emitting bananaClick event");
      this.socket.emit("bananaClick");
    } else {
      console.error("Socket is not connected");
    }
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export const socketService = new SocketService();
