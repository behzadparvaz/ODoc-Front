import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import {
  useAddProductToBasket,
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { useGetProductsFromSearch } from '@api/product/productApis.rq';
import AddButton from '@com/_atoms/AddButton';
import { Button } from '@com/_atoms/NewButton';
import NextImage from '@com/_core/NextImage';
import { CloseIconOutline } from '@com/icons';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import Divider from '@com/_atoms/Divider';

type ProductDetailDosesModel = {
  dose: string;
  irc: string;
  imageLink?: string;
};

const ProductPageContainer = () => {
  const { query, push, back } = useRouter();

  const { data, isLoading } = useGetProductsFromSearch({
    brandName: query?.brandName as string,
    categoryCodeLevel3: query?.categoryCodeLevel3 as string,
    irc: query?.irc as string,
  });
  const { data: basketDatat, refetch: refetchGetBasket } =
    useGetCurrentBasket();

  const { mutate: addToCart, isPending: isAddingToCart } =
    useAddProductToBasket({
      onSuccess: () => {
        refetchGetBasket();
      },
    });

  const { mutate: popProductOfCart } = useDeleteProductBasket({
    onSuccess: () => {
      refetchGetBasket();
    },
  });

  const warningRef = useRef(null);
  const adverseEffectsRef = useRef(null);

  const basketFilteredProducts = basketDatat?.products?.filter((item) =>
    data?.drugDoses?.some((product) => product?.irc === item?.irc),
  );
  const [selectedItem, setSelectedItem] = useState<ProductDetailDosesModel>();

  const handleChangeCount = (count: number) => {
    if (count > 0) {
      addToCart({
        irc: selectedItem?.irc,
        quantity: count,
        imageLink: data?.imageLink,
        productName: data?.name,
        unit: data?.unit,
      });
    } else {
      popProductOfCart({ type: 'IRC', irc: selectedItem?.irc });
    }
  };

  const handleSelectDose = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    setSelectedItem(data?.drugDoses?.[0]);
  }, [data]);

  const renderBottomSection = () => {
    if (isLoading) {
      return (
        <div className="bg-surface-background-secondary animate-pulse h-full w-full rounded-full" />
      );
    }

    if (!isLoading) {
      if (!data?.isOtc) {
        return (
          <div className="bg-surface-warning flex justify-center items-center h-full w-full ">
            <span className="text-content-onWarning">
              سفارش این دارو فقط با نسخه پزشک امکان پذیر است
            </span>
          </div>
        );
      }

      const selectedDoseCount = basketFilteredProducts?.find(
        (item) => item?.irc === selectedItem?.irc,
      )?.quantity;

      return (
        <div className="flex justify-between items-center h-full w-full ">
          {selectedDoseCount ? (
            <>
              <div className="flex px-4 py-4">
                <AddButton
                  unitName={data.unit}
                  count={
                    basketFilteredProducts?.find(
                      (item) => item?.irc === selectedItem?.irc,
                    )?.quantity
                  }
                  onChangeCount={handleChangeCount}
                  isLoading={isAddingToCart}
                  className="px-2 py-2"
                />
              </div>
              <Button
                variant="primary"
                size="large"
                className="w-1/2 whitespace-nowrap bg-[linear-gradient(91.39deg,_#FF7733_0%,_#FF5722_50.15%,_#E64917_100%)]"
                onClick={() => push(routeList.basket)}
              >
                مشاهده سبد خرید
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="large"
              className="w-full bg-[linear-gradient(91.39deg,_#FF7733_0%,_#FF5722_50.15%,_#E64917_100%)]"
              onClick={() =>
                addToCart({
                  quantity: 1,
                  irc: selectedItem?.irc,
                  imageLink: data?.imageLink,
                  productName: data?.productName,
                  unit: data?.unit,
                })
              }
            >
              افزودن به سبد خرید
            </Button>
          )}
        </div>
      );
    }
  };

  const sectionShimmer = () => {
    return (
      <>
        <Divider className="h-2 animate-pulse" padding={0} />

        <div className="animate-pulse flex flex-col gap-y-1 px-4 py-3">
          <div className="w-[86px] h-[24px] bg-surface-secondary rounded-xl mb-2" />
          <div className="w-full h-[18px] bg-surface-secondary rounded-xl" />
          <div className="w-full h-[18px] bg-surface-secondary rounded-xl" />
          <div className="w-full h-[18px] bg-surface-secondary rounded-xl" />
          <div className="w-full h-[18px] bg-surface-secondary rounded-xl" />
        </div>
      </>
    );
  };

  const renderContent = () => {
    return (
      <div className="overflow-auto pb-[84px]">
        <div className="flex flex-col p-4 gap-y-4">
          <div className="flex justify-center items-center rounded-xl overflow-hidden">
            {isLoading ? (
              <div className="w-[140px] h-[140px] bg-surface-secondary animate-pulse rounded-xl" />
            ) : (
              <NextImage
                src={data?.imageLink}
                width={140}
                height={140}
                alt="product-page-image"
              />
            )}
          </div>
          <span className="w-full text-sm text-content-primary text-bold">
            {isLoading ? (
              <div className="w-[100px] h-8 bg-surface-secondary animate-pulse rounded-xl" />
            ) : (
              data?.productName
            )}
          </span>
          <span className="text-xs text-content-tertiary">دوز دارو</span>
          <div className="flex items-center gap-x-2">
            <div
              onClick={() => handleSelectDose(data?.drugDoses?.[0])}
              className={classNames(
                'min-w-[86px] h-[42px] w-max flex justify-between items-center py-2 px-4 border border-border-primary rounded-full cursor-pointer',
                selectedItem?.irc === data?.drugDoses?.[0]?.irc &&
                  'border-[1.5px] border-border-inversePrimary bg-surface-secondary',
                isLoading && ' bg-surface-secondary animate-pulse',
              )}
            >
              {data?.drugDoses?.[0]?.dose}
            </div>
          </div>
        </div>

        {isLoading ? (
          <>{sectionShimmer()}</>
        ) : (
          <>
            {data?.medicalUses && (
              <>
                <Divider className="h-2" padding={0} />

                <div className="w-full p-4 flex flex-col gap-y-4">
                  <div className="w-full flex flex-col gap-y-4">
                    <span className="text-sm text-semibold text-content-primary">
                      موارد مصرف
                    </span>
                    <span className="text-xs text-normal text-content-tertiary">
                      {data?.medicalUses}
                    </span>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {isLoading ? (
          <>{sectionShimmer()}</>
        ) : (
          <>
            {data?.warning && (
              <>
                <Divider className="h-2" padding={0} />

                <div
                  className="w-full p-4 flex flex-col gap-y-4"
                  id="warning"
                  ref={warningRef}
                >
                  <span className="text-sm text-semibold text-content-primary">
                    هشدارها
                  </span>
                  <span className="text-xs text-normal text-content-tertiary">
                    {data?.warning}
                  </span>
                </div>
              </>
            )}
          </>
        )}

        {isLoading ? (
          <>{sectionShimmer()}</>
        ) : (
          <>
            {data?.adverseEffects && (
              <>
                <Divider className="h-2" padding={0} />

                <div
                  className="w-full p-4 flex flex-col gap-y-4"
                  id="adverseEffects"
                  ref={adverseEffectsRef}
                >
                  <span className="text-sm text-semibold text-content-primary">
                    عوارض جانبی
                  </span>
                  <span className="text-xs text-normal text-content-tertiary">
                    {data?.adverseEffects}
                  </span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBasketIcon
      rightIcon={
        <span onClick={() => back()} className="cursor-pointer">
          <CloseIconOutline width={20} height={20} stroke={colors.black} />
        </span>
      }
    >
      {renderContent()}
      <ActionBar type="singleAction" hasDivider>
        {renderBottomSection()}
      </ActionBar>
    </MainLayout>
  );
};

export default ProductPageContainer;
