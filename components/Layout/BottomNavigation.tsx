import {
  HomeFillIcon,
  OrderNotesOutlineIcon,
  ProfileOutlineIcon,
} from '@com/icons';
import { colors } from '@configs/Theme';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';

const tabs: Record<string, string> = {
  home: 'خانه',
  orders: 'سفارش‌ها',
  profile: 'پروفایل',
};

enum Routes {
  HOME = '/app',
  ORDERS = '/app/orders-history?statusId=0',
  PROFILE = '/app/profile',
}

const BottomNavigation: React.FC = () => {
  const { pathname } = useRouter();

  const renderTab = (
    route: Routes,
    label: string,
    Icon: React.FC<{ width?: number; height?: number; fill?: string }>,
  ) => {
    const isActive = pathname === route.split('?')[0];
    const iconColor = isActive ? colors.black : colors.grey[300];

    return (
      <Link
        key={route}
        replace={Routes.HOME === pathname}
        href={route}
        passHref
      >
        <span
          role="button"
          aria-label={label}
          className={classNames(
            'flex flex-col items-center gap-2 text-xs cursor-pointer transition-colors ease-in-out duration-500',
            { '!text-black': isActive, 'text-grey-500': !isActive },
          )}
        >
          <Icon width={24} height={24} fill={iconColor} />
          {label}
        </span>
      </Link>
    );
  };

  const tabItems = useMemo(
    () => [
      { route: Routes.HOME, label: tabs.home, Icon: HomeFillIcon },
      { route: Routes.ORDERS, label: tabs.orders, Icon: OrderNotesOutlineIcon },
      { route: Routes.PROFILE, label: tabs.profile, Icon: ProfileOutlineIcon },
    ],
    [],
  );

  return (
    <div className="h-[76px] pb-2 w-full flex justify-around items-center bg-surface-secondary border-t border-border-primary box-border">
      {tabItems.map(({ route, label, Icon }) => renderTab(route, label, Icon))}
    </div>
  );
};

export default memo(BottomNavigation);
