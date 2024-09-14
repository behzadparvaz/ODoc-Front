
import { useRouter } from 'next/router';
interface Props {
  className?: string;
}
const ProductDetail = ({ className = '' }: Props) => {
  const { query } = useRouter();

  return (
    <div className={`w-full ${className}`}>
      <h1 className="text-sm font-semibold">{query?.categoryName}</h1>
    </div>
  );
};
export default ProductDetail;
