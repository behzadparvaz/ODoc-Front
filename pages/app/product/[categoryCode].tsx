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

const Product = () => {
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
      hasBackButton
      mainClassName="border-t border-grey-100"
      leftIcon={
        <div
          className="w-[52px] h-[52px] my-4 cursor-pointer relative flex justify-center items-center"
          onClick={() => push(routeList.basket)}
        >
          {(!!basketDatat?.products?.length || basketDatat?.refrenceNumber) && (
            <span className="absolute right-0 top-1 !w-5 !h-5 border border-white rounded-full bg-surface-negative text-base z-10 text-white flex justify-center items-center">
              {renderBasketCount()}
            </span>
          )}
          <BasketIconOutline width={24} height={24} fill={'#000'} />
        </div>
      }
    >
      <div className="w-ful min-h-[600px] h-full">
        {isLoading === false ? (
          <>
            <div className="px-4">
              <div className="flex flex-col gap-y-2 rounded-xl bg-white p-4">
                <ProductSlider
                  data={productSliderData}
                  className="px-4 bg-white rounded-2xl"
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
export default Product;
