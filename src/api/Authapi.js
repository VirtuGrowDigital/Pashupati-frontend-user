import axiosConfig from "./axiosConfig";

export const sendOtp = (email) => axiosConfig.post("/auth/send-otp", { email });
export const verifyOtp = (email, otp) =>
  axiosConfig.post("/auth/verify-otp", { email, otp });
