export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "player";
  bananaCount: number;
  isBlocked: boolean;
  isActive: boolean;
}

export interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ApiResponse<T> {
  data: T | null;
  status: number;
  message: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  role?: "admin" | "player";
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface DashboardState {
  activeUsers: any[];
}

export interface PlayerState {
  bananaCount: number;
}

export interface RanksState {
  ranking: User[];
}
