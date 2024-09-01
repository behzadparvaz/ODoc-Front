'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ProfileNavigationMenuItems } from '@utilities/staticNavigationItem';
import { useRouter } from 'next/router';
import { profileText } from '@com/texts/profileText';
import {} from '@com/texts/profileText';
import { generalTexts } from '@com/texts/generalTexts';
import NextLink from '@com/_core/NextLink';
import { useGetProfile } from '@api/user/user.rq';
import Button from '@com/_atoms/Button';
import { ExitIcon, HeadsetIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';

export default function ProfileNavigation({ className = '' }) {
  const navigaitionItemsVal = ProfileNavigationMenuItems();
  const { asPath, push } = useRouter();
  const { data, isLoading: profileDataLoding } = useGetProfile();
  const profileData: any = data;
  const profileInfo = profileData?.queryResult[0];
  return (
    <div
      className={`${className} bg-white w-full sticky right-0 top-20 px-4 rounded-t-2xl shadowMdBlue profile-navigation`}
    >
      <div className="w-full">
        <div className="w-full text-center">
          <Image
            alt="profileImage"
            width={128}
            height={128}
            src={'/static/images/staticImages/sample-avatar.svg'}
            className={'inline-block mb-1 rounded-full'}
            priority
          />
          <p className="text-grey-600 text-sm font-medium text-center truncate h-5">
            {profileDataLoding === false
              ? profileInfo
                ? `${profileInfo?.firstName} ${profileInfo?.lastName}`
                : 'فاقد اطلاعات '
              : ''}
          </p>

          <Button
            isLoading={profileDataLoding}
            handleClick={() => {
              push(routeList.profileUserInfoRoute);
            }}
            className="w-full mt-3"
            size="large"
            buttonType="contained"
            variant={profileInfo ? 'secondary' : 'primary'}
          >
            {!profileDataLoding
              ? profileInfo
                ? 'ویرایش اطلاعات کاربری'
                : profileText?.registerUserInfo
              : ''}
          </Button>
        </div>
      </div>
      <ul className="w-full items">
        {navigaitionItemsVal?.map((item: any) => {
          const isActive = asPath === item?.link;
          return (
            <div key={item?.id}>
              <li
                className={`${isActive ? ' text-teal-700 active' : 'text-grey-500'} w-full py-2 text-md relative border-b border-grey-100`}
              >
                <NextLink href={item?.link}>
                  <a
                    className={`${isActive ? 'cursor-default' : ''} py-2 gap-x-1 relative flex transition-all duration-200`}
                  >
                    {item?.icon}
                    {item?.text}
                  </a>
                </NextLink>
              </li>
            </div>
          );
        })}

        <li
          className="flex justify-between items-center text-grey-500 w-full py-4 text-md relative border-b border-grey-100 cursor-pointer"
          onClick={() => window.open('tel:02196861727')}
        >
          <div className="flex">
            <HeadsetIconOutline
              width={20}
              height={20}
              fill={colors.teal[600]}
            />
            <p className="mr-1">تماس با پشتیبانی</p>
          </div>
          <p className="ml-2">021-96861727</p>
        </li>

        <li className={` mb-3 py-2 block mx-auto text-md relative`}>
          <Link href={routeList?.logoutRoute}>
            <a
              className={`text-red-600 z-10 py-2 flex items-center gap-x-2 relative transition-all duration-200`}
            >
              <ExitIcon width={24} height={24} fill={colors?.red[600]} />
              {generalTexts.logout}
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
