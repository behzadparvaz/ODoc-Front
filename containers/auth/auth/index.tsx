import { MainLayout } from '@com/Layout';
import { useState } from 'react';
import BackgroundSection from './components/backgroundSection';
import PhoneStep from './components/phoneStep';
import OtpStep from './components/otpStep';

type TSteps = 'phone' | 'otp';
interface IState {
  step: TSteps;
  data: any;
}

const AuthContainer = () => {
  const [state, setState] = useState<IState>({ step: 'otp', data: null });

  const onSubmitPhoneStep = () => {
    setState((prev) => ({ ...prev, step: 'otp' }));
  };
  const EditPhoneAction = () => {
    setState((prev) => ({ ...prev, step: 'phone' }));
  };
  return (
    <MainLayout>
      <BackgroundSection />
      {state.step === 'phone' && <PhoneStep onSubmit={onSubmitPhoneStep} />}
      {state.step === 'otp' && <OtpStep EditPhoneAction={EditPhoneAction} />}
    </MainLayout>
  );
};
export default AuthContainer;
