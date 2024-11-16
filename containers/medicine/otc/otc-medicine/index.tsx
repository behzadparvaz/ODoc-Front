import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import NextImage from '@com/_core/NextImage';
import NextLink from '@com/_core/NextLink';
import OtcMedicineCategories from '@com/_molecules/OtcMedicineCategories';
import { ChevronLeftIconOutline } from '@com/icons';
import { MainLayout } from '@com/Layout';
import { colors } from '@configs/Theme';
import { clearDrugsStateAction } from '@redux/requestDrugs/requestDrugsActions';
import { routeList } from '@routes/routeList';

const SearchBox = dynamic(() => import('@com/_atoms/SearchBox'));

const OtcMedicineContainer = () => {
  const { push, query } = useRouter();
  const dispatch = useDispatch();

  const handleBackButton = () => {
    if (query?.categoryNameLevel1 && query?.categoryCodeLevel1) {
      push('/app/otc-medicine');
    } else {
      push('/app');
    }
  };

  useEffect(() => {
    dispatch(clearDrugsStateAction());
  }, [dispatch]);

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      hasBasketIcon
      title="داروی بدون نسخه"
      backIconHandler={handleBackButton}
    >
      <div className="w-full flex flex-col gap-y-4 pb-10">
        {!query?.categoryNameLevel1 && (
          <div className="px-4 py-2">
            <SearchBox className="px-4" />
          </div>
        )}

        {!Object.keys(query).length && (
          <div className="px-4">
            <NextLink href={routeList?.QuickOrder}>
              <div className="p-3 flex bg-gray-50 items-center rounded-xl text-base gap-x-2">
                <div className="w-[64px] h-[64px] flex items-center justify-center rounded-lg overflow-hidden">
                  <NextImage
                    alt="fast-order"
                    src={'/static/images/staticImages/fast-order.png'}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="w-full flex flex-col gap-4">
                  <span className="text-sm text-content-primary font-medium">
                    چه دارویی نیاز داری؟
                  </span>
                  <span className="text-xs text-content-tertiary font-normal line-clamp-2">
                    در این بخش شما میتوانید عنوان داروی مورد نیازتان را درج کنید
                  </span>
                </div>
                <ChevronLeftIconOutline
                  width={24}
                  height={24}
                  fill={colors?.gray[400]}
                />
              </div>
            </NextLink>
          </div>
        )}

        <OtcMedicineCategories />

        {!query?.categoryNameLevel1 && (
          <div className="w-full px-4">
            <div className="!aspect-w-23 !aspect-h-10">
              <NextImage
                src={'/static/images/staticImages/otc-medicine-banner.png'}
                alt="fast-order"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default OtcMedicineContainer;
