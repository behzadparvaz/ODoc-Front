import dynamic from 'next/dynamic';
import VerticalProductCard from './VerticalProductCard';

import Spinner from '@com/_atoms/Spinner';
import {
  useGetCategtyL2Products,
  useGetFilteredProductsByShapes,
} from '@api/product/productApis.rq';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));

type OtcCategoryLevel3ProductsDataModel = {
  categoryLevel3: string;
  imageLink: string;
  irc: string;
  productName: string;
  shapeCode: number;
  shapeName: string;
};

type OtcproductsSliderProps = {
  categoryCode: string;
  filteredShapesCode?: number;
};

const OtcProductsSlider = ({
  categoryCode,
  filteredShapesCode,
}: OtcproductsSliderProps) => {
  const { data, isLoading } = useGetCategtyL2Products(categoryCode);
  const { data: filteredData } = useGetFilteredProductsByShapes(
    categoryCode,
    filteredShapesCode,
  );

  const renderProducts = () => {
    if (isLoading)
      return (
        <Spinner className="h-full min-h-[400px] w-full flex justify-center items-center" />
      );

    if (!isLoading && filteredData?.queryResult?.length === 0) {
      return (
        <span className="w-full h-[104px] flex justify-center items-center">
          آیتمی با این شکل دارویی موجود نیست
        </span>
      );
    }

    if (filteredData?.queryResult?.length > 0) {
      return (
        <>
          {filteredData?.queryResult?.map(
            (item: OtcCategoryLevel3ProductsDataModel, index) => {
              return (
                <VerticalProductCard
                  hasAddToCart={true}
                  productData={item}
                  key={index}
                />
              );
            },
          )}
        </>
      );
    }

    return (
      <>
        {data?.queryResult?.map(
          (item: OtcCategoryLevel3ProductsDataModel, index) => {
            return (
              <VerticalProductCard
                hasAddToCart={true}
                productData={item}
                key={index}
              />
            );
          },
        )}
      </>
    );
  };

  return (
    <div className="w-full">
      <ScrollSlider className="px-2">{renderProducts()}</ScrollSlider>
    </div>
  );
};

export default OtcProductsSlider;
