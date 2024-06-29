import useStorage from '@hooks/useStorage';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ToggleRedirectLoginOrNotLogin = () => {
  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  const { asPath, replace } = useRouter();
  const isNotLoginPages = asPath === routeList?.homeRoute;
  const notLoginRedirectConditions =
    !token && !asPath?.includes(routeList?.loginRoute);
  const loginRedirectConditions =
    token && asPath?.includes(routeList?.loginRoute);

  // useEffect(() => {
  //   if (!isNotLoginPages) {
  //     if (notLoginRedirectConditions) {
  //       replace('/auth');
  //     } else if (loginRedirectConditions) {
  //       replace('/');
  //     }
  //   }
  // }, []);
  useEffect(() => {
    if (notLoginRedirectConditions) {
      replace('/auth');
    } else if (loginRedirectConditions) {
      replace('/');
    }
  },[]);

  return null;
};
export default ToggleRedirectLoginOrNotLogin;
