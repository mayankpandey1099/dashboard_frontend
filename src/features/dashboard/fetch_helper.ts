import { post, put, del } from "../../api/api_helper";
import type { RegisterInput } from "../../utils/Types";

export const registerUser = async (
  input: RegisterInput
): Promise<any> => {
  return await post("/auth/register", input);
};

export const updateUser = async (
  id: string,
  data: any
): Promise<any> => {
  return await put(`/${id}`, data);
};

export const deleteUser = async (id: string): Promise<any> => {
  return await del(`/${id}`);
};

export const blockUser = async (id: string): Promise<any> => {
  return await put(`/${id}/block`, {});
};

export const unblockUser = async (id: string): Promise<any> => {
  return await put(`/${id}/unblock`, {});
};
