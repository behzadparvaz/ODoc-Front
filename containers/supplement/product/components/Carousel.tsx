import VerticalProductCardShimmer from '@com/_atoms/verticalProductCardShimmer';
import ScrollSlider from '@com/_molecules/ScrollSlider.nd';
import VerticalProductCard from '@com/_molecules/VerticalProductCard';
import { routeList } from '@routes/routeList';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const Carousel = ({ products = null }) => {
  const router = useRouter();
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
            const data = {
              productName: item.shortNameFa,
              irc: item?.irc,
              masterId: item?.masterId,
              imageLink: item?.shapeLinkUrl,
            };
            return (
              <VerticalProductCard
                hasAddToCart
                onClick={() => {
                  if (item.productType === 1) {
                    router.push({
                      pathname: `${routeList?.searchProductPage}`,
                      query: {
                        brandName: item.brandName,
                        categoryCodeLevel3: item.categoryCodeLevel3,
                        irc: item.genericCode || item.irc,
                      },
                    });
                  }
                  if (item.productType === 2) {
                    router.push({
                      pathname: `${routeList?.supplementProduct}/${item.genericCode || item.irc}`,
                    });
                  }
                }}
                productData={data}
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
