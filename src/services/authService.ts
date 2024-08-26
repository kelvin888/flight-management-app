import { authRepository } from "@/api/authRepository";
import { LoginData, RegistrationData } from "@/types/auth";

const authService = {
  login: async(loginData: LoginData) => {
    return await authRepository.login(loginData)
  },
  register: async(registrationData: RegistrationData) => {
    return await authRepository.register(registrationData);
  },
};

export default authService;
