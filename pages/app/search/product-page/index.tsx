import { useRef, useState } from 'react';
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

type ProductDetailDosesModel = { dose: string; irc: string };

const ProductPage = () => {
  const { query, push, back } = useRouter();

  const { data, isLoading } = useGetProductsFromSearch({
    brandName: query?.brandName as string,
    categoryCodeLevel3: query?.categoryCodeLevel3 as string,
  });
  const { data: basketDatat, refetch: refetchGetBasket } =
    useGetCurrentBasket();

  const renderBasketCount = () => {
    const rxCount = basketDatat?.refrenceNumber ? 1 : 0;

    if (!!basketDatat?.products?.length) {
      return basketDatat?.products?.length + rxCount;
    }

    return rxCount;
  };

  const { mutate: addToCart, isLoading: isAddingToCart } =
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
  const [selectedItem, setSelectedItem] = useState<ProductDetailDosesModel>();

  const basketFilteredProducts = basketDatat?.products?.filter((item) =>
    data?.drugDoses?.some((product) => product?.irc === item?.irc),
  );

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

  const rendeBottomSection = () => {
    const selectedDoseCount = basketFilteredProducts?.find(
      (item) => item?.irc === selectedItem?.irc,
    )?.quantity;

    if (selectedDoseCount) {
      return (
        <>
          <div className="w-1/2">
            <AddButton
              count={
                basketFilteredProducts?.find(
                  (item) => item?.irc === selectedItem?.irc,
                )?.quantity
              }
              onChangeCount={handleChangeCount}
              isLoading={isAddingToCart}
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
        className="w-full"
        onClick={() =>
          addToCart({
            orderType: 'OTC',
            quantity: 1,
            type: 'IRC',
            irc: selectedItem?.irc,
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
        <>
          <div className="px-4 h-[1px] bg-border-primary" />

          <div className="flex flex-col p-4 gap-y-4">
            <div className="flex justify-center items-center rounded-xl overflow-hidden">
              <NextImage
                src={data?.imageLink}
                width={140}
                height={140}
                alt="product-page-image"
              />
            </div>
            <span className="text-base text-content-primary text-bold">
              {data?.productName}
            </span>
            <span className="text-sm text-content-tertiary">دوز دارو</span>
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
                <span className="text-base text-semibold text-content-primary">
                  موارد مصرف
                </span>
                <span className="text-sm text-normal text-content-tertiary">
                  {data?.medicalUses}
                </span>
              </div>
            )}
          </div>

          <div className="h-2 bg-surface-secondary" />

          <div className="w-full h-[42px] flex items-center justify-center items-center">
            <span
              className={classNames(
                'w-1/2 h-full flex justify-center items-center text-center text-xs text-medium text-content-primary cursor-pointer border-b-2 border-border-primary',
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
                'w-1/2 h-full flex justify-center items-center text-center text-xs text-medium text-content-primary cursor-pointer border-b-2 border-border-primary',
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
              <span className="text-base text-semibold text-content-primary">
                هشدارها
              </span>
              <span className="text-sm text-normal text-content-tertiary">
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
              <span className="text-base text-semibold text-content-primary">
                عوارض جانبی
              </span>
              <span className="text-sm text-normal text-content-tertiary">
                {data?.adverseEffects}
              </span>
            </div>
          )}

          {selectedItem && data?.isOtc && (
            <FixBottomSection>
              <div className="flex justify-between items-center w-full px-4 py-4">
                {rendeBottomSection()}
              </div>
            </FixBottomSection>
          )}
        </>
      );
    }
  };

  return (
    <MainLayout
      hasBottomGap
      hasHeader
      hasBasketIcon
      rightIcon={
        <CloseIconOutline width={20} height={20} stroke={colors.black} />
      }
      leftIcon={
        <div
          className="w-[52px] h-[52px] cursor-pointer relative flex justify-center items-center"
          onClick={() => push(routeList.basket)}
        >
          {(!!basketDatat?.products?.length || basketDatat?.refrenceNumber) && (
            <span className="absolute right-0 top-0 !w-6 !h-6 border border-white rounded-full bg-surface-nagative text-base z-10 text-white flex justify-center items-center">
              {renderBasketCount()}
            </span>
          )}
          <BasketIconOutline width={22} height={22} fill={'#000'} />
        </div>
      }
      handleClickRightIcon={() => back()}
    >
      {renderContent()}
    </MainLayout>
  );
};

export default ProductPage;
