import { useMutation, useQuery, useQueryClient } from "react-query";
import { AddLocation, DeleteUserLocations, GetUserLocations } from "./user";
import useNotification from "@hooks/useNotification";
import useModal from "@hooks/useModal";
import { selectStoreTexts } from "@com/texts/selectStoreTexts";

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
