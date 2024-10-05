import { useRouter } from 'next/router';
import SectionTitle from './SectionTitle.nd';
import { pdpText } from '@com/texts/pdpText';
import ListItem from '@com/_atoms/ListItem';
interface Props {
  className?: string;
  data: any;
}
const ProductDetail = ({ className = '', data }: Props) => {
  return (
    <div className={`w-full ${className} flex flex-col gap-y-2`}>
      <div className="grid gap-y-1 px-4">
        <span className="text-base font-semibold">موارد مصرف</span>
        <ListItem
          className="text-sm text-justify"
          text={data?.medicalUses ? data?.medicalUses : 'فاقد اطلاعات'}
        />

        <span className="text-base font-semibold">تداخلات دارویی</span>
        <ListItem
          className="text-sm text-justify"
          text={data?.drugInteraction ? data?.drugInteraction : 'فاقد اطلاعات'}
        />
      </div>
    </div>
  );
};
export default ProductDetail;
