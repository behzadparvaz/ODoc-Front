import { useState } from 'react';
import Link from 'next/link';

import { useGetProfile } from '@api/user/user.rq';
import Spinner from '@com/_atoms/Spinner';
import NextImage from '@com/_core/NextImage';
import {
  ExitOutlineIcon,
  HeadsetOutlineIcon,
  InviteFriendsIcon,
  LocationOutline2Icon,
  MessagesIcon,
  Profilefill2Icon,
  ProfileOutline2Icon,
  WalletOutlineIcon,
} from '@com/icons';
import { MainLayout } from '@com/Layout';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { Button } from '@com/_atoms/NewButton';
import useModal from '@hooks/useModal';
import LogoutModal from '@com/_organisms/LogoutModal';

const Profile = () => {
  const { data, isLoading } = useGetProfile();

  const { addModal } = useModal();

  const handleOpenLogoutModal = () => {
    addModal({
      modal: LogoutModal,
    });
  };

  const renderContent = () => {
    if (!isLoading && !!data?.queryResult) {
      return (
        <div className="w-full h-full">
          <div className="w-full h-20 flex gap-x-3 items-center px-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-grey-200 overflow-hidden">
              {data?.queryResult[0]?.imageUrl ? (
                <NextImage
                  src={data?.queryResult[0]?.imageUrl}
                  alt="profile-image"
                  width={48}
                  height={48}
                />
              ) : (
                <Profilefill2Icon width={24} height={24} fill={colors.white} />
              )}
            </div>

            <div className="flex flex-col gap-y-2 items-start">
              <span className="text-xl font-semibold">{`${data?.queryResult[0]?.firstName} ${data?.queryResult[0]?.lastName}`}</span>
              <span className="leading-6 text-sm font-normal">
                {data?.queryResult[0]?.phoneNumber}
              </span>
            </div>
          </div>

          <div className="w-full h-[100px] flex gap-x-3 justify-between items-center px-4 py-2">
            <div className="w-full h-full flex flex-col gap-y-4 justify-center items-center bg-grey-100 rounded-xl cursor-pointer">
              <WalletOutlineIcon width={24} height={24} fill={colors.black} />
              <span className="text-sm font-normal leading-6 text-black">
                کیف پول
              </span>
            </div>

            <Link href={`tel:02196861727`}>
              <div className="w-full h-full flex flex-col gap-y-4 justify-center items-center bg-grey-100 rounded-xl cursor-pointer">
                <HeadsetOutlineIcon
                  width={24}
                  height={24}
                  fill={colors.black}
                />
                <span className="text-sm font-normal leading-6 text-black">
                  پشتیبانی
                </span>
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-y-6 px-5 py-3.5">
            <Link href={routeList?.profileUserInfoRoute}>
              <div className="w-full h-[28px] gap-x-5 flex items-center  cursor-pointer">
                <ProfileOutline2Icon width={24} height={24} />
                <span className="text-md font-medium leading-7 text-black">
                  اطلاعات شخصی
                </span>
              </div>
            </Link>
            <Link href={routeList?.profileAddresses}>
              <div className="w-full h-[28px] gap-x-5 flex items-center  cursor-pointer">
                <LocationOutline2Icon width={24} height={24} />
                <span className="text-md font-medium leading-7 text-black">
                  آدرس های منتخب
                </span>
              </div>
            </Link>

            <div className="w-full h-[28px] gap-x-5 flex items-center  cursor-pointer">
              <MessagesIcon width={24} height={24} />
              <span className="text-md font-medium leading-7 text-black">
                پیام‌ها
              </span>
            </div>

            <div className="w-full h-[28px] gap-x-5 flex items-center  cursor-pointer">
              <InviteFriendsIcon width={24} height={24} />
              <span className="text-md font-medium leading-7 text-black">
                دعوت از دوستان
              </span>
            </div>
          </div>

          <div className="w-full h-[8px] bg-grey-50" />

          <Button
            size="large"
            variant="text"
            className="!px-0"
            onClick={handleOpenLogoutModal}
          >
            <div className="w-full flex gap-x-5 items-center p-5 cursor-pointer">
              <ExitOutlineIcon width={24} height={24} />
              <span className="text-md font-medium leading-7 text-[#E11900]">
                خروج از حساب کاربری
              </span>
            </div>
          </Button>
        </div>
      );
    }
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  };

  return (
    <MainLayout hasBottomNavigation>
      <div className="w-full h-full">{renderContent()}</div>
    </MainLayout>
  );
};
export default Profile;
