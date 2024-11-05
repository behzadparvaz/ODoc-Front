import Button from '@com/_atoms/Button';
import { useFormik } from 'formik';
import {
  useSendOtpForLoginWithOtp,
  useSendVerifyCode,
} from '@api/auth/oDocAuth.rq';
import { loginTexts } from '@com/texts/loginTexts';
import OTPInput from '@com/_atoms/OTPInput';
import { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle.nd';
import useAuthTimer from '@hooks/useAuthTimer';
import Cookies from 'js-cookie';
import useNotification from '@hooks/useNotification';
import { generalTexts } from '@com/texts/generalTexts';
import { useRouter } from 'next/router';
import { setUserAction } from '@redux/user/userActions';
import { useDispatch } from 'react-redux';
import { routeList } from '@routes/routeList';
import { PencilOutline } from '@com/icons';
import { colors } from '@configs/Theme';

interface Props {
  data: any;
  handleChangeForm: (formStatus: 'password' | 'enterMobileNumber') => void;
}

const AuthOTP = ({ handleChangeForm, data }: Props) => {
  const [otpCode, setOtpCode] = useState('');
  const [resetOtp, setResetOtp] = useState(false);
  const { push, query } = useRouter();
  const dispatch = useDispatch();
  const { timer, setTimer } = useAuthTimer();
  const { openNotification } = useNotification();
  const fromUrl = query?.from_url;
  const { mutate: mutateSendVerifyCode, isPending: sendVerifyCodeLoading } =
    useSendVerifyCode();
  const {
    mutate: mutateSendOtpForLoginWithOtp,
    isPending: sendOtpForLoginWithOtp,
  } = useSendOtpForLoginWithOtp();

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
      Code: otpCode,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutateSendVerifyCode(values, {
        onSuccess: (responseData: any) => {
          if (responseData?.message === 'succeeded') {
            Cookies.set('token', responseData?.token, { expires: 365 });
            localStorage.setItem('token', responseData?.token);
            dispatch(
              setUserAction({
                mobileNumber: data?.phoneNumber,
                token: data?.token,
              }),
            );
            fromUrl ? push(`${fromUrl}`) : push(routeList.homeRoute);
            openNotification({
              message: loginTexts?.loginSuccessfully,
              type: 'success',
              notifType: 'successOrFailedMessage',
            });
            clearTimer();
          } else {
            openNotification({
              message: generalTexts?.error,
              type: 'error',
              notifType: 'successOrFailedMessage',
            });
            clearTimer();
          }
        },
        onError: () => {
          openNotification({
            message: generalTexts?.error,
            type: 'error',
            notifType: 'successOrFailedMessage',
          });
          clearTimer();
        },
      });
    },
  });

  const handleResendOtp = () => {
    setResetOtp(true);
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
            resetTimer();
          } else {
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
        },
      },
    );
  };

  const handleAutoReadSMS = () => {
    const controler = new AbortController();
    setTimeout(
      () => {
        controler.abort();
      },
      1 * 60 * 1000,
    );
    const credentials: CredentialsContainer = navigator.credentials;
    credentials
      ?.get({
        otp: { transport: ['sms'] },
        signal: controler.signal,
      })
      .then((otp) => {
        formik.setFieldValue('Code', otp?.code);
        formik.handleSubmit();
      })
      .catch((err) => {
        openNotification({
          type: 'error',
          message: err.message,
          notifType: 'successOrFailedMessage',
        });
      });
  };

  useEffect(() => {
    handleAutoReadSMS();
  }, []);

  const hasTime = timer.min + timer.sec > 0;
  return (
    <>
      <div className="text-md border-b border-grey-200 py-4 flex justify-center font-medium">
        تایید شماره موبایل
      </div>

      <p className="text-xs text-grey-500 text-center py-3 font-medium">
        لطفاً کد ارسال شده برای شماره {data?.phoneNumber} را وارد کنید.
      </p>
      <p className="flex justify-end px-4 text-xs font-medium pb-1.5">
        <span
          className="flex gap-x-1"
          onClick={() => handleChangeForm('enterMobileNumber')}
        >
          <PencilOutline width={20} height={20} fill={colors?.black} />
          ویرایش شماره
        </span>
      </p>
      <form className="my-4 px-4" onSubmit={formik.handleSubmit}>
        <OTPInput
          reset={resetOtp}
          autoFocus
          length={6}
          name="otpCode"
          className="odOtpContainer max-w-[400px] mx-auto textField flex items-center justify-around"
          inputClassName="otpInput"
          onChangeOTP={handleChangeOtp}
          onPasteOtp={handlePasteOtp}
          disabled={sendVerifyCodeLoading}
        />
        <div className="w-full">
          <div className="text-center my-6">
            {hasTime ? (
              <div className="text-xs flex justify-center">
                {loginTexts.receiveOtp}
                <p className="w-11">
                  <b className="px-2 w-14">
                    {timer.min.toLocaleString('fa-IR')}:
                    {timer.sec < 10
                      ? `۰${timer.sec.toLocaleString('fa-IR')}`
                      : timer.sec.toLocaleString('fa-IR')}
                  </b>
                </p>
              </div>
            ) : (
              <p
                onClick={() => timer?.min === 0 && handleResendOtp()}
                className="cursor-pointer inline-block bg-grey-100 py-2 font-medium px-4 rounded-full text-xs"
              >
                {loginTexts.resend}
              </p>
            )}
          </div>
        </div>
        <Button
          buttonType="contained"
          variant="primary"
          className="w-full"
          size="large"
          disabled={sendVerifyCodeLoading}
          type="submit"
          isLoading={sendVerifyCodeLoading}
        >
          <p>تایید</p>
        </Button>
      </form>
    </>
  );
};
export default AuthOTP;
