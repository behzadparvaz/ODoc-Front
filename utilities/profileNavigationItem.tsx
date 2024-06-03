import { LocationIcon } from "@com/icons";
import { colors } from "@configs/Theme";

export const ProfileNavigationMenuItems = () => {
    return ([
        {
            id: 1,
            icon: <LocationIcon width={24} height={24} stroke={colors?.teal?.[600]} />,
            text: 'آدرس ها',
            link: '/profile/dashboard'
        },

    ])
};