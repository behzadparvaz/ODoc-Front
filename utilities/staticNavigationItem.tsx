import { LocationIcon } from "@com/icons";
import { colors } from "@configs/Theme";

export const ProfileNavigationMenuItems = () => {
    return ([
        {
            id: 1,
            icon: <LocationIcon width={24} height={24} stroke={colors?.teal?.[600]} />,
            text: 'آدرس ها',
            link: '/profile/address-list'
        },
        {
            id: 2,
            icon: <LocationIcon width={24} height={24} stroke={colors?.teal?.[600]} />,
            text: 'تنظیمات رمز عبور',
            link: '/profile/password-setting'
        },

    ])
};
export const BottomNavigationMenuItems = () => {
    return ([
        {
            id: 1,
            icon: <LocationIcon width={24} height={24} stroke={colors?.teal?.[600]} />,
            text: 'خانه',
            link: '/',
            hasSubRouet:false
        },
        {
            id: 2,
            icon: <LocationIcon width={24} height={24} stroke={colors?.teal?.[600]} />,
            text: 'پروفایل',
            link: '/profile',
            hasSubRouet:true

        },
        {
            id: 3,
            icon: <LocationIcon width={24} height={24} stroke={colors?.teal?.[600]} />,
            text: 'سفارش ها',
            link: '/orders',
            hasSubRouet:false
        },

    ])
};