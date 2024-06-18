import Button from "@com/_atoms/Button"
import { useFormik } from "formik";
import { useSendOtpForLoginWithOtp, useSendVerifyCode } from "@api/auth/oDocAuth.rq";
import { loginTexts } from "@com/texts/loginTexts";
import OTPInput from "@com/_atoms/OTPInput";
import { useState } from "react";
import SectionTitle from "./SectionTitle.nd";
import useAuthTimer from "@hooks/useAuthTimer";
import Cookies from 'js-cookie';
import useNotification from "@hooks/useNotification";
import { generalTexts } from "@com/texts/generalTexts";
import { useRouter } from "next/router";

interface Props {
    data: any
    handleChangeForm: (formStatus: 'password') => void;
}

const AuthOTP = ({ handleChangeForm, data }: Props) => {
    const [otpCode, setOtpCode] = useState('');
    const [resetOtp, setResetOtp] = useState(false);
    const { push } = useRouter()
    const { timer, setTimer } = useAuthTimer();
    const { openNotification } = useNotification()
    const { mutate: mutateSendVerifyCode, isLoading: sendVerifyCodeLoading } = useSendVerifyCode();
    const { mutate: mutateSendOtpForLoginWithOtp, isLoading: sendOtpForLoginWithOtp } = useSendOtpForLoginWithOtp();




    const handleChangeOtp = (e) => {
        e !== otpCode && setOtpCode(e);
        e.length >= 6 ? formik.submitForm() : null;
    };

    const handlePasteOtp = (e) => {
        e !== otpCode && setOtpCode(e);
        e.length >= 6 && e !== otpCode ? formik.submitForm() : null;
    };
    const resetTimer = () => {
        setTimer(() => ({
            min: 2,
            sec: 0,
        }));
    };

    const clearTimer = () =>
        setTimer(() => ({
            min: 0,
            sec: 0,
        }));


    const formik = useFormik({
        initialValues: {
            PhoneNumber: data?.phoneNumber,
            Code: otpCode
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            mutateSendVerifyCode(
                values,
                {
                    onSuccess: (responseData: any) => {
                        if (responseData?.message === 'succeeded') {
                            Cookies.set('token', responseData?.token, { expires: 365 });
                            localStorage.setItem('token', responseData?.token);
                            push('/')
                            openNotification({
                                message: loginTexts?.loginSuccessfully,
                                type: 'success',
                                notifType: 'successOrFailedMessage',
                            });
                            clearTimer()
                        }
                        else {
                            openNotification({
                                message: generalTexts?.error,
                                type: 'error',
                                notifType: 'successOrFailedMessage',
                            });
                            clearTimer()
                        }
                    },
                    onError: () => {
                        openNotification({
                            message: generalTexts?.error,
                            type: 'error',
                            notifType: 'successOrFailedMessage',
                        });
                        clearTimer()
                    }
                }
            );
        },
    });

    const handleResendOtp = () => {
        setResetOtp(true)
        mutateSendOtpForLoginWithOtp(
            { PhoneNumber: data?.phoneNumber },
            {
                onSuccess: (responseData: any) => {
                    if (responseData?.message === 'succeeded') {
                        openNotification({
                            message: loginTexts?.resendOtpCodeSuccessfully,
                            type: 'success',
                            notifType: 'successOrFailedMessage',
                        });
                        resetTimer()
                    }
                    else {
                        openNotification({
                            message: generalTexts?.error,
                            type: 'error',
                            notifType: 'successOrFailedMessage',
                        });
                    }
                },
                onError: () => {
                    openNotification({
                        message: generalTexts?.error,
                        type: 'error',
                        notifType: 'successOrFailedMessage',
                    });
                }
            }
        );
    }

    return (

        <>
            <SectionTitle actionButton={data?.hasPassword ? <Button handleClick={() => handleChangeForm('password')} className="text-teal-700 text-xs !p-0">{loginTexts?.loginByPassword}</Button> : null} descriptionClassName="text-md" description={`کد تایید 5 رقمی برای شماره موبایل  ${data?.phoneNumber} ارسال شد`} titleClassName="text-sm text-grey-600" title="کد تــــایید را وارد کــــنید" />
            <form onSubmit={formik.handleSubmit}>

                <OTPInput
                    reset={resetOtp}
                    autoFocus
                    length={6}
                    name="otpCode"
                    className="odOtpContainer textField h-10 flex items-center justify-around text-grey-600 border border-grey-200 mt-3"
                    inputClassName="otpInput"
                    onChangeOTP={handleChangeOtp}
                    onPasteOtp={handlePasteOtp}
                    disabled={sendVerifyCodeLoading}
                />
                <div className="w-full">

                    <div className="text-left my-2">
                        {timer.min + timer.sec > 0 ? (
                            <p className="text-xs text-teal-700">
                                <b className="px-2 w-14">
                                    {timer.min.toLocaleString('fa-IR')}:
                                    {timer.sec < 10 ? `۰${timer.sec.toLocaleString('fa-IR')}` : timer.sec.toLocaleString('fa-IR')}
                                </b>
                            </p>
                        ) : (
                            <p
                                onClick={() => timer?.min === 0 && handleResendOtp()
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
                    className="w-full mt-8"
                    size="large"
                    disabled={sendVerifyCodeLoading}
                    type="submit"
                    isLoading={sendVerifyCodeLoading}
                >
                    <p>{loginTexts.login}</p>
                </Button>
            </form>
        </>
    )
}
export default AuthOTP