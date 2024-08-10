import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import {
  AddFamilyMembers,
  AddLocation,
  AddProfileInfo,
  DeleteUserLocations,
  GetProfile,
  GetProfileRelation,
  GetUserLocations,
  UpdateProfileInfo,
  UserSetPassword,
} from './user';
import useNotification from '@hooks/useNotification';
import useModal from '@hooks/useModal';
import { selectStoreTexts } from '@com/texts/selectStoreTexts';
import { useRouter } from 'next/router';
import { Relation } from '@utilities/interfaces/user';
import { routeList } from '@routes/routeList';

export const useAddLocation = () => {
  const { openNotification } = useNotification();
  const { removeLastModal } = useModal();
  const queryClient = useQueryClient();
  return useMutation(AddLocation, {
    onSuccess: (data: any) => {
      if (data?.length) {
        openNotification({
          message: data?.[0],
          type: 'error',
          notifType: 'successOrFailedMessage',
        });
      } else {
        queryClient?.invalidateQueries('getUserLocations');
        removeLastModal();
        openNotification({
          message: `${selectStoreTexts?.successAddAddress}`,
          type: 'success',
          notifType: 'successOrFailedMessage',
        });
      }
    },
  });
};
export const useDeleteLocation = () => {
  const { openNotification } = useNotification();
  const queryClient = useQueryClient();
  return useMutation(DeleteUserLocations, {
    onSuccess: () => {
      queryClient?.invalidateQueries('getUserLocations');
      openNotification({
        message: 'آدرس شما با موفقیت حذف شد',
        type: 'info',
        notifType: 'successOrFailedMessage',
      });
    },
  });
};
export const useGetUserLocations = () => {
  const { data, isLoading } = useQuery(['getUserLocations'], () =>
    GetUserLocations(),
  );

  return { data, isLoading };
};

export const useGetProfile = () => {
  const { data, isLoading } = useQuery(['getProfile'], () => GetProfile());

  return { data, isLoading };
};

export const useGetProfileRelation = () => {
  const { data, isLoading } = useQuery<Relation[], unknown>(
    ['getProfileRelation'],
    () => GetProfileRelation(),
  );

  return { data, isLoading };
};

export const useAddProfileInfo = (
  inOrderPage?: boolean,
  isRegisterInOrderPage?: boolean,
) => {
  const { openNotification } = useNotification();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { removeLastModal } = useModal();
  return useMutation(AddProfileInfo, {
    onSuccess: () => {
      queryClient?.invalidateQueries('getProfile');
      openNotification({
        message: 'اطلاعات شما با موفقیت ثبت شد',
        type: 'success',
        notifType: 'successOrFailedMessage',
      });
      if (isRegisterInOrderPage) {
        removeLastModal();
      }
      !inOrderPage && push(routeList.profile);
    },
  });
};
export const useAddFamilyMembers = () => {
  const { openNotification } = useNotification();
  const queryClient = useQueryClient();
  return useMutation(AddFamilyMembers, {
    onSuccess: () => {
      queryClient?.invalidateQueries('getProfile');
      openNotification({
        message: 'اطلاعات فرد تحت تکفل شما با موفقیت ثبت شد',
        type: 'success',
        notifType: 'successOrFailedMessage',
      });
    },
  });
};
export const useUpdateProfileInfo = (inOrderPage) => {
  const { openNotification } = useNotification();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  return useMutation(UpdateProfileInfo, {
    onSuccess: () => {
      queryClient?.invalidateQueries('getProfile');
      openNotification({
        message: 'اطلاعات شما با موفقیت ویرایش شد',
        type: 'success',
        notifType: 'successOrFailedMessage',
      });
      !inOrderPage && push(routeList.profile);
    },
  });
};
export const useUserSetPassword = () => {
  const { openNotification } = useNotification();
  const { push } = useRouter();
  return useMutation(UserSetPassword, {
    onSuccess: () => {
      openNotification({
        message: 'رمز عبور شما با موفقیت ثبت شد',
        type: 'success',
        notifType: 'successOrFailedMessage',
      });
      push(routeList.profile);
    },
  });
};
