import { useRouter } from 'next/router';

import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import { useGetCategoryDescription } from '@api/category/categoryApis.rq';
import { MainLayout } from '@com/Layout';
import DrugShapesBox from '@com/_molecules/DrugShapesBox';
import ProductDetail from '@com/_molecules/ProductDetail';
import ProductSlider from '@com/_molecules/ProductSlider';
import SectionTitle from '@com/_molecules/SectionTitle.nd';

const OtcProductContainer = () => {
  const { query } = useRouter();
  const { data, isLoading } = useGetCategoryDescription(
    String(query?.categoryCode),
  );
  const productDetail: any = data?.queryResult?.[0];
  const productSliderData = productDetail?.imageLinks;
  const { data: basketDatat } = useGetCurrentBasket();

  const renderContent = () => {
    if (isLoading) {
    }
    return (
      <>
        <div className="px-4">
          <div className="flex flex-col gap-y-2 rounded-xl bg-white p-4">
            <ProductSlider
              data={productSliderData}
              className="px-4 bg-white rounded-lg"
            />
          </div>
          <SectionTitle
            title={`${query?.categoryName}`}
            tag="h1"
            className="text-md font-semibold"
          />
        </div>
        <DrugShapesBox productData={basketDatat} />
        <ProductDetail
          data={productDetail}
          className="mt-4 bg-white py-6 px-4"
        />
      </>
    );
  };

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      mainClassName="border-t border-grey-100"
      hasBasketIcon
    >
      <div className="w-ful min-h-[600px] h-full">{renderContent()}</div>
    </MainLayout>
  );
};
export default OtcProductContainer;
