import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  AddFamilyMembers,
  AddLocation,
  AddProfileInfo,
  DeleteUserLocations,
  GetProfile,
  GetProfileRelation,
  GetUserLocation,
  GetUserLocations,
  LoginWithTapsiSSO,
  UpdateProfileInfo,
  UserSetPassword,
} from './user';
import useNotification from '@hooks/useNotification';
import useModal from '@hooks/useModal';
import { selectStoreTexts } from '@com/texts/selectStoreTexts';
import { Relation } from '@utilities/interfaces/user';
import { routeList } from '@routes/routeList';
import useStorage from '@hooks/useStorage';
import { setUserAction } from '@redux/user/userActions';
import { RootState } from '@utilities/types';
import { Location } from '@utilities/interfaces/location';

export const useAddLocation = ({
  isInAddressPage = false,
}: {
  isInAddressPage?: boolean;
}) => {
  const { openNotification } = useNotification();
  const { removeLastModal } = useModal();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddLocation,
    onSuccess: (data: any) => {
      if (data?.length) {
        openNotification({
          message: data?.[0],
          type: 'error',
          notifType: 'successOrFailedMessage',
        });
      } else {
        queryClient?.invalidateQueries({ queryKey: ['getUserLocations'] });
        removeLastModal();
        openNotification({
          message: `${selectStoreTexts?.successAddAddress}`,
          type: 'success',
          notifType: 'successOrFailedMessage',
        });
        if (isInAddressPage) {
          push(routeList.profileAddresses);
        }
      }
    },
  });
};
export const useDeleteLocation = () => {
  const { openNotification } = useNotification();
  const { removeLastModal } = useModal();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const defaultAddress = user?.defaultAddress;
  const { refetch: refetchAddresses } = useGetUserLocations();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteUserLocations,
    onSuccess: (data, variables) => {
      refetchAddresses();
      queryClient?.invalidateQueries({ queryKey: ['getUserLocations'] });
      openNotification({
        message: 'مکان منتخب با موفقیت حذف شد',
        type: 'info',
        notifType: 'successOrFailedMessage',
      });
      removeLastModal();

      if (defaultAddress?.id === variables?.Id) {
        dispatch(
          setUserAction({
            defaultAddress: null,
          }),
        );
      }
    },
  });
};

export const useGetUserLocations = (
  options?: UseQueryOptions<unknown, unknown, any[]>,
): UseQueryResult<any[]> => {
  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  return useQuery({
    queryKey: ['getUserLocations'],
    queryFn: () => GetUserLocations(),
    enabled: token ? true : false,
  });
};

export const useGetUserLocation = (
  locationId: string,
  options?: UseQueryOptions<unknown, unknown, Location>,
): UseQueryResult<Location> => {
  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  return useQuery({
    queryKey: ['getUserLocation', locationId],
    queryFn: () => GetUserLocation(locationId),
    enabled: !!token && !!locationId,
  });
};

export const useGetProfile = (options?: any) => {
  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  const { data, isLoading } = useQuery({
    queryKey: ['getProfile'],
    queryFn: () => GetProfile(),
    enabled: token ? true : false,
    ...options,
  });
  return { data: data as any, isLoading };
};

export const useGetProfileRelation = () => {
  const { data, isLoading } = useQuery<Relation[], unknown>({
    queryKey: ['getProfileRelation'],
    queryFn: () => GetProfileRelation(),
  });

  return { data, isLoading };
};

export const useAddProfileInfo = () => {
  const { openNotification } = useNotification();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  return useMutation({
    mutationFn: AddProfileInfo,
    onSuccess: (data) => {
      queryClient?.invalidateQueries({ queryKey: ['getProfile'] });
      openNotification({
        message: 'اطلاعات شما با موفقیت ثبت شد',
        type: 'success',
        notifType: 'successOrFailedMessage',
      });
      push(routeList.profile);
    },
  });
};
export const useAddFamilyMembers = () => {
  const { openNotification } = useNotification();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddFamilyMembers,
    onSuccess: () => {
      queryClient?.invalidateQueries({ queryKey: ['getProfile'] });
      openNotification({
        message: 'اطلاعات فرد تحت تکفل شما با موفقیت ثبت شد',
        type: 'success',
        notifType: 'successOrFailedMessage',
      });
    },
  });
};
export const useUpdateProfileInfo = () => {
  const { openNotification } = useNotification();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  return useMutation({
    mutationFn: UpdateProfileInfo,
    onSuccess: () => {
      queryClient?.invalidateQueries({ queryKey: ['getProfile'] });
      openNotification({
        message: 'اطلاعات شما با موفقیت ویرایش شد',
        type: 'success',
        notifType: 'successOrFailedMessage',
      });
      push(routeList.profile);
    },
  });
};
export const useUserSetPassword = () => {
  const { openNotification } = useNotification();
  const { push } = useRouter();
  return useMutation({
    mutationFn: UserSetPassword,
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
  return useMutation({
    mutationFn: LoginWithTapsiSSO,
    onSuccess: (data: any) => {
      Cookies.set('token', data?.token, { expires: 365 });
      Cookies.set('loginWithTapsiSSO', true, { expires: 365 });
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
