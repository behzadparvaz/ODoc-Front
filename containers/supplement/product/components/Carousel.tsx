import VerticalProductCardShimmer from '@com/_atoms/verticalProductCardShimmer';
import ScrollSlider from '@com/_molecules/ScrollSlider.nd';
import VerticalProductCard from '@com/_molecules/VerticalProductCard';
import useProductNavigation from '@hooks/useNavigateToPdp';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const Carousel = ({ products = null }) => {
  const router = useRouter();
  const { navigateToPdp } = useProductNavigation();
  return (
    <div className="bg-indigo-50 mt-4">
      <div className=" mb-2 pb-4">
        <div className="h-14 flex items-center">
          <h1 className="px-4 font-medium">کالاهای مشابه</h1>
        </div>
        <ScrollSlider>
          {products == null &&
            [...Array(4).keys()].map((item) => (
              <VerticalProductCardShimmer
                key={item}
                className={
                  '!w-[180px] items-center border-border-primary py-5 bg-white rounded-md'
                }
              />
            ))}
          {products?.map((item, index) => {
            return (
              <VerticalProductCard
                hasAddToCart
                onClick={() =>
                  navigateToPdp({ item, ProductTypeId: item.productType })
                }
                productData={{
                  ...item,
                  productName: item.shortNameFa,
                  irc: item?.irc,
                  masterId: item?.masterId,
                  imageLink: item?.shapeLinkUrl,
                }}
                className={classNames(
                  `!w-[110px] items-center border-border-primary py-5 bg-white rounded-md mr-4`,
                  products.length - 1 === index && 'ml-4',
                )}
                key={index}
              />
            );
          })}
        </ScrollSlider>
      </div>
    </div>
  );
};

export default Carousel;
