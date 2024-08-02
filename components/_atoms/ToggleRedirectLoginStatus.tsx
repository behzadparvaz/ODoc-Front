import useStorage from '@hooks/useStorage';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ToggleRedirectLoginOrNotLogin = () => {
  const { asPath, replace } = useRouter();

  // Ignore protected routes if they are not in app directory
  if (!asPath?.includes('/app/')) return null

  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  const notLoginRedirectConditions =
    !token && !asPath?.includes(routeList?.loginRoute);
  const loginRedirectConditions =
    token && asPath?.includes(routeList?.loginRoute);

  useEffect(() => {
    if (notLoginRedirectConditions) {
      replace(routeList.loginRoute);
    } else if (loginRedirectConditions) {
      replace(routeList.homeRoute);
    }
  },[]);

  return null;
};
export default ToggleRedirectLoginOrNotLogin;
