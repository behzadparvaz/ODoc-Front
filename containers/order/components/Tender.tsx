import { useGetTenderItems } from '@api/tender/tenderApis.rq';
import TenderCard from '@com/_organisms/TenderCard';

type TenderProps = {
  orderCode: string;
};

const Tender = ({ orderCode }: TenderProps) => {
  const { data: tenderData, isLoading: tenderIsLoading } = useGetTenderItems(
    orderCode as string,
  );

  if (!tenderIsLoading && !tenderData?.queryResult)
    return <div className="w-full text-center">هیچ پیشنهادی یافت نشد</div>;

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <span className="text-base font-medium text-content-primary">
        لیست داروخانه ها
      </span>

      {tenderIsLoading ? (
        <div className="w-full h-[80px] p-4">
          <div className="bg-surface-secondary animate-pulse" />
        </div>
      ) : (
        tenderData?.queryResult?.map((item) => (
          <TenderCard
            key={item?.id}
            data={item}
            offerId={item?.id}
            orderCode={orderCode as string}
          />
        ))
      )}
    </div>
  );
};

export default Tender;
