import { useMutation } from '@tanstack/react-query';
import {
  loginWithOtp,
  loginWithPassword,
  sendMobileNumber,
  sendVerifyCode,
} from './oDocAuth';

export const useSendMobileNumber = () =>
  useMutation({ mutationKey: ['user'], mutationFn: sendMobileNumber });
export const useSendVerifyCode = () =>
  useMutation({ mutationKey: ['user'], mutationFn: sendVerifyCode });
export const useSendOtpForLoginWithOtp = () =>
  useMutation({ mutationKey: ['user'], mutationFn: loginWithOtp });
export const useSendOtpForLoginWithPassword = () =>
  useMutation({ mutationKey: ['user'], mutationFn: loginWithPassword });
