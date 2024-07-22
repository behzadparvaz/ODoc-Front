import {
  CloseEyeIconFill,
  HelmetIconOutline,
  HouseOutline,
  LocationIcon,
  OrderOutline,
  RefundOrderIcon,
  UserOutline,
} from '@com/icons';
import { colors } from '@configs/Theme';
import { isEmpty } from './isEmptyObject';
import { useSelector } from 'react-redux';
import { RootState } from './types';
import { routeList } from '@routes/routeList';

export const ProfileNavigationMenuItems = () => {
  return [
    {
      id: 1,
      icon: (
        <LocationIcon width={24} height={24} stroke={colors?.teal?.[600]} />
      ),
      text: 'آدرس ها',
      link: routeList.profileAddresses,
    },
    {
      id: 2,
      icon: (
        <HelmetIconOutline width={24} height={24} fill={colors?.teal?.[600]} />
      ),
      text: 'افراد تحت تکفل',
      link: routeList.profileFamilyMembers,
    },
    {
      id: 3,
      icon: <CloseEyeIconFill width={24} height={24} fill={colors.teal[600]} />,
      text: 'تنظیمات رمز عبور',
      link: routeList.profilePasswordSetting,
    },
  ];
};
export const BottomNavigationMenuItems = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return [
    {
      id: 1,
      icon: <HouseOutline width={24} height={24} fill={colors?.teal?.[600]} />,
      text: 'خانه',
      link: routeList.homeRoute,
      hasSubRouet: false,
    },
    {
      id: 2,
      icon: <OrderOutline width={24} height={24} fill={colors?.teal?.[600]} />,
      text: 'سفارش ها',
      link: isEmpty(user) ? routeList?.loginRoute : routeList.ordersHistory,
      hasSubRouet: false,
    },
    {
      id: 3,
      icon: <UserOutline width={24} height={24} fill={colors?.teal?.[600]} />,
      text: isEmpty(user) ? 'ورود' : 'حساب کاربری',
      link: isEmpty(user) ? routeList?.loginRoute : routeList.profile,
      hasSubRouet: true,
    },
  ];
};
