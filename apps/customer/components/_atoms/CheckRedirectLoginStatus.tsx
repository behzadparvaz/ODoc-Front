import { useLoginWithTapsiSSO } from '@api/user/user.rq';
import useStorage from '@hooks/useStorage';
import { routeList } from '@routes/routeList';
import { searchParamToObject } from '@utilities/queryBuilder';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CheckRedirectLoginOrNotLogin = () => {
  const { asPath } = useRouter();
  // Ignore protected routes if they are not in app directory
  return asPath?.includes('/app') ? <ToggleRedirectLoginStatus /> : null;
};
export default CheckRedirectLoginOrNotLogin;

const ToggleRedirectLoginStatus = () => {
  const { asPath, replace } = useRouter();
  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  const notLoginRedirectConditions =
    !token && !asPath?.includes(routeList?.loginRoute);
  const loginRedirectConditions =
    token && asPath?.includes(routeList?.loginRoute);

  const { mutate } = useLoginWithTapsiSSO();
  useEffect(() => {
    const query: any = searchParamToObject(window?.location?.search);
    const loginWithTapsiCode = query?.code;
    if (notLoginRedirectConditions) {
      if (loginWithTapsiCode) {
        const body = {
          code: loginWithTapsiCode,
        };
        mutate(body);
      } else {
        replace(routeList.loginRoute);
      }
    } else if (loginRedirectConditions) {
      replace(routeList.homeRoute);
    }
  }, []);

  return null;
};
