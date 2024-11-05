import { TenderItemsListDataModel } from '@utilities/interfaces/tender';

type OrderStatusProps = {
  data: TenderItemsListDataModel;
};

const OrderStatus = ({ data }: OrderStatusProps) => {
  const renderContent = () => {
    switch (data?.orderStatus?.name) {
      case 'draft':
        return 'در انتظار تایید داروخانه';

      case 'aPay':
        return 'در انتظار پرداخت';

      case 'pick':
        return 'در حال آماده سازی';

      case 'sendDelivery':
        return 'ارسال توسط پیک';

      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col ">
      {data?.orderStatus?.name === '' ? (
        <>
          {/* <div className="h-[0.5px] w-full rounded-xl bg-grey-100" />

          <div className="col-start-1 col-span-4 grid grid-cols-2 gap-2 items-center">
            <div className="flex items-center gap-2 bg-brown">
              <div className="flex justify-center items-center overflow-hidden rounded-full">
                <Image
                  src={data?.bikerDetails?.bikerImage}
                  alt="biker-image"
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-md">{data?.bikerDetails?.bikerName}</span>
            </div>

            <span className="w-16 h-12 text-base leading-6 text-center justify-self-end border rounded border-grey-100">
              {data?.bikerDetails?.bikePlateNumber}
            </span>

            <span className="flex items-center gap-1 text-md">
              کد تحویل:
              <p className="text-md">{data?.bikerDetails?.deliveryCode}</p>
            </span>

            <span className="w-10 h-10 rounded-full bg-grey-50 flex justify-center items-center justify-self-end">
              <PhoneOutlineIcon />
            </span>
          </div> */}
        </>
      ) : (
        <></>
        // <div className="w-full flex justify-between items-center py-2">
        //   <span className="text-base leading-6">تماس با پشتیبانی</span>

        //   <Link href={`tel:02196861727`}>
        //     <span className="flex items-center justify-center h-10 w-10 bg-grey-50 rounded-full">
        //       <HeadsetOutlineIcon />
        //     </span>
        //   </Link>
        // </div>
      )}
    </div>
  );
};

export default OrderStatus;
