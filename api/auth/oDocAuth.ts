import axios from "axios";

export const oDocUrl = 'https://sap.okcs.com/td/'

export const sendMobileNumber = async (body) => await axios.post(`${oDocUrl}user/register`, body);
export const sendVerifyCode = async (body) => await axios.post(`${oDocUrl}user/VerifyCode`, body);
export const loginWithOtp = async (body) => await axios.post(`${oDocUrl}user/LoginWithOtp`, body);
export const loginWithPassword = async (body) => await axios.post(`${oDocUrl}user/Login`, body);