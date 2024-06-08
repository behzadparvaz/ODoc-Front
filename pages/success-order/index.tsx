import Button from "@com/_atoms/Button"
import MainLayout from "@com/_template/MainLayout"
import { TickFillIcon } from "@com/icons"
import { colors } from "@configs/Theme"
import { useRouter } from "next/router"

const SuccessOrder = () => {
    const { push } = useRouter()
    return (
        <MainLayout className="w-full min-h-screen flex justify-center flex-col items-center">
            <TickFillIcon width={100} height={100} fill={colors?.teal[600]} stroke="red" />
            <h1 className="text-md text-grey-700 mt-4">سفارش شما با موفقیت ثبت شد</h1>
            <Button handleClick={()=>push('/')} size="large" buttonType="contained" variant="primary" className="mt-5">ثبت سفارش جدید</Button>
        </MainLayout>
    )
}
export default SuccessOrder