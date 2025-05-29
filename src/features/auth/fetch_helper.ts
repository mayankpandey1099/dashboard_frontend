import { post } from "../../api/api_helper";

export const loginUser = async (
  input: any
): Promise<any> => {
  return await post("/auth/login", input);
};
