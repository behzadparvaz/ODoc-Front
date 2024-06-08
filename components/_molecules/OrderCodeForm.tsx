import Button from "@com/_atoms/Button";
import Input from "@com/_atoms/Input.nd"
import { orderText } from "@com/texts/orderText"
import { OrderCodeSchema } from "@utilities/validationSchemas";
import { useFormik } from "formik";
import { useState } from "react";


interface Props {
    handleNextStep: (step, value) => void
}

const OrderCodeForm = ({ handleNextStep }: Props) => {

    const [initialValues] = useState({
        orderCode: ''
    })
    const formik = useFormik({
        initialValues,
        validationSchema: OrderCodeSchema,
        onSubmit: (value) => {
            handleNextStep(2, value?.orderCode)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="w-full">
            <Input
                type="number"
                placeholder={orderText?.enterOrderCode}
                label={orderText?.orderCode}
                className="flex-auto"
                labelClassName="font-normal text-sm"
                inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
                id="orderCode"
                name="orderCode"
                value={formik.values.orderCode}
                onChange={formik.handleChange}
                isTouched={formik.touched.orderCode && Boolean(formik.errors.orderCode)}
                errorMessage={formik.errors.orderCode}
            />
            <div className="w-full flex justify-end mt-5">
                <Button type="submit" buttonType="contained" size="large" variant="primary">ادامه</Button>
            </div>
        </form>
    )
}
export default OrderCodeForm