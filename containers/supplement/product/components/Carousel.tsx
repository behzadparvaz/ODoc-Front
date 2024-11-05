import VerticalProductCardShimmer from '@com/_atoms/verticalProductCardShimmer';
import ScrollSlider from '@com/_molecules/ScrollSlider.nd';
import VerticalProductCard from '@com/_molecules/VerticalProductCard';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

const Carousel = ({ products = null }) => (
  <div className="bg-indigo-50 mt-4">
    <div className="px-4 mb-2 pb-4">
      <div className="h-14 flex items-center">
        <h1 className="font-medium">کالاهای مشابه</h1>
      </div>
      <ScrollSlider className="gap-4">
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
            irc: item?.masterId,
            shortDescription: null,
            discountPrice: 0,
            discountPercent: 0,
            quantity: 10,
            maxOrderLimit: 2,
            imageLink: item?.shapeLinkUrl,
            categoryCodeLevel3: null,
            brandName: null,
            unit: 'شیشه',
            categoryLevel3: null,
            shapeCode: null,
            shapeName: null,
          };
          return (
            <VerticalProductCard
              productRoute={`${routeList.supplementProduct}/${item.masterId}`}
              hasAddToCart
              productData={data}
              className={
                '!w-[110px] items-center border-border-primary py-5 bg-white rounded-md'
              }
              key={index}
            />
          );
        })}
      </ScrollSlider>
    </div>
  </div>
);

export default Carousel;
