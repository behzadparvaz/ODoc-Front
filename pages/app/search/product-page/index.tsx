import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import {
  useAddProductToBasket,
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { useGetProductsFromSearch } from '@api/product/productApis.rq';
import AddButton from '@com/_atoms/AddButton';
import FixBottomSection from '@com/_atoms/FixBottomSection';
import { Button } from '@com/_atoms/NewButton';
import Spinner from '@com/_atoms/Spinner';
import NextImage from '@com/_core/NextImage';
import { BasketIconOutline, CloseIconOutline } from '@com/icons';
import { MainLayout } from '@com/Layout';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import ActionBar from '@com/Layout/ActionBar';

type ProductDetailDosesModel = {
  dose: string;
  irc: string;
  imageLink?: string;
};

const ProductPage = () => {
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

  const [activeTab, setActiveTab] = useState(0);

  const basketFilteredProducts = basketDatat?.products?.filter((item) =>
    data?.drugDoses?.some((product) => product?.irc === item?.irc),
  );
  const [selectedItem, setSelectedItem] = useState<ProductDetailDosesModel>();

  // const scrollToSection = (sectionRef) => {
  //   window.scrollTo({
  //     top: sectionRef.current.offsetTop,
  //     behavior: 'smooth',
  //   });
  // };

  const handleChangeCount = (count: number) => {
    if (count > 0) {
      addToCart({
        type: 'IRC',
        orderType: 'OTC',
        irc: selectedItem?.irc,
        quantity: count,
        imageLink: data?.imageLink,
      });
    } else {
      popProductOfCart({ type: 'IRC', irc: selectedItem?.irc });
    }
  };

  //   useEffect(() => {
  //     const observerOptions = {
  //       root: null, // relative to the viewport
  //       threshold: 0.6, // 60% of the section should be visible to be considered "in view"
  //     };

  //     const observerCallback = (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           switch (entry.target.id) {
  //             case 'warning':
  //               setActiveTab(0);
  //               break;
  //             case 'adverseEffects':
  //               setActiveTab(1);
  //               break;
  //             default:
  //               break;
  //           }
  //         }
  //       });
  //     };

  //     const observer = new IntersectionObserver(
  //       observerCallback,
  //       observerOptions,
  //     );

  //     // Observe each section
  //     if (warningRef.current) observer.observe(warningRef.current);
  //     if (adverseEffectsRef.current) observer.observe(adverseEffectsRef.current);

  //     // Cleanup observer when component unmounts
  //     return () => {
  //       observer.disconnect();
  //     };
  //   }, []);

  const handleSelectDose = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    setSelectedItem(data?.drugDoses?.[0]);
  }, [data]);

  const renderBottomSection = () => {
    const selectedDoseCount = basketFilteredProducts?.find(
      (item) => item?.irc === selectedItem?.irc,
    )?.quantity;

    if (selectedDoseCount) {
      return (
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
            className="w-1/2"
            onClick={() => push(routeList.basket)}
          >
            مشاهده سبد خرید
          </Button>
        </>
      );
    }
    return (
      <Button
        variant="primary"
        size="large"
        className="w-full bg-[linear-gradient(91.39deg,_#FF7733_0%,_#FF5722_50.15%,_#E64917_100%)]"
        onClick={() =>
          addToCart({
            orderType: 'OTC',
            quantity: 1,
            type: 'IRC',
            irc: selectedItem?.irc,
            imageLink: data?.imageLink,
          })
        }
      >
        افزودن به سبد خرید
      </Button>
    );
  };

  const renderContent = () => {
    if (query?.brandName && query?.categoryCodeLevel3) {
      if (isLoading) {
        return (
          <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
        );
      }

      return (
        <div className="overflow-auto pb-[84px]">
          <div className="flex flex-col p-4 gap-y-4">
            <div className="flex justify-center items-center rounded-xl overflow-hidden">
              <NextImage
                src={data?.imageLink}
                width={140}
                height={140}
                alt="product-page-image"
              />
            </div>
            <span className="text-sm text-content-primary text-bold">
              {data?.productName}
            </span>
            <span className="text-xs text-content-tertiary">دوز دارو</span>
            <div className="flex items-center gap-x-2">
              {data?.drugDoses?.map((item) => (
                <span
                  key={item?.irc}
                  onClick={() => handleSelectDose(item)}
                  className={classNames(
                    'w-max flex justify-between items-center py-2 px-4 border border-border-primary rounded-full cursor-pointer',
                    selectedItem?.irc === item?.irc &&
                      'border-[1.5px] border-border-inversePrimary bg-surface-secondary',
                  )}
                >
                  {item?.dose}
                </span>
              ))}
            </div>
          </div>

          <div className="h-2 bg-surface-secondary" />

          <div className="w-full p-4 flex flex-col gap-y-4">
            {data?.medicalUses && (
              <div className="w-full flex flex-col gap-y-4">
                <span className="text-sm text-semibold text-content-primary">
                  موارد مصرف
                </span>
                <span className="text-xs text-normal text-content-tertiary">
                  {data?.medicalUses}
                </span>
              </div>
            )}
          </div>

          <div className="h-2 bg-surface-secondary" />

          <div className="w-full h-[42px] flex items-center justify-center">
            <span
              className={classNames(
                'w-1/2 h-full flex justify-center items-center text-center text-2xs text-medium text-content-primary cursor-pointer border-b-2 border-border-primary',
                activeTab === 0 && 'border-border-selected',
              )}
              onClick={() => {
                // scrollToSection(warningRef);
                setActiveTab(0);
              }}
            >
              هشدارها
            </span>
            <span
              className={classNames(
                'w-1/2 h-full flex justify-center items-center text-center text-2xs text-medium text-content-primary cursor-pointer border-b-2 border-border-primary',
                activeTab === 1 && 'border-border-selected',
              )}
              onClick={() => {
                // scrollToSection(adverseEffectsRef);
                setActiveTab(1);
              }}
            >
              عوارض جانبی
            </span>
          </div>

          {data?.warning && (
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
          )}

          <div className="h-2 bg-surface-secondary" />

          {data?.adverseEffects && (
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
          )}
        </div>
      );
    }
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
      {data?.isOtc ? (
        <ActionBar type="singleAction" hasDivider>
          <div className="flex justify-between items-center w-full px-4 py-4">
            {renderBottomSection()}
          </div>
        </ActionBar>
      ) : (
        <div className="bg-surface-warning flex justify-center items-center h-[84px]">
          <span className="text-content-onWarning">
            سفارش این دارو فقط با نسخه پزشک امکان پذیر است
          </span>
        </div>
      )}
    </MainLayout>
  );
};

export default ProductPage;
