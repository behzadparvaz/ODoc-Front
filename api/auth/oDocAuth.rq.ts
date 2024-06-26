import { useMutation } from "react-query";
import { loginWithOtp, loginWithPassword, sendMobileNumber, sendVerifyCode } from "./oDocAuth";

export const useSendMobileNumber = () => useMutation('user', sendMobileNumber);
export const useSendVerifyCode = () => useMutation('user', sendVerifyCode);
export const useSendOtpForLoginWithOtp = () => useMutation('user', loginWithOtp);
export const useSendOtpForLoginWithPassword = () => useMutation('user', loginWithPassword);