import request from "@api/request";

export const sendMobileNumber = async (body) => await request.post(`/user/register`, body);
export const sendVerifyCode = async (body) => await request.post(`/user/VerifyCode`, body);
export const loginWithOtp = async (body) => await request.post(`/user/LoginWithOtp`, body);
export const loginWithPassword = async (body) => await request.post(`/user/Login`, body);