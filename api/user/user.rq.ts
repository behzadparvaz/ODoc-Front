import { useMutation, useQuery, useQueryClient } from "react-query";
import { AddLocation, AddProfileInfo, DeleteUserLocations, GetProfile, GetUserLocations, UpdateProfileInfo } from "./user";
import useNotification from "@hooks/useNotification";
import useModal from "@hooks/useModal";
import { selectStoreTexts } from "@com/texts/selectStoreTexts";
import { useRouter } from "next/router";

export const useAddLocation = () => {
  const { openNotification } = useNotification()
  const { removeLastModal } = useModal()
  const queryClient = useQueryClient()
  return useMutation(AddLocation, {
    onSuccess: () => {
      queryClient?.invalidateQueries('getUserLocations')
      removeLastModal()
      openNotification({
        message: `${selectStoreTexts?.successAddAddress}`,
        type: 'success',
        notifType: 'successOrFailedMessage',
      });
    }
  });
};
export const useDeleteLocation = () => {
  const { openNotification } = useNotification()
  const queryClient = useQueryClient()
  return useMutation(DeleteUserLocations, {
    onSuccess: () => {

      queryClient?.invalidateQueries('getUserLocations')
      openNotification({
        message: 'ادرس شما با موفقیت حذف شد',
        type: 'info',
        notifType: 'successOrFailedMessage',
      })
    }
  });
};
export const useGetUserLocations = () => {

  const { data, isLoading } = useQuery(
    ['getUserLocations'],
    () => GetUserLocations(),
  );

  return { data, isLoading };
};

export const useGetProfile = () => {

  const { data, isLoading } = useQuery(
    ['getProfile'],
    () => GetProfile(),
  );

  return { data, isLoading };
};

export const useAddProfileInfo = () => {
  const { openNotification } = useNotification()
  const queryClient = useQueryClient()
  const { push } = useRouter()
  return useMutation(AddProfileInfo, {
    onSuccess: () => {
      queryClient?.invalidateQueries('getProfile')
      openNotification({
        message: 'اطلاعات شما با موفقیت ثبت شد',
        type: 'success',
        notifType: 'successOrFailedMessage',
      })
      push('/profile')
    }
  });
};
export const useUpdateProfileInfo = () => {
  const { openNotification } = useNotification()
  const queryClient = useQueryClient()
  const { push } = useRouter()
  return useMutation(UpdateProfileInfo, {
    onSuccess: () => {
      queryClient?.invalidateQueries('getProfile')
      openNotification({
        message: 'اطلاعات شما با موفقیت ویرایش شد',
        type: 'success',
        notifType: 'successOrFailedMessage',
      })
      push('/profile')
    }
  });
};