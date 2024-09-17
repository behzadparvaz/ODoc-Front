import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
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
  LoginWithTapsiSSO,
  UpdateProfileInfo,
  UserSetPassword,
} from './user';
import useNotification from '@hooks/useNotification';
import useModal from '@hooks/useModal';
import { selectStoreTexts } from '@com/texts/selectStoreTexts';
import { useRouter } from 'next/router';
import { Relation } from '@utilities/interfaces/user';
import { routeList } from '@routes/routeList';
import Cookies from 'js-cookie';
import useStorage from '@hooks/useStorage';
import { useDispatch } from 'react-redux';
import { setUserAction } from '@redux/user/userActions';

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
export const useGetUserLocations = (
  options?: UseQueryOptions<unknown, unknown, any[]>,
): UseQueryResult<any[]> => {
  return useQuery(['getUserLocations'], () => GetUserLocations());
};

export const useGetProfile = () => {
  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  const { data, isLoading } = useQuery(['getProfile'], () => GetProfile(), {
    enabled: token ? true : false,
  });
  return { data: data as any, isLoading };
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
    onSuccess: (data) => {
      queryClient?.invalidateQueries('getProfile');
      openNotification({
        message: 'اطلاعات شما با موفقیت ثبت شد',
        type: 'success',
        notifType: 'successOrFailedMessage',
      });
      if (isRegisterInOrderPage) {
        removeLastModal();
      }
      !isRegisterInOrderPage && !inOrderPage && push(routeList.profile);
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
export const useLoginWithTapsiSSO = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  return useMutation(LoginWithTapsiSSO, {
    onSuccess: (data: any) => {
      console.log('data', data?.token);
      Cookies.set('token', data?.token, { expires: 365 });
      localStorage.setItem('token', data?.token);
      dispatch(
        setUserAction({
          mobileNumber: data?.phoneNumber,
          token: data?.token,
        }),
      );
      push(routeList.homeRoute);
    },
  });
};
