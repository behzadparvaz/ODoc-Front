import { useMutation } from '@tanstack/react-query';
import {
  authLoginWithOtp,
  authVerifyOtp
} from './oDocAuth';

export const useAuthLoginWithOtp = () =>
  useMutation({ mutationKey: ['user'], mutationFn: authLoginWithOtp });

export const useVerifyOtp = () =>
  useMutation({ mutationKey: ['user'], mutationFn: authVerifyOtp });