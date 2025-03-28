import ListItem from '@com/_atoms/ListItem';
interface Props {
  className?: string;
  data: any;
}

const ProductDetail = ({ className = '', data }: Props) => {
  return (
    <div className={`w-full ${className} flex flex-col`}>
      <div className="grid gap-y-1">
        <span className="text-sm font-semibold">موارد مصرف</span>
        {data?.medicalUses ? (
          <ListItem className="text-xs text-justify" text={data?.medicalUses} />
        ) : null}

        {/* <span className="text-sm font-semibold">تداخلات دارویی</span>
        <ListItem
          className="text-xs text-justify"
          text={data?.drugInteraction ? data?.drugInteraction : 'فاقد اطلاعات'}
        /> */}
      </div>
    </div>
  );
};
export default ProductDetail;
