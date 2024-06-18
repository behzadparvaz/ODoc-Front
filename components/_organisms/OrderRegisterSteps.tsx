import { useCreateOrderInsurance } from "@api/order/orderApis.rq"
import OrderForm from "@com/_molecules/OrderCodeForm"
import SelectAddress from "@com/_molecules/SelectAddress"
import StepProgressBar from "@com/_molecules/StepProgressBar"
import UserInfoForm from "@com/_molecules/UserInfoForm"
import { useState } from "react"

const OrderRegisterSteps = ({ data }) => {
    const userInfo = data?.queryResult[0]
    const { mutate: mutateCreateOrderInsurance } = useCreateOrderInsurance()
    const [step, setStep] = useState(1)
    const [state, setState] = useState(
        {
            orderCode: "",
            phoneNumber: userInfo ? userInfo?.phoneNumber : null,
            latitude: null,
            longitude: null,
            vendorSelects: [],
            nationalCode: userInfo ? userInfo?.nationalCode : null,
            customerName: userInfo ? `${userInfo?.firstName} ${userInfo?.lastName}` : null,
            valueAddress: "تهران",
            titleAddress: "خانه",
            houseNumber: "12",
            homeUnit: 2,
        }
    )


    const stepProgressBarItem = [
        {
            title: 'کد رهگیری',
            step: 1,
        },
        {
            title: 'انتخاب آدرس',
            step: 2,
        },
        {
            title: 'اطلاعات کاربر',
            step: 3,
        },
    ]
    const handleRegisterOrder = (personalValue) => {
        const body = {
            ...state,
            nationalCode: personalValue?.nationalCode,
            customerName: `${personalValue?.firstName} ${personalValue?.lastName}`,
        }
        mutateCreateOrderInsurance(body);

    }
    return (
        <>
            <StepProgressBar currentStep={step} handleChangeStep={(step: number) => setStep(step)
            } activeItem={step} items={stepProgressBarItem} />
            {userInfo ? <div className="w-full pt-16">
                {step === 1 && <OrderForm handleNextStep={(step, value) => {
                    setStep(step); setState({ ...state, orderCode: String(value) });
                }
                } />}
                {step === 2 && <SelectAddress handleNextStep={(step, value) => {
                    setStep(step); setState({
                        ...state,
                        latitude: value?.latitude,
                        longitude: value?.longitude,
                        valueAddress: value?.description,
                        titleAddress: value?.name,
                        houseNumber: value?.houseNumber,
                        homeUnit: value?.homeUnit,
                    });
                }
                } />}
                {step === 3 && <UserInfoForm handleRegisterOrder={(value) => {
                    handleRegisterOrder(value)
                }} inOrderPage={true} data={userInfo} />}
            </div>
                : <div className="pt-36 text-center text-md text-red-600">برای ثبت سفارش ابتدا اطلاعات کاربری خود را تکمیل کنید!</div>}


        </>
    )
}
export default OrderRegisterSteps

