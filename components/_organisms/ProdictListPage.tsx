import React from 'react';
import dynamic from 'next/dynamic';
import { ArrowRightIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import Button from '@com/_atoms/Button';
import { productListPageTexts } from '@com/texts/productListPageTexts';

const ProductCard = dynamic(() => import('@com/_molecules/productCard'));

type Props = {
  products: any;
};

export default function ProdictListPage({ products }: Props) {
  const router = useRouter();
  const searchTerm = router?.query?.search_text;
  const categoryName = router?.query?.categoryName;

  return (
    <div>
      <div className="flex items-center pt-4">
        <div className="mr-4" onClick={() => router?.back()}>
          <ArrowRightIconOutline height={24} width={24} fill={colors.black} />
        </div>
        {searchTerm && (
          <div className="h-[52px] w-full flex items-center bg-grey-200 rounded-lg mx-4">
            <p className="mr-4"></p>
            {searchTerm}
          </div>
        )}
      </div>
      {/* <div className="flex items-center justify-between m-4">
        <span className="text-sm font-medium text-grey-900">داروی کمیاب</span>
        <label className="cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-11 h-6 bg-grey-300 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-grey-600"></div>
        </label>
      </div> */}
      <InfiniteScroll
        scrollableTarget="orderListScrollParent"
        style={{ overflow: 'hidden' }}
        next={() => {
          console.log('sss');
        }}
        hasMore={true}
        loader={<div style={{ height: '100px' }}>'sss'</div>}
        dataLength={5}
      >
        <div className="p-4 space-y-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} hasAddToCartButton />
          ))}
        </div>
      </InfiniteScroll>

      <div
        className={`fixed inset-x-0 px-6 bottom-6 truncate z-10 ${
          shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''
        } `}
      >
        <Button
          className="w-full !rounded-full"
          size="large"
          backgroundColor={colors.black}
          color={colors.white}
          handleClick={() => {
            console.log('clicked');
          }}
        >
          {productListPageTexts?.seeBasket}
        </Button>
      </div>
    </div>
  );
}
