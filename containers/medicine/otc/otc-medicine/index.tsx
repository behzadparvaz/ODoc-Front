import NextLink from '@com/_core/NextLink';
import Categories from '@com/_molecules/Categories';
import OtcMedicineCategories from '@com/_molecules/OtcMedicineCategories';
import RequestDrugsContainer from '@com/_organisms/RequestDrugsContent';
import {
  ChevronLeftIconOutline,
  ListWithTimer,
  SearchIconOutline,
} from '@com/icons';
import { MainLayout } from '@com/Layout';
import { quickOrderText } from '@com/texts/quickOrderText';
import { colors } from '@configs/Theme';
import { clearDrugsStateAction } from '@redux/requestDrugs/requestDrugsActions';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
      leftSection={
        <div
          className="flex items-center w-[22px] cursor-pointer"
          onClick={() => push(routeList.mobileSearch)}
        >
          <SearchIconOutline width={22} height={22} fill={'#000'} />
        </div>
      }
    >
      <div className="w-full flex flex-col gap-y-4 pt-4 mb-5 px-2">
        <Categories />
        {!Object.keys(query).length && (
          <div className="px-4">
            <NextLink href={routeList?.QuickOrder}>
              <span className="px-4 flex bg-gray-50 justify-between  items-center rounded-xl py-4 text-lg">
                <div className="flex items-center gap-4">
                  <ListWithTimer width={20} height={20} fill={colors?.black} />
                  {quickOrderText?.quickOrderHelp}
                </div>
                <ChevronLeftIconOutline
                  width={20}
                  height={20}
                  fill={colors?.gray[400]}
                />
              </span>
            </NextLink>
          </div>
        )}
        <div className="px-2">
          <OtcMedicineCategories />
        </div>
      </div>
    </MainLayout>
  );
};

export default OtcMedicineContainer;
