import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import Spinner from '@com/_atoms/Spinner';
import {
  useGetCategtyL2Products,
  useGetFilteredProductsByShapes,
} from '@api/product/productApis.rq';
import { ArrowLeftIconOutline } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';

import VerticalProductCard from './VerticalProductCard';
import { useEffect } from 'react';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));

type Level2DataModel = {
  categoryCodeLevel2: string;
  categoryNameLevel2: string;
};

export type Level3ProductsDataModel = {
  categoryLevel3: string;
  imageLink: string;
  irc: string;
  productName: string;
  shapeCode: number;
  shapeName: string;
  unit?: string;
};

type OtcproductsSliderProps = {
  category: Level2DataModel;
  filteredShapesCode?: number;
  updateTotalProducts?: (number) => void;
};

const OtcProductsSlider = ({
  category,
  filteredShapesCode,
  updateTotalProducts,
}: OtcproductsSliderProps) => {
  const { data, isLoading } = useGetCategtyL2Products(
    category?.categoryCodeLevel2,
  );
  const { data: filteredData } = useGetFilteredProductsByShapes(
    category?.categoryCodeLevel2,
    filteredShapesCode,
  );

  const handleUpdateTotalProducts = (count: number) => {
    updateTotalProducts?.(count);
  };

  useEffect(() => {
    handleUpdateTotalProducts(data?.totalCount);
  }, [data?.totalCount]);

  const renderProducts = () => {
    if (isLoading)
      return (
        <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
      );

    if (!isLoading && data?.queryResult?.length === 0) {
      return (
        <div className="w-full h-[194px] flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <Image
              src={'/static/images/staticImages/search-empty-content.png'}
              width={64}
              height={64}
              alt="product-not-found"
            />
          </div>
          <span className="text-md">محصولی موجود نیست</span>
        </div>
      );
    }

    if (!isLoading && filteredData && filteredData?.queryResult?.length === 0) {
      return (
        <div className="w-full h-[194px] flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <Image
              src={'/static/images/staticImages/search-empty-content.png'}
              width={64}
              height={64}
              alt="product-not-found"
            />
          </div>
          <span className="text-md">محصولی با این شکل دارویی موجود نیست</span>
        </div>
      );
    }

    if (filteredData?.queryResult?.length > 0) {
      return (
        <>
          {filteredData?.queryResult?.map(
            (item: Level3ProductsDataModel, index) => {
              return (
                <VerticalProductCard
                  hasAddToCart={true}
                  productData={item}
                  key={index}
                  className="w-[180px] h-[212px] border-l border border-primary"
                />
              );
            },
          )}
          <Link
            href={`/app/product/${category?.categoryCodeLevel2}?categoryName=${category?.categoryNameLevel2}`}
          >
            <div className="w-[157px] h-[198px] flex flex-col items-center justify-center cursor-pointer">
              <span className="bg-grey-100 h-8 w-8 rounded-full flex justify-center items-center">
                <ArrowLeftIconOutline width={20} height={20} fill="#000" />
              </span>
              <span className="text-sm font-medium pt-4">
                {generalTexts?.viewAll}
              </span>
            </div>
          </Link>
        </>
      );
    }

    return (
      <>
        {data?.queryResult?.map((item: Level3ProductsDataModel, index) => {
          return (
            <VerticalProductCard
              hasAddToCart={true}
              productData={item}
              key={index}
              className="w-[180px] h-[212px] border-l border-primary"
            />
          );
        })}
        <Link
          href={`/app/product/${category?.categoryCodeLevel2}?categoryName=${category?.categoryNameLevel2}`}
        >
          <div className="w-[157px] h-[198px] flex flex-col items-center justify-center cursor-pointer">
            <span className="bg-grey-100 h-8 w-8 rounded-full flex justify-center items-center">
              <ArrowLeftIconOutline width={20} height={20} fill="#000" />
            </span>
            <span className="text-sm font-medium pt-4">
              {generalTexts?.viewAll}
            </span>
          </div>
        </Link>
      </>
    );
  };

  return (
    <ScrollSlider className="h-full pt-2 pb-4 gap-x-4">
      {renderProducts()}
    </ScrollSlider>
  );
};

export default OtcProductsSlider;
