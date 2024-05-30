import { useMutation } from "react-query";
import { oDocSendMobileNumber, oDocSendVerifyCode } from "./oDocAuth";

export const useODocSendMobileNumber = () => useMutation('user', oDocSendMobileNumber);
export const useODocSendVerifyCode = () => useMutation('user', oDocSendVerifyCode);