import {
  HomeFillIcon,
  OrderNotesOutlineIcon,
  ProfileOutlineIcon,
} from '@com/icons';
import { colors } from '@configs/Theme';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { memo } from 'react';

const tabs: Record<string, string> = {
  home: 'خانه',
  orders: 'سفارش‌ها',
  profile: 'پروفایل',
};

enum Routes {
  home = '/app',
  orders = '/app/orders-history',
  profile = '/app/profile',
}

const BottomNavigation: React.FC = () => {
  const { pathname, push } = useRouter();

  const handleTabClick = (route: Routes) => {
    if (pathname !== route) {
      push(route);
    }
  };

  const renderTab = (
    route: Routes,
    label: string,
    Icon: React.FC<{ width?: number; height?: number; fill?: string }>,
  ) => (
    <span
      onClick={() => handleTabClick(route)}
      aria-label={label}
      className={classNames(
        'flex flex-col items-center gap-2 text-xs cursor-pointer transition-colors ease-in-out duration-500',
        pathname === route ? '!text-black' : 'text-grey-500',
      )}
    >
      <Icon
        width={24}
        height={24}
        fill={pathname === route ? colors?.black : colors?.grey?.[300]}
      />
      {label}
    </span>
  );

  return (
    <div className="h-[76px] pb-2 w-full flex justify-around items-center bg-surface-secondary border-t border-border-primary box-border">
      {renderTab(Routes.home, tabs.home, HomeFillIcon)}
      {renderTab(Routes.orders, tabs.orders, OrderNotesOutlineIcon)}
      {renderTab(Routes.profile, tabs.profile, ProfileOutlineIcon)}
    </div>
  );
};

export default memo(BottomNavigation);
