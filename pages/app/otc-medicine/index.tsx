import NextLink from '@com/_core/NextLink';
import Categories from '@com/_molecules/Categories';
import OtcMedicineCategories from '@com/_molecules/OtcMedicineCategories';
import RequestDrugsContainer from '@com/_organisms/RequestDrugsContainer';
import MainPageLayout from '@com/_template/MainPageLayout';
import {
  ChevronLeftIconOutline,
  ListWithTimer,
  SearchIconOutline,
} from '@com/icons';
import { MainLayout } from '@com/Layout';
import { quickOrderText } from '@com/texts/quickOrderText';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

const OtcMedicinePage = () => {
  const { push, query } = useRouter();

  const handleBackButton = () => {
    if (query?.categoryNameLevel1 && query?.categoryCodeLevel1) {
      push('/app/otc-medicine');
    } else {
      push('/app');
    }
  };

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

        {Object.keys(query).length < 1 ? (
          <div className="px-4">
            <h1 className="text-lg font-bold my-3">ثبت درخواست دارو</h1>
            <RequestDrugsContainer />
          </div>
        ) : null}

        <div className="px-2">
          <OtcMedicineCategories />
        </div>
      </div>
      <div className="px-4">
        <NextLink href={routeList?.QuickOrder}>
          <a className="px-4 flex bg-gray-50 justify-between items-center rounded-xl py-6 text-lg mb-8">
            <ListWithTimer width={20} height={20} fill={colors?.black} />
            {quickOrderText?.quickOrderHelp}
            <ChevronLeftIconOutline
              width={20}
              height={20}
              fill={colors?.gray[400]}
            />
          </a>
        </NextLink>
      </div>
    </MainLayout>
  );
};

export default OtcMedicinePage;
