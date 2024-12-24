import { useAuthLoginWithOtp } from '@api/auth/oDocAuth.rq';
import { MainLayout } from '@com/Layout';
import useNotification from '@hooks/useNotification';
import useStorage from '@hooks/useStorage';
import { routeList } from '@routes/routeList';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BackgroundSection from './components/backgroundSection';

const PhoneStep = dynamic(() => import('./components/phoneStep'), {
  ssr: false,
});
const OtpStep = dynamic(() => import('./components/otpStep'), { ssr: false });

type TSteps = 'phone' | 'otp';
interface IData {
  phone: string;
  securityStamp: string;
}
interface IState {
  step: TSteps;
  data?: IData;
}
interface IOnSubmitPhoneStep {
  phone: string;
  securityStamp: string;
}

const AuthContainer = () => {
  const initState: IState = { step: 'phone', data: null };
  const [state, setState] = useState<IState>({ step: 'phone', data: null });
  const { openNotification } = useNotification();
  const { mutate: mutateAuthLoginWithOtp, isPending: pendingAuthLoginWithOtp } =
    useAuthLoginWithOtp();

  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  const { replace } = useRouter();

  const onSubmitPhoneStep = ({ phone, securityStamp }: IOnSubmitPhoneStep) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, phone, securityStamp },
    }));
  };

  const EditPhoneAction = () => {
    setState(initState);
  };

  const mutateSubmitHandler = (phoneNumber: string) => {
    setState((prev) => ({
      ...prev,
      step: 'otp',
    }));
    mutateAuthLoginWithOtp(
      { phoneNumber },
      {
        onSuccess: (res: any) => {
          return onSubmitPhoneStep({
            phone: phoneNumber,
            securityStamp: res?.data?.securityStamp,
          });
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.errors?.fieldErrors?.[0]?.error ||
            error.response?.data?.error?.message ||
            'مشکلی پیش آمده است لطفا مجدد تلاش کنید';

          return openNotification({
            type: 'error',
            message: errorMessage,
            notifType: 'successOrFailedMessage',
          });
        },
      },
    );
  };

  const onSubmitFormAction = ({ phone }) => {
    mutateSubmitHandler(phone);
  };

  useEffect(() => {
    if (token) {
      replace(routeList.homeRoute);
    }
  }, []);

  return (
    <MainLayout>
      <BackgroundSection />
      {state.step === 'phone' && (
        <PhoneStep
          isLoading={pendingAuthLoginWithOtp}
          onSubmit={onSubmitFormAction}
        />
      )}
      {state.step === 'otp' && (
        <OtpStep
          phone={state?.data?.phone}
          securityStamp={state?.data?.securityStamp}
          retry={onSubmitFormAction}
          EditPhone={EditPhoneAction}
        />
      )}
    </MainLayout>
  );
};
export default AuthContainer;
