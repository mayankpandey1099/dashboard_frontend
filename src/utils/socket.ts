import { io, Socket } from "socket.io-client";
import { setActiveUsers } from "../features/dashboard/dashboardSlice";
import { setBananaCount } from "../features/player/playerSlice";
import { setIsConnected } from "../features/socket/socketSlice";
import { store } from "../redux/store";
import { setRanking } from "../features/ranks/rankSlice";
import type { User } from "./Types";

export class SocketService {
  private socket: Socket | null = null;
  private url: string;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 3000;

  constructor() {
    this.url =
      import.meta.env.VITE_APP_BASE_URL?.replace("/api", "") ||
      "http://localhost:5000";
  }

  connect(token: string) {
    if (this.socket) {
      this.disconnect();
    }

    this.socket = io(this.url, {
      auth: { token },
      reconnection: false, // Handle reconnection manually
    });

    this.socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      store.dispatch(setIsConnected(true));
      this.reconnectAttempts = 0;
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error.message);
      store.dispatch(setIsConnected(false));
      this.handleReconnect(token);
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      store.dispatch(setIsConnected(false));
    });

    this.socket.on("error", (error) => {
      console.error("Socket.IO error:", error.message);
    });

    this.socket.on("bananaCount", (data: { bananaCount: number }) => {
      console.log("Received bananaCount:", data);
      store.dispatch(setBananaCount(data));
    });

    this.socket.on("activeUsers", (users: User[]) => {
      console.log("Received activeUsers:", users);
      store.dispatch(setActiveUsers(users));
    });

    this.socket.on("ranking", (users: User[]) => {
      console.log("Received ranking:", users);
      store.dispatch(setRanking(users));
    });

    this.socket.on("userStatus", (data: { id: string; isActive: boolean }) => {
      console.log("Received userStatus:", data);
      store.dispatch(
        setActiveUsers(
          store
            .getState()
            .dashboard.activeUsers.map((user: any) =>
              user._id === data.id ? { ...user, isActive: data.isActive } : user
            )
        )
      );
    });
  }

  private handleReconnect(token: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
      );
      setTimeout(() => {
        this.connect(token);
      }, this.reconnectInterval);
    } else {
      console.error(
        "Max reconnect attempts reached. Socket connection failed."
      );
    }
  }

  emitBananaClick() {
    if (this.socket?.connected) {
      console.log("Emitting bananaClick event");
      this.socket.emit("bananaClick");
    } else {
      console.error("Socket is not connected");
    }
  }

  isConnected() {
    return this.socket?.connected ?? false;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.reconnectAttempts = 0;
      store.dispatch(setIsConnected(false));
    }
  }
}

export const socketService = new SocketService();
