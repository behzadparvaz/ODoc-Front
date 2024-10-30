import NextImage from '@com/_core/NextImage';
// import AuthPassword from '@com/_molecules/AuthPassword';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import useStorage from '@hooks/useStorage';
import { routeList } from '@routes/routeList';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { MainLayout } from '@com/Layout';

const AuthMobileNumber = dynamic(
  () => import('@com/_molecules/AuthMobileNumber'),
);
const AuthOTP = dynamic(() => import('@com/_molecules/AuthOTP'));

const AuthContainer = () => {
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
        className={`h-full ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
      >
        <div className="absolute w-full text-center tra top-14 z-10">
          <NextImage
            src={'/static/images/staticImages/tapsi-doctor-logo.svg'}
            width={145}
            height={24}
            alt="tapsi-daroo-logo"
          />
        </div>
        <div className="h-full">
          <NextImage
            src={'/static/images/staticImages/login-bg.png'}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="bg-white rounded-t-[20px] shadow-2xl absolute inset-x-0 bottom-0">
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
        </div>
      </div>
    </MainLayout>
  );
};
export default AuthContainer;
