import NextImage from '@com/_core/NextImage';
import { searchParamToObject } from '@utilities/queryBuilder';
import { useEffect, useRef } from 'react';

const SuperAppPage = () => {
  const tapsiLinkRef = useRef<HTMLAnchorElement | null>(null);

  const Config = {
    baseUrl: 'https://accounts.tapsi.ir/',
    clientId: 'doctor.tapsi',
    redirectUri: 'https://tapsi.doctor/app/auth/signin-by-sso/',
    responseType: 'code',
    scope: 'tapsidoctor_access',
    prompt: 'none',
  };

  useEffect(() => {
    const query: any = searchParamToObject(window?.location?.search);
    if (query.utm_source === 'TAPSI' && tapsiLinkRef.current) {
      tapsiLinkRef.current.click();
    }
  }, []);

  const tapsiRedirectUrl = `${Config.baseUrl}login?client_id=${Config.clientId}&redirect_uri=${encodeURIComponent(Config.redirectUri)}&response_type=${Config.responseType}&scope=${Config.scope}&prompt=${Config.prompt}`;

  return (
    <>
      <a href={tapsiRedirectUrl} ref={tapsiLinkRef} className="hidden" />
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
    </>
  );
};

export default SuperAppPage;
