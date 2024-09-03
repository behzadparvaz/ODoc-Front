import {
  HomeFillIcon,
  OrderNotesOutlineIcon,
  ProfileOutlineIcon,
} from '@com/icons';
import { colors } from '@configs/Theme';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const tabs = {
  home: 'خانه',
  orders: 'سفارشها',
  profile: 'پروفایل',
};

enum Routes {
  home = '/app',
  orders = '/app/orders-history',
  profile = '/app/profile',
}

const BottomNavigation = () => {
  const { pathname } = useRouter();

  return (
    <>
      <div className="h-[64px] w-full flex justify-around items-center">
        <a href={Routes.home}>
          <span
            className={classNames(
              'flex flex-col items-center gap-2 text-sm text-grey-500',
              pathname === Routes.home && '!text-black',
            )}
          >
            <HomeFillIcon
              width={24}
              height={24}
              fill={
                pathname === Routes.home ? colors?.black : colors?.grey?.[300]
              }
            />
            {tabs.home}
          </span>
        </a>

        <a href={Routes.orders}>
          <span
            className={classNames(
              'flex flex-col items-center gap-2 text-sm text-grey-500',
              pathname === Routes.orders && '!text-black',
            )}
          >
            <OrderNotesOutlineIcon
              width={24}
              height={24}
              fill={
                pathname === Routes.orders ? colors?.black : colors?.grey?.[300]
              }
            />

            {tabs.orders}
          </span>
        </a>

        <a href={Routes.profile}>
          <span
            className={classNames(
              'flex flex-col items-center gap-2 text-sm text-grey-500',
              pathname === Routes.profile && '!text-black',
            )}
          >
            <ProfileOutlineIcon
              width={24}
              height={24}
              fill={
                pathname === Routes.profile
                  ? colors?.black
                  : colors?.grey?.[300]
              }
            />
            {tabs.profile}
          </span>
        </a>
      </div>
      <div className="w-full h-[21px] flex justify-center items-center px-4">
        <div className="w-[139px] h-[5px] bg-black rounded-full" />
      </div>
    </>
  );
};

export default BottomNavigation;
