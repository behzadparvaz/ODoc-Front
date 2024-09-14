import DrugShapesBox from '@com/_molecules/DrugShapesBox';
import { useRouter } from 'next/router';

const Product = () => {
  const { query } = useRouter();
  return (
    <>
      <DrugShapesBox />
    </>
  );
};
export default Product;
