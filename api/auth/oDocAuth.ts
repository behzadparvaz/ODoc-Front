import request from "@api/request";

export const authLoginWithOtp = async (body) => await request.post(`/Auth/LoginWithOtp`, body);
export const authVerifyOtp = async (body) => await request.post(`/Auth/VerifyOtp`, body);