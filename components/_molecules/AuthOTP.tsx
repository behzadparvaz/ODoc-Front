import Button from "@com/_atoms/Button"
import { useFormik } from "formik";
import { useODocSendVerifyCode } from "@api/auth/oDocAuth.rq";
import { loginSchema } from "@lib/validationSchemas";
import { loginTexts } from "@com/texts/loginTexts";
import OTPInput from "@com/_atoms/OTPInput";
import { useState } from "react";
import SectionTitle from "./SectionTitle.nd";
import useAuthTimer from "@hooks/useAuthTimer";


interface Props {
    handleChangeForm: (formStatus: 'password') => void;
}

const AuthOTP = ({ handleChangeForm }: Props) => {
    const [otpCode, setOtpCode] = useState('');
    const { timer, setTimer } = useAuthTimer();
    const { mutate: mutateODocSendVerifyCode, isLoading: oDocSendVerifyCodeLoading } = useODocSendVerifyCode();
    const formik = useFormik({
        initialValues: {
            PhoneNumber: "09129151055",
            VerifyCode: otpCode
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
            <SectionTitle actionButton={<Button handleClick={() => handleChangeForm('password')} className="text-teal-700 text-xs !p-0">{loginTexts?.loginByPassword}</Button>} descriptionClassName="text-md" description={'کد تایید 5 رقمی برای شماره موبایل  09129151055 ارسال شد'} titleClassName="text-sm text-grey-600" title="کد تــــایید را وارد کــــنید" />
            <form onSubmit={formik.handleSubmit}>

                <OTPInput
                    autoFocus
                    length={6}
                    name="otpCode"
                    className="odOtpContainer textField h-10 flex items-center justify-around text-grey-600 border border-grey-200 mt-3"
                    inputClassName="otpInput"
                    onChangeOTP={handleChangeOtp}
                    onPasteOtp={handlePasteOtp}
                    disabled={oDocSendVerifyCodeLoading}
                />
                <div className="w-full">

                    <div className="text-left mt-1 mb-2">
                        {timer.min + timer.sec > 0 ? (
                            <p className="text-xs text-teal-700">
                                <b className="px-2 w-14">
                                    {timer.min.toLocaleString('fa-IR')}:
                                    {timer.sec < 10 ? `۰${timer.sec.toLocaleString('fa-IR')}` : timer.sec.toLocaleString('fa-IR')}
                                </b>
                            </p>
                        ) : (
                            <p
                                onClick={() => timer?.min === 0 && console.log('resend')
                                }
                                className="cursor-pointer text-teal-700 text-xs"
                            >
                                {loginTexts.resend}
                            </p>
                        )}
                    </div>
                </div>

                <Button
                    buttonType="contained"
                    variant="primary"
                    className="w-full mt-3"
                    size="large"
                    disabled={oDocSendVerifyCodeLoading}
                    type="submit"
                    isLoading={oDocSendVerifyCodeLoading}
                >
                    <p>{loginTexts.login}</p>
                </Button>
            </form>
        </>
    )
}
export default AuthOTP