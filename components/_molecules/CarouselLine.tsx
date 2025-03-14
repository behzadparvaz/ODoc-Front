import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Button } from '@com/_atoms/NewButton';
import { ArrowLeftIconOutline, CouponPuchedFillIcon } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { colors } from '@configs/Theme';
import useProductNavigation from '@hooks/useNavigateToPdp';
import { routeList } from '@routes/routeList';
import VerticalProductCard from './VerticalProductCard';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));
const VerticalProductCardShimmer = dynamic(
  () => import('@com/_atoms/verticalProductCardShimmer'),
);

interface Props {
  className?: string;
  data: any;
  twoRow?: boolean;
  carouselIsLoading?: boolean;
  carouselCardClassName?: string;
  containerClassName?: string;
  scrollSliderClassName?: string;
  isShowMoreButton?: boolean;
}

const shimerData = [...Array(10).keys()];

const CarouselLine = ({
  className = '',
  twoRow,
  data,
  carouselIsLoading,
  carouselCardClassName,
  containerClassName,
  scrollSliderClassName,
  isShowMoreButton = true,
}: Props) => {
  const { push } = useRouter();
  const { navigateToPdp } = useProductNavigation();
  return (
    <div className={classNames(twoRow ? 'px-4' : '', containerClassName)}>
      <div
        className={classNames(
          ' flex flex-col',
          twoRow && 'border border-border-primary rounded-xl overflow-hidden',
          className,
        )}
      >
        <div
          className={classNames(
            'h-[56px] flex items-center justify-between',
            twoRow ? 'bg-[#E41C40] pr-[36px] pl-4' : '',
          )}
        >
          <div className="flex items-center ">
            {twoRow && (
              <CouponPuchedFillIcon
                width={24}
                height={24}
                fill={colors.white}
              />
            )}

            <span
              className={classNames(
                'text-sm font-semibold leading-6 px-2',
                twoRow ? 'text-content-onInverse' : 'text-content-primary',
              )}
            >
              {data?.title}
            </span>
          </div>

          {isShowMoreButton && (
            <Button
              variant={twoRow ? 'secondary' : 'text'}
              size="small"
              className={twoRow && 'w-[32px] bg-opacity-20 !p-0'}
              onClick={() => push(`${routeList?.offer}/${data?.recId}`)}
              icon={
                <ArrowLeftIconOutline
                  width={24}
                  height={24}
                  fill={twoRow ? colors.white : colors.black}
                />
              }
            >
              {!twoRow ? 'همه' : null}
            </Button>
          )}
        </div>

        <ScrollSlider
          className={classNames(
            !isShowMoreButton && 'pl-4',
            twoRow
              ? 'px-4 py-2 grid grid-rows-2 grid-flow-col'
              : 'flex items-center',
            scrollSliderClassName,
          )}
        >
          <>
            {carouselIsLoading &&
              !data?.products &&
              shimerData.map((item) => (
                <VerticalProductCardShimmer
                  key={item}
                  className={
                    twoRow
                      ? 'w-[120px]'
                      : '!w-[180px] items-center border-l border-border-primary'
                  }
                />
              ))}

            {data?.products?.map((item, index) => {
              return (
                <VerticalProductCard
                  hasAddToCart
                  onClick={() =>
                    navigateToPdp({ item, ProductTypeId: item.productType })
                  }
                  productData={item}
                  className={classNames(
                    !carouselCardClassName
                      ? twoRow
                        ? 'w-[110px] h-[204px] !p-2'
                        : 'w-[110px] h-[212px] border-border-primary border-l'
                      : `w-[110px] mr-4 ${carouselCardClassName}`,
                  )}
                  key={index}
                />
              );
            })}
          </>

          {isShowMoreButton && (
            <div
              onClick={() => push(`${routeList?.offer}/${data?.recId}`)}
              className="w-[157px] h-full flex flex-col items-center justify-center row-start-1 row-end-3 cursor-pointer"
            >
              <span className="h-8 w-8 bg-white rounded-full flex justify-center items-center">
                <ArrowLeftIconOutline width={20} height={20} fill="#000" />
              </span>
              <span className="text-xs font-medium pt-4">
                {generalTexts?.viewAll}
              </span>
            </div>
          )}
        </ScrollSlider>
      </div>
    </div>
  );
};
export default CarouselLine;
