import { useRouter } from 'next/router';

const Product = () => {
  const { query } = useRouter();
  return <>{query?.categoryName}</>;
};
export default Product;
