import Button from "@com/_atoms/Button.od"
import { useFormik } from "formik";
import { useODocSendVerifyCode } from "@api/auth/oDocAuth.rq";
import { loginSchema } from "@lib/validationSchemas";
import { loginTexts } from "@com/texts/loginTexts";
import OTPInput from "@com/_atoms/OTPInput";
import { useState } from "react";
import SectionTitle from "./SectionTitle.nd";

const AuthOTP = () => {
    const [otpCode, setOtpCode] = useState('');


    const { mutate: mutateODocSendVerifyCode, isLoading: oDocSendVerifyCodeLoading } = useODocSendVerifyCode();
    const formik = useFormik({
        initialValues: {
            PhoneNumber: "09129151055",
            VerifyCode : otpCode
        },
        enableReinitialize: true,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            mutateODocSendVerifyCode(
                values,
                {
                    onSuccess: (responseData: any) => {
                        if (responseData?.success) {
                            alert('good')
                        }
                    },
                }
            );
        },
    });
    const handleChangeOtp = (e) => {
        e !== otpCode && setOtpCode(e);
        e.length >= 6 ? formik.submitForm() : null;
      };
      
  const handlePasteOtp = (e) => {
    e !== otpCode && setOtpCode(e);
    e.length >= 6 && e !== otpCode ? formik.submitForm() : null;
  };

    return (

        <>
            <SectionTitle actionButton={<div>msd</div>} descriptionClassName="text-md" description={'کد تایید 5 رقمی برای شماره موبایل  09129151055 ارسال شد'} titleClassName="text-sm text-grey-600" title="کد تــــایید را وارد کــــنید" />
            <form onSubmit={formik.handleSubmit}>

                <OTPInput
                    autoFocus
                    length={6}
                    name="otpCode"
                    className="odOtpContainer textField h-10 flex items-center justify-around mb-2 text-grey-600 border border-grey-200 mt-3"
                    inputClassName="otpInput"
                    onChangeOTP={handleChangeOtp}
                    onPasteOtp={handlePasteOtp}
                    disabled={oDocSendVerifyCodeLoading}
                />

                <Button
                    type="contained"
                    variant="primary"
                    className="w-full mt-3"
                    size="large"
                    disabled={oDocSendVerifyCodeLoading}
                    handleClick={formik.submitForm}
                    isLoading={oDocSendVerifyCodeLoading}
                >
                    <p>{loginTexts.buttonLabel}</p>
                </Button>
            </form>
        </>
    )
}
export default AuthOTP