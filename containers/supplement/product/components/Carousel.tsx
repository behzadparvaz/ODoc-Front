import VerticalProductCardShimmer from '@com/_atoms/verticalProductCardShimmer';
import ScrollSlider from '@com/_molecules/ScrollSlider.nd';

const Carousel = () => (
  <div className="bg-indigo-50">
    <div className="px-4 mb-2 pb-4">
      <div className="h-14 flex items-center">
        <h1 className="font-medium">کالاهای مشابه</h1>
      </div>
      <ScrollSlider className="gap-4">
        {[...Array(4).keys()].map((item) => (
          <VerticalProductCardShimmer
            key={item}
            className={
              '!w-[180px] items-center border-border-primary py-5 bg-white rounded-md'
            }
          />
        ))}
        {/* {images.map((item, index) => {
          return (
              <VerticalProductCard
                hasAddToCart
                productData={item}
                className={
                      '!w-[180px] items-center border-border-primary py-5 bg-white rounded-md'
                }
                key={index}
              />
          );
        })} */}
      </ScrollSlider>
    </div>
  </div>
);
export default Carousel;
