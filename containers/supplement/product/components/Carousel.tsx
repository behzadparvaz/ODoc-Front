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
              categoryCodeLevel3: null,
              brandName: null,
              unit: null,
              categoryLevel3: null,
              shapeCode: null,
              shapeName: null,
              shortDescription: null,
              discountPrice: null,
              discountPercent: null,
              quantity: null,
              maxOrderLimit: null,
            };
            return (
              <VerticalProductCard
                hasAddToCart
                onClick={() => {
                  const { productId, ...filteredQuery } = router.query;
                  router.push({
                    pathname: `${routeList.supplementProduct}/${item.masterId}`,
                    query: filteredQuery,
                  });
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
