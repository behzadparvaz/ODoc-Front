import {
  CloseEyeIconFill,
  HelmetIconOutline,
  HouseOutline,
  LocationIcon, MyOrderOutline,
  PharmecyOutline, ProfileCircleOutline,
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
      icon: <HouseOutline width={24} height={24} fill={colors?.grey?.[400]} />,
      text: 'خانه',
      link: routeList.homeRoute,
      hasSubRouet: false,
    },
    {
      id: 2,
      icon: <PharmecyOutline width={24} height={24} fill={colors?.grey?.[400]} />,
      text: 'داروخانه',
      link: isEmpty(user) ? routeList?.loginRoute : routeList.ordersHistory,
      hasSubRouet: false,
    },{
      id: 3,
      icon: <PharmecyOutline width={24} height={24} fill={colors?.white} />,
      text: 'داروخانه',
      link: isEmpty(user) ? routeList?.loginRoute : routeList.ordersHistory,
      hasSubRouet: false,
    },
    {
      id: 4,
      icon: <MyOrderOutline width={24} height={24} fill={colors?.grey?.[400]} />,
      text: 'سفارشات من',
      link: isEmpty(user) ? routeList?.loginRoute : routeList.ordersHistory,
      hasSubRouet: false,
    },
    {
      id: 5,
      icon: <ProfileCircleOutline width={24} height={24} stroke={colors?.grey?.[400]} />,
      text: isEmpty(user) ? 'ورود' : 'پروفایل',
      link: isEmpty(user) ? routeList?.loginRoute : routeList.profile,
      hasSubRouet: true,
    },
  ];
};
