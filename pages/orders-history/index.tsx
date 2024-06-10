import { useGetOrdersHistory } from "@api/order/orderApis.rq"
import MainLayout from "@com/_template/MainLayout"
import { convertGregorianToJalali } from "@utilities/mainUtils";
const Map = () => {
    const { data, isLoading } = useGetOrdersHistory()
    const orderHistoryData: any = data;

    return (
        <MainLayout title="تاریخچه سفارش ها">
            <div className="w-full px-6 py-8">

                {orderHistoryData?.map((item) => {
                    return <div key={item?.id} className="w-full border overflow-hidden mb-4 border-grey-200 rounded-lg">
                        <div className="text-left border-b px-4 py-2 bg-grey-50 flex justify-between border-grey-200">
                            <div>تاریخ ثبت</div>
                            <div>{convertGregorianToJalali(item?.createDateTime)}</div>
                        </div>
                        <div className="w-full flex flex-col gap-y-3 py-2 px-4">
                            <div>کد سفارش:{item?.orderCode}</div>

                            <div>نام ثبت کننده:{item?.customer?.name}</div>
                            <div>شماره ملی ثبت کننده:{item?.customer?.nationalCode}</div>
                        </div>
                    </div>
                })}
            </div>
        </MainLayout>
    )
}
export default Map