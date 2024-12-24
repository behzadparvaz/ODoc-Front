import { useLoginWithTapsiSSO } from '@api/user/user.rq';
import NextImage from '@com/_core/NextImage';
import { routeList } from '@routes/routeList';
import { searchParamToObject } from '@utilities/queryBuilder';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUserAction } from '@redux/user/userActions';

interface QueryParams {
  code?: string;
}

const AuthRedirectContainer = () => {
  const { mutate } = useLoginWithTapsiSSO();
  const { replace } = useRouter();
  const dispatch = useDispatch();

  const handleRedirects = async (query: QueryParams) => {
    const codeVendorSSO = query.code;

    if (codeVendorSSO) {
      try {
        await mutate(
          { code: codeVendorSSO },
          {
            onSuccess: (data: any) => {
              console.log('SSO login success');
              Cookies.set('token', data?.token, { expires: 365 });
              Cookies.set('loginWithTapsiSSO', true, { expires: 365 });
              localStorage.setItem('token', data?.token);
              dispatch(
                setUserAction({
                  mobileNumber: data?.phoneNumber,
                  token: data?.token,
                }),
              );
              replace(routeList.homeRoute);
            },
            onError: (error) => {
              console.error('SSO login failed:', error);
              replace(routeList.homeRoute);
            },
          },
        );
      } catch (error) {
        console.error('Error during SSO login:', error);
        replace(routeList.homeRoute);
      }
    }
  };
  useEffect(() => {
    const query: QueryParams = searchParamToObject(window.location.search);

    if (query.code) {
      handleRedirects(query);
    }
  }, []);

  return (
    <div className="w-svh h-svh flex flex-col items-center justify-center bg-surface-primary">
      <div
        role="status"
        className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
      >
        <NextImage
          src={'/images/logo/tapsi-doctor-logo.svg'}
          alt="tapsi-logo"
          className="animate-bounce"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};

export default AuthRedirectContainer;
