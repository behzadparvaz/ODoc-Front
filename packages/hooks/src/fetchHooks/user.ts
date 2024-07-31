import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";
import { userService } from "@repo/api";

export const useSendOtpMutation
  :(options?: UseMutationOptions<any, unknown, { phoneNumber: string }>) => UseMutationResult<any, unknown, { phoneNumber: string }>
  = (options = {}) => useMutation({
  mutationFn: ({ phoneNumber }) => userService.sendOTP(phoneNumber),
  ...options
});

