import Link from 'next/link';

import { useGetProfile } from '@api/user/user.rq';
import {
  ExitOutlineIcon,
  HeadsetOutlineIcon,
  LocationOutline2Icon,
  WalletOutlineIcon,
  Profilefill2Icon,
  ProfileOutline2Icon,
} from '@com/icons';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import NextImage from '@com/_core/NextImage';
import Spinner from '@com/_atoms/Spinner';

const ProfileNavigation = () => {
  const { data, isLoading } = useGetProfile();

  if (isLoading) {
    return (
      <div className="bg-red-100 fixed top-0 lef-0 w-[600px] h-[300px] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
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
            <HeadsetOutlineIcon width={24} height={24} fill={colors.black} />
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

        {/* <div className="w-full h-[28px] gap-x-5 flex items-center  cursor-pointer">
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
          </div> */}
      </div>

      <div className="w-full h-[8px] bg-grey-50" />

      <Link href={routeList?.logoutRoute}>
        <div className="w-full flex gap-x-5 items-center p-5 cursor-pointer">
          <ExitOutlineIcon width={24} height={24} />
          <span className="text-md font-medium leading-7 text-[#E11900]">
            خروج از حساب کاربری
          </span>
        </div>
      </Link>
    </>
  );
};

export default ProfileNavigation;
