import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import { useGetCategoryDescription } from '@api/category/categoryApis.rq';
import { MainLayout } from '@com/Layout';
import DrugShapesBox from '@com/_molecules/DrugShapesBox';
import ProductDetail from '@com/_molecules/ProductDetail';
import ProductSlider from '@com/_molecules/ProductSlider';
import SectionTitle from '@com/_molecules/SectionTitle.nd';
import { BasketIconOutline } from '@com/icons';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

const OtcProductContainer = () => {
  const { back, query, push } = useRouter();
  const { data, isLoading } = useGetCategoryDescription(
    String(query?.categoryCode),
  );
  const productDetail: any = data?.queryResult?.[0];
  const productSliderData = productDetail?.imageLinks;
  const { data: basketDatat } = useGetCurrentBasket();

  const renderBasketCount = () => {
    const rxCount = basketDatat?.refrenceNumber ? 1 : 0;
    if (!!basketDatat?.products?.length) {
      return basketDatat?.products?.length + rxCount;
    }
    return rxCount;
  };

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      mainClassName="border-t border-grey-100"
      hasBasketIcon
    >
      <div className="w-ful min-h-[600px] h-full">
        {isLoading === false ? (
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
        ) : null}
      </div>
    </MainLayout>
  );
};
export default OtcProductContainer;
