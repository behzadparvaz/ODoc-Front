import { useLoginWithTapsiSSO } from '@api/user/user.rq';
import NextImage from '@com/_core/NextImage';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
interface QueryParams {
  code?: string;
}

const SSOPage = () => {
  const { mutate } = useLoginWithTapsiSSO();
  const tapsiLinkRef = useRef<HTMLAnchorElement | null>(null);

  const Config = {
    baseUrl: 'https://accounts.tapsi.ir/',
    clientId: 'doctor.tapsi',
    redirectUri: 'https://tapsi.doctor/app/auth/signin-by-sso',
    responseType: 'code',
    ssoRedirect: true,
    scope: 'tapsidoctor_access',
    prompt: 'none',
  };

  const url = `${Config.baseUrl}login?sso_redirect=${Config.ssoRedirect}&client_id=${Config.clientId}&redirect_uri=${encodeURIComponent(Config.redirectUri)}&response_type=${Config.responseType}&scope=${Config.scope}&prompt=${Config.prompt}`;

  const searchParamToObject = (searchParam: string) => {
    if (typeof searchParam !== 'string') {
      throw new TypeError('Expected a string as input');
    }

    try {
      const pairs = searchParam.startsWith('?')
        ? searchParam.slice(1).split('&')
        : searchParam.split('&');

      return pairs.reduce(
        (accumulator, currentPair) => {
          if (currentPair) {
            const [key, value] = currentPair.split('=').map(decodeURIComponent);
            accumulator[key] = value !== undefined ? value : null;
          }
          return accumulator;
        },
        {} as Record<string, string | null>,
      );
    } catch (error) {
      console.error('Error parsing search parameters:', error);
      return {};
    }
  };

  const handleRedirects = async (query: any) => {
    const codeVendorSSO = query.code as string | undefined;
    console.log(codeVendorSSO);
    if (codeVendorSSO) {
      try {
        await mutate(
          { code: codeVendorSSO },
          {
            onSuccess: () => {
              console.log('SSO login success');
              // replace(routeList.homeRoute, { query: {} });
              window.location.href = routeList.homeRoute;
            },
          },
        );
      } catch (error) {
        console.error('SSO login failed');
        // replace(routeList.homeRoute, { query: {} });
        window.location.href = routeList.homeRoute;
      }
    }
  };

  useEffect(() => {
    const query = searchParamToObject(window?.location?.search);
    const isFromTapsi = query.utm_source === 'TAPSI';

    if (query.code) {
      handleRedirects(query);
    }

    if (isFromTapsi && tapsiLinkRef.current) {
      tapsiLinkRef.current.click();
    }
  }, []);

  return (
    <div className="w-svh h-svh flex flex-col items-center justify-center bg-surface-primary">
      <a href={url} ref={tapsiLinkRef} className="hidden" />
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

export default SSOPage;
