import { useGetProfile } from '@api/user/user.rq';
import { Button } from '@com/_atoms/NewButton';
import NextImage from '@com/_core/NextImage';
import LogoutModal from '@com/_organisms/LogoutModal';
import { MainLayout } from '@com/Layout';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import { routeList } from '@routes/routeList';
import Icon from '@utilities/icon';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';
import pkg from '../../../package.json';
interface ILinkItem {
  iconName: string;
  label: string;
  isDisabled?: boolean;
}

interface IActionButton {
  iconName: string;
  label: string;
  isDisabled?: boolean;
  onClick?: () => void;
}
interface IMenuItem {
  icon: string;
  label: string;
  disabled: boolean;
  href?: string;
}

const ProfileContainer = () => {
  const { data, isLoading } = useGetProfile({
    enabled: true,
    refetchOnMount: true,
  });
  const { addModal } = useModal();
  const menuItems: IMenuItem[] = useMemo(
    () => [
      {
        icon: 'Person',
        label: 'اطلاعات شخصی',
        disabled: false,
        href: routeList?.profileUserInfoRoute,
      },
      {
        icon: 'PinCircle',
        label: 'آدرس های منتخب',
        disabled: false,
        href: routeList?.profileAddresses,
      },
      {
        icon: 'Envelope',
        label: 'پیام‌ها',
        disabled: true,
      },
      {
        icon: 'PersonTwo',
        label: 'دعوت از دوستان',
        disabled: true,
      },
    ],
    [],
  );

  const handleOpenLogoutModal = useCallback(() => {
    addModal({ modal: LogoutModal });
  }, [addModal]);

  const renderProfileImage = (imageUrl: string) =>
    imageUrl ? (
      <NextImage src={imageUrl} alt="Profile Image" width={48} height={48} />
    ) : (
      <Icon name="PersonFill" width={1.5} height={1.5} fill={colors.white} />
    );

  const LinkItem = ({ iconName, label, isDisabled }: ILinkItem) => (
    <div
      className={`w-full h-[28px] gap-x-5 flex items-center cursor-pointer ${isDisabled ? 'text-grey-400' : 'text-black'}`}
    >
      <Icon
        name={iconName}
        width={1.5}
        height={1.5}
        fill={isDisabled ? colors.grey[400] : colors.black}
      />
      <span
        className={`text-md font-medium leading-7 ${isDisabled ? 'text-grey-400' : 'text-black'}`}
      >
        {label}
      </span>
    </div>
  );

  const renderUserInfo = useMemo(() => {
    const user = data?.queryResult[0];
    return (
      <div className="flex flex-col gap-y-2 items-start">
        <span className="text-xl font-semibold">{`${user?.firstName || ''} ${user?.lastName || ''}`}</span>
        <span className="leading-6 text-xs font-normal">
          {user?.phoneNumber}
        </span>
      </div>
    );
  }, [data]);

  const renderActionButton = useCallback(
    ({ iconName, label, onClick, isDisabled = false }: IActionButton) => (
      <div
        className={`h-full bg-grey-100 flex flex-col gap-y-4 justify-center items-center rounded-xl cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'text-black'}`}
        onClick={!isDisabled ? onClick : undefined}
        role={isDisabled ? 'button' : undefined}
        aria-disabled={isDisabled}
      >
        <Icon
          name={iconName}
          width={1.5}
          height={1.5}
          fill={isDisabled ? colors.grey[400] : colors.grey[600]}
        />
        <span
          className={`text-xs font-normal leading-6 ${isDisabled ? 'text-grey-400' : 'text-black'}`}
        >
          {label}
        </span>
      </div>
    ),
    [],
  );

  const renderLinks = useMemo(
    () => (
      <>
        {menuItems.map((item, index) => (
          <Link href={item.disabled ? '' : item?.href} key={index}>
            <LinkItem
              iconName={item.icon}
              label={item.label}
              isDisabled={item.disabled}
            />
          </Link>
        ))}
      </>
    ),
    [],
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full flex flex-col">
          <div className="w-full flex px-2 mt-4">
            <div className="flex justify-center items-center p-2">
              <div className="w-12 h-12 bg-surface-secondary animate-pulse rounded-full" />
            </div>
            <div className="w-full flex gap-y-4 flex-col mx-2">
              <div className="w-full h-[24px] bg-surface-secondary animate-pulse rounded-lg" />
              <div className="w-32 h-[20px] bg-surface-secondary animate-pulse rounded-lg" />
            </div>
          </div>
          <div className="flex gap-x-4 mx-4 mt-5">
            <div className="w-1/2 h-[84px] bg-surface-secondary animate-pulse rounded-lg" />
            <div className="w-1/2 h-[84px] bg-surface-secondary animate-pulse rounded-lg" />
          </div>
          <div className="flex flex-col w-full gap-y-4 px-2 mt-5">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="w-full h-[40px] bg-surface-secondary animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      );
    }

    if (!data?.queryResult) return null;

    return (
      <>
        <div className="w-full h-20 flex gap-x-3 items-center px-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-grey-200 overflow-hidden">
            {renderProfileImage(data.queryResult[0]?.imageUrl)}
          </div>
          {renderUserInfo}
        </div>
        <div className="w-full h-[100px] flex gap-x-3 justify-between items-center px-4 py-2">
          <div className="w-1/2 h-full">
            {renderActionButton({
              iconName: 'Wallet',
              label: 'کیف پول',
              isDisabled: true,
            })}
          </div>
          <Link href={`tel:02141630500`} className="w-1/2 h-full">
            {renderActionButton({
              iconName: 'Headphone',
              label: 'پشتیبانی',
            })}
          </Link>
        </div>
        <div className="flex flex-col gap-y-6 px-5 py-3.5">{renderLinks}</div>
        <Button
          size="large"
          variant="text"
          className="!px-0"
          onClick={handleOpenLogoutModal}
        >
          <div className="w-full flex gap-x-5 items-center cursor-pointer px-4">
            <Icon
              name="ArrowRightFromLine"
              width={1.5}
              height={1.5}
              fill={colors.red[400]}
            />
            <span className="text-md font-medium leading-7 text-red-400">
              خروج از حساب کاربری
            </span>
          </div>
        </Button>
      </>
    );
  };

  return (
    <MainLayout hasBottomNavigation>
      <div className="w-full h-[calc(100%-35px)]">{renderContent()}</div>
      <div>
        <div className="flex flex-row-reverse justify-center items-center w-full text-center gap-2">
          <div className="flex flex-col tracking-[4px] leading-[15px] text-xs text-gray-300">
            <span>TAPSI</span>
            <span>DOCTOR</span>
          </div>
          <span className="font-sans text-xs text-orange-400 tracking-[3.25px]">
            V{pkg?.version}
          </span>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileContainer;
