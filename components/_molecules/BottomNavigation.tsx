import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import { BottomNavigationMenuItems } from '@utilities/staticNavigationItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import RXRegistration from '@com/_organisms/RXRegistration';

const BottomNavigation = () => {
  const navigationMenuItems = BottomNavigationMenuItems();
  const { asPath } = useRouter();
  const { addModal } = useModal();

  const showRxRegistrationModal = () => {
    addModal({
      modal: RXRegistration,
    });
  };

  return (
    <div
      className={`w-full pt-1 px-6 border-t flex justify-center bg-grey-0 border-grey-100 z-999 ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''} fixed inset-x-0 bottom-0`}
    >
      {navigationMenuItems?.map((item, index) => {
        const activeItem = item?.hasSubRouet
          ? asPath.includes(item?.link)
          : asPath === item?.link;

        // TODO: We need to find the main item in a list if it was exist
        const isMainItem =
          navigationMenuItems.length % 2 !== 0 &&
          Math.floor(navigationMenuItems.length / 2) === index;

        return isMainItem ? (
          <div key={index} className="p-3 bg-grey-0 rounded-full -mt-4 mx-3">
            <a
              className={`flex text-xs ${activeItem ? 'bg-teal-800' : 'bg-teal-600'} rounded-full p-2.5`}
              onClick={showRxRegistrationModal}
            >
              {item.icon({})}
            </a>
          </div>
        ) : (
          <Link href={item?.link} key={item?.id}>
            <span className="flex-col flex-1 text-xs py-1">
              <div className="flex justify-center">
                <span className={`px-2`}>
                  <span
                    className={`${activeItem ? '' : 'brightness-0 opacity-40'}`}
                  >
                    {item.icon({
                      color: activeItem ? colors.teal['700'] : undefined,
                    })}
                  </span>
                </span>
              </div>
              <div
                className={`flex justify-center pt-0.5 text-[10px] text-grey-400`}
              >
                {item?.text}
              </div>
            </span>
          </Link>
        );
      })}
    </div>
  );
};
export default BottomNavigation;
