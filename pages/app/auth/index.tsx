import NextImage from '@com/_core/NextImage';
import AuthPassword from '@com/_molecules/AuthPassword';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import useStorage from '@hooks/useStorage';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { routeList } from '@routes/routeList';

import tapsiLogo from '@static/images/staticImages/tapsi-doctor-logo.svg';
import { MainLayout } from '@com/Layout';

const AuthMobileNumber = dynamic(
  () => import('@com/_molecules/AuthMobileNumber'),
);
const AuthOTP = dynamic(() => import('@com/_molecules/AuthOTP'));

const ODocAuth = () => {
  const [activeForm, setActiveForm] = useState<
    'enterMobileNumber' | 'otp' | 'password'
  >('enterMobileNumber');
  const [registerData, setRegisterData] = useState<any>(null);
  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  const { replace } = useRouter();

  useEffect(() => {
    if (token) {
      replace(routeList.homeRoute);
    }
  });

  return (
    <MainLayout>
      <div
        className={`gap-y-11 h-full justify-end flex flex-col ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
      >
        <div className="flex flex-col items-center">
          <NextImage src={tapsiLogo} height={40} width={170} />

          <NextImage
            width={220}
            height={220}
            src={'/static/images/staticImages/doctor.svg'}
          />
        </div>
        <div className="bg-white rounded-t-3xl p-6 shadow-2xl">
          {activeForm === 'enterMobileNumber' && (
            <AuthMobileNumber
              handleChangeForm={(registerData, formStatus) => {
                setRegisterData(registerData), setActiveForm(formStatus);
              }}
            />
          )}
          {activeForm === 'otp' && (
            <AuthOTP
              data={registerData}
              handleChangeForm={(formStatus) => setActiveForm(formStatus)}
            />
          )}
          {activeForm === 'password' && (
            <AuthPassword
              data={registerData}
              handleChangeForm={(formStatus) => setActiveForm(formStatus)}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};
export default ODocAuth;
