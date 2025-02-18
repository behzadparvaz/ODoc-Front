import { useVerifyOtp } from '@api/auth/oDocAuth.rq';
import { Button } from '@com/_atoms/NewButton';
import useNotification from '@hooks/useNotification';
import { setUserAction } from '@redux/user/userActions';
import { routeList } from '@routes/routeList';
import Icon from '@utilities/icon';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import CountDownTimer from './countDown';
import OTPInput from './otpInputs';

interface OtpStepProps {
  phone: string;
  securityStamp: string;
  EditPhone: () => void;
  retry: ({ phone }: { phone: string }) => void;
}
interface IOtpInputRef {
  getOTP: () => string;
}

const OtpStep: React.FC<OtpStepProps> = ({
  phone,
  securityStamp,
  EditPhone,
  retry,
}) => {
  const otpInputRef = useRef<IOtpInputRef>(null);
  const dispatch = useDispatch();
  const { push, query } = useRouter();
  const { openNotification } = useNotification();
  const { mutate: mutateVerifyOtp, isPending: pendingVerifyOtp } =
    useVerifyOtp();

  const isValidRedirect = (url: string) => {
    return url && url.startsWith('/');
  };

  const onCompleteAction = (pin: string) => {
    if (pin.length !== 6) {
      return openNotification({
        type: 'error',
        message: 'کد وارد شده صحیح نیست',
        notifType: 'successOrFailedMessage',
      });
    }
    mutateVerifyOtp(
      { otpCode: pin, securityStamp },
      {
        onSuccess: (res: any) => {
          Cookies.set('token', res?.data?.token, { expires: 365 });
          localStorage.setItem('token', res?.data?.token);

          dispatch(
            setUserAction({
              mobileNumber: phone,
              token: res?.data?.token,
            }),
          );

          const redirectPath =
            query?.redirect &&
            typeof query.redirect === 'string' &&
            isValidRedirect(query.redirect)
              ? query.redirect
              : routeList.homeRoute;

          push(redirectPath);

          openNotification({
            message: 'ورود با موفقیت انجام شد',
            type: 'success',
            notifType: 'successOrFailedMessage',
          });
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.errors?.fieldErrors?.[0]?.error ||
            error.response?.data?.error?.message ||
            'مشکلی پیش آمده است لطفا مجدد تلاش کنید';

          openNotification({
            type: 'error',
            message: errorMessage,
            notifType: 'successOrFailedMessage',
          });
        },
      },
    );
  };

  const EditPhoneAction = () => {
    EditPhone();
  };

  const retryAction = useCallback(() => {
    retry({ phone });
  }, [phone]);

  const clickOnSubmitButton = () => {
    if (otpInputRef.current) {
      const otpValue = otpInputRef.current?.getOTP();
      if (otpValue) {
        onCompleteAction(otpValue);
      }
    }
  };

  return (
    <div className="bg-white rounded-t-[20px] shadow-lg absolute inset-x-0 bottom-0">
      <div className="text-md border-b border-grey-200 py-4 flex justify-center font-medium">
        تایید شماره موبایل
      </div>
      <div className="m-4">
        <div className="flex justify-center items-center text-xs text-grey-500 text-center py-3 font-medium">
          <span className="select-none">
            لطفاً کد ارسال شده برای شماره {phone} را وارد کنید.
          </span>
        </div>
        <div className="mb-4">
          <span
            onClick={EditPhoneAction}
            className="select-none cursor-pointer bg-grey-100 py-2 font-medium px-4 rounded-full text-xs inline-flex gap-0.5"
          >
            <Icon name="PencilLineFill" />
            ویرایش شماره
          </span>
        </div>
        <OTPInput
          length={6}
          onComplete={onCompleteAction}
          disabled={pendingVerifyOtp}
          ref={otpInputRef}
        />
        <CountDownTimer resendAction={retryAction} />
        <Button
          variant="primary"
          className="w-full mb-5"
          size="large"
          type="submit"
          onClick={clickOnSubmitButton}
          isLoading={pendingVerifyOtp}
          disabled={pendingVerifyOtp}
        >
          تأیید
        </Button>
      </div>
    </div>
  );
};

export default OtpStep;
