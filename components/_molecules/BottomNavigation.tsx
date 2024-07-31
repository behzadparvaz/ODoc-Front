import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode
} from '@configs/ControlMobileView';
import { BottomNavigationMenuItems } from '@utilities/staticNavigationItem';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BottomNavigation = () => {
  const navigationMenuItems = BottomNavigationMenuItems();
  const { asPath } = useRouter();
  return (
    <div className={`w-full py-1 border-t flex bg-grey-0 border-grey-100 z-999 ${ shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : '' } fixed inset-x-0 bottom-0`}>
      {navigationMenuItems?.map((item, index) => {
        const activeItem = item?.hasSubRouet
          ? asPath.includes(item?.link)
          : asPath === item?.link;

        // TODO: We need to find the main item in a list if it was exist
        const isMainItem = navigationMenuItems.length % 2 !== 0 && Math.floor(navigationMenuItems.length / 2) === index;

        return isMainItem ?
          (
            <div className="p-3 bg-grey-0 rounded-full -mt-4">
              <Link href={item?.link} key={item?.id}>
                <a className="flex text-sm bg-primary rounded-full p-3">
                  <span className={`${activeItem ? '' : 'brightness-0 opacity-40'}`}>
                    {item?.icon}
                  </span>
                </a>
              </Link>
            </div>
          )
          : (
            <Link href={item?.link} key={item?.id}>
              <a className="flex-col text-sm flex-1 py-1">
                <div className="flex justify-center">
                <span className={`px-3`}>
                  <span
                    className={`${activeItem ? '' : 'brightness-0 opacity-40'}`}
                  >
                    {item?.icon}
                  </span>
                </span>
                </div>
                <div
                  className={`flex justify-center text-xs ${activeItem ? 'text-teal-700 font-semibold ' : 'text-grey-400 '}`}>
                  {item?.text}
                </div>
              </a>
            </Link>
          );
      })}
    </div>
  );
};
export default BottomNavigation;
