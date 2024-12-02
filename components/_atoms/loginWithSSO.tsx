import { useLoginWithTapsiSSO } from '@api/user/user.rq';
import useStorage from '@hooks/useStorage';
import { routeList } from '@routes/routeList';
import { searchParamToObject } from '@utilities/queryBuilder';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface QueryParams {
  code?: string;
}

const LoginWithSSO = () => {
  const { getItem } = useStorage();
  const { replace } = useRouter();
  const { mutate } = useLoginWithTapsiSSO();
  const token = getItem('token', 'local');

  const handleRedirects = async () => {
    const query: QueryParams = searchParamToObject(
      window.location.search,
    ) as QueryParams;
    const codeVendorSSO = query.code;

    if (!token) {
      if (codeVendorSSO) {
        try {
          await mutate(
            { code: codeVendorSSO },
            {
              onSuccess: () => {
                console.log('SSO login success');
              },
            },
          );
        } catch (error) {
          console.error('SSO login failed');
        }
      }
    }
    replace(routeList.homeRoute);
  };

  useEffect(() => {
    handleRedirects();
  }, []);

  return null;
};
export default LoginWithSSO;
