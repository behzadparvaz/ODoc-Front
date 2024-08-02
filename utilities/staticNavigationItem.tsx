import {
  CloseEyeIconFill,
  HelmetIconOutline,
  HouseOutline,
  LocationIcon,
  MyOrderOutline,
  NewPlusIconOutline,
  PharmacyOutline,
  ProfileCircleOutline
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
        <LocationIcon width={24} height={24} stroke={colors?.teal?.[600]}/>
      ),
      text: 'آدرس ها',
      link: routeList.profileAddresses
    },
    {
      id: 2,
      icon: (
        <HelmetIconOutline width={24} height={24} fill={colors?.teal?.[600]}/>
      ),
      text: 'افراد تحت تکفل',
      link: routeList.profileFamilyMembers
    },
    {
      id: 3,
      icon: <CloseEyeIconFill width={24} height={24} fill={colors.teal[600]}/>,
      text: 'تنظیمات رمز عبور',
      link: routeList.profilePasswordSetting
    }
  ];
};
export const BottomNavigationMenuItems = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return [
    {
      id: 1,
      icon: ({ color = colors?.grey?.[400] }) => <HouseOutline width={24} height={24} fill={color}/>,
      text: 'خانه',
      link: routeList.landingRoute,
      hasSubRouet: false
    },
    {
      id: 2,
      icon: ({ color = colors?.grey?.[400] }) => <PharmacyOutline width={24} height={24} fill={color}/>,
      text: 'داروخانه',
      link: routeList.vmsRoute,
      hasSubRouet: false
    }, {
      id: 3,
      icon: ({ color = 'white' }) => <NewPlusIconOutline width={24} height={24} fill={color}/>,
      text: 'سفارش',
      link: isEmpty(user) ? routeList?.loginRoute : routeList.homeRoute,
      hasSubRouet: false
    },
    {
      id: 4,
      icon: ({ color = colors?.grey?.[400] }) => <MyOrderOutline width={24} height={24} fill={color}/>,
      text: 'سفارشات من',
      link: isEmpty(user) ? routeList?.loginRoute : routeList.ordersHistory,
      hasSubRouet: false
    },
    {
      id: 5,
      icon: ({ color = colors?.grey?.[400] }) => <ProfileCircleOutline width={24} height={24} stroke={color}/>,
      text: isEmpty(user) ? 'ورود' : 'پروفایل',
      link: isEmpty(user) ? routeList?.loginRoute : routeList.profile,
      hasSubRouet: true
    }
  ];
};
