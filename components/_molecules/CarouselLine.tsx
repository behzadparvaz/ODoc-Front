import dynamic from 'next/dynamic';
import VerticalProductCard from './VerticalProductCard';
import { ArrowLeftIconOutline, CouponPuchedFillIcon } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { colors } from '@configs/Theme';
import { Button } from '@com/_atoms/NewButton';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));
const VerticalProductCardShimmer = dynamic(
  () => import('@com/_atoms/verticalProductCardShimmer'),
);

interface Props {
  className?: string;
  data: any;
  twoRow?: boolean;
  carouselIsLoading?: boolean;
}

const shimerData = [1, 2, 3, 4, 5, 6];

const CarouselLine = ({
  className = '',
  twoRow,
  data,
  carouselIsLoading,
}: Props) => {
  const { push } = useRouter();
  return (
    <div className="px-4">
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
          <div className="flex items-center gap-x-[24px]">
            {twoRow && (
              <CouponPuchedFillIcon
                width={24}
                height={24}
                fill={colors.white}
              />
            )}

            <span
              className={classNames(
                'text-base font-semibold leading-6',
                twoRow ? 'text-content-onInverse' : 'text-content-primary',
              )}
            >
              {data?.title}
            </span>
          </div>

          <Button
            variant="secondary"
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
        </div>

        <ScrollSlider
          className={classNames(
            twoRow
              ? 'px-4 py-2 grid grid-rows-2 grid-flow-col'
              : 'flex items-center',
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
                  productData={item}
                  className={
                    twoRow
                      ? 'w-[128px] h-[204px] !p-2'
                      : 'w-[128px] h-[212px] border-l border-border-primary'
                  }
                  key={index}
                />
              );
            })}
          </>

          <div
            onClick={() => push(`${routeList?.offer}/${data?.recId}`)}
            className="w-[157px] h-full flex flex-col items-center justify-center row-start-1 row-end-3 cursor-pointer"
          >
            <span className="bg-grey-100 h-8 w-8 rounded-full flex justify-center items-center">
              <ArrowLeftIconOutline width={20} height={20} fill="#000" />
            </span>
            <span className="text-sm font-medium pt-4">
              {generalTexts?.viewAll}
            </span>
          </div>
        </ScrollSlider>
      </div>
    </div>
  );
};
export default CarouselLine;
