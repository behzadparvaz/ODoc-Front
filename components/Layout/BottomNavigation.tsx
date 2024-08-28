import classNames from 'classnames';

const tabs = {
  home: 'خانه',
  orders: 'سفارشها',
  profile: 'پروفایل',
};

enum Routes {
  home = '/',
  orders = '/orders-history',
  profile = '/profile',
}

type BottomNavigationProps = {
  pathname: string;
};

const BottomNavigation = ({ pathname }: BottomNavigationProps) => {
  return (
    <div className="h-full w-full flex justify-around items-center">
      <a href={Routes.home}>
        <span
          className={classNames(
            'text-sm text-grey-950',
            pathname === Routes.home && 'text-orange-300',
          )}
        >
          {tabs.home}
        </span>
      </a>

      <a href={Routes.orders}>
        <span
          className={classNames(
            'text-sm',
            pathname === Routes.orders && 'text-orange-500',
          )}
        >
          {tabs.orders}
        </span>
      </a>

      <a href={Routes.profile}>
        <span
          className={classNames(
            'text-sm',
            pathname === Routes.profile && 'text-orange-500',
          )}
        >
          {tabs.profile}
        </span>
      </a>
    </div>
  );
};

export default BottomNavigation;
