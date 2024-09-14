import { useRouter } from 'next/router';
import SectionTitle from './SectionTitle.nd';
import { pdpText } from '@com/texts/pdpText';
import ListItem from '@com/_atoms/ListItem';
interface Props {
  className?: string;
  data: any;
}
const ProductDetail = ({ className = '', data }: Props) => {
  const { query } = useRouter();
  console.log(data, 'rfz');

  return (
    <div className={`w-full ${className}`}>
      <SectionTitle
        title={`${query?.categoryName}`}
        tag="h1"
        className="text-lg font-semibold"
      />
      <SectionTitle
        className="text-md text-grey-600 mt-6 mb-2 border-b border-grey-200 pb-2"
        title={pdpText?.features}
      />
      <div className="grid gap-y-1">
        <ListItem className="text-sm" text={'تسکین دردهاي خفیف تا متوسط'} />
        <ListItem
          className="text-sm"
          text={data?.drugInteraction ? data?.drugInteraction : 'فاقد اطلاعات'}
        />
        <ListItem
          className="text-sm"
          text={data?.medicalUses ? data?.medicalUses : 'فاقد اطلاعات'}
        />
      </div>
    </div>
  );
};
export default ProductDetail;
