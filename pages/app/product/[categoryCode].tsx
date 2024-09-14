import { useGetCategoryDescription } from '@api/category/categoryApis.rq';
import Button from '@com/_atoms/Button';
import DrugShapesBox from '@com/_molecules/DrugShapesBox';
import ProductDetail from '@com/_molecules/ProductDetail';
import ProductSlider from '@com/_molecules/ProductSlider';
import { ArrowRightIconOutline } from '@com/icons';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import { useRouter } from 'next/router';

const Product = () => {
  const { back } = useRouter();
  const {data} = useGetCategoryDescription('1_1');
  console.log(data,'rfz');
  
  return (
    <div
      className={`${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''} min-h-screen bg-grey-50`}
    >
      <Button handleClick={back}>
        <ArrowRightIconOutline fill="#000" width={24} height={24} />
      </Button>
      <div className="px-4">
        <ProductSlider className="px-4 bg-white rounded-2xl py-6" />
      </div>
      <div className="px-4 mt-4">
        <ProductDetail className="px-4 bg-white rounded-2xl py-6" />
      </div>
      <DrugShapesBox />
    </div>
  );
};
export default Product;
