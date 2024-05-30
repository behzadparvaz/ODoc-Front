import axios from "axios";

export const oDocUrl = 'https://sap.okcs.com/td/'

export const oDocSendMobileNumber = async (body) => await axios.post(`${oDocUrl}user/register`, body);
export const oDocSendVerifyCode = async (body) => await axios.post(`${oDocUrl}user/VerifyCode`, body);
