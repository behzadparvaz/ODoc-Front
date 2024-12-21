import { useLoginWithTapsiSSO } from '@api/user/user.rq';
import NextImage from '@com/_core/NextImage';
import { routeList } from '@routes/routeList';
import { searchParamToObject } from '@utilities/queryBuilder';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface QueryParams {
  code?: string;
}

const RedirectPage = () => {
  const { mutate } = useLoginWithTapsiSSO();
  const { replace } = useRouter();

  const handleRedirects = async (query: QueryParams) => {
    const codeVendorSSO = query.code;

    if (codeVendorSSO) {
      try {
        await mutate(
          { code: codeVendorSSO },
          {
            onSuccess: () => {
              console.log('SSO login success');
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

export default RedirectPage;
