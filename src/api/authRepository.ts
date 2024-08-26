import { post } from "./client/flight";
import { AuthResponse, LoginData, RegistrationData } from "@/types/auth";
import { authUrls } from "@/constants/apiUrls/auth";


export const authRepository = {
  login: async (data: LoginData):Promise<AuthResponse> => {
    return await post(`${authUrls.LOGIN}`, data)
 },
 register: async (data: RegistrationData):Promise<AuthResponse> => {
    return await post(`${authUrls.REGISTER}`, data)
 },
};
