import { useLoginWithTapsiSSO } from '@api/user/user.rq';
import { routeList } from '@routes/routeList';
import { searchParamToObject } from '@utilities/queryBuilder';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface QueryParams {
  code?: string;
}

const LoginWithSSO = () => {
  const { replace } = useRouter();
  const { mutate } = useLoginWithTapsiSSO();

  const handleRedirects = async () => {
    const query: QueryParams = searchParamToObject(
      window.location.search,
    ) as QueryParams;
    const codeVendorSSO = query.code;

    if (codeVendorSSO) {
      try {
        await mutate(
          { code: codeVendorSSO },
          {
            onSuccess: () => {
              console.log('SSO login success');
              return replace(routeList.homeRoute, { query: {} });
            },
          },
        );
      } catch (error) {
        console.error('SSO login failed');
        return replace(routeList.homeRoute, { query: {} });
      }
    }

    return null;
  };

  useEffect(() => {
    handleRedirects();
  }, []);

  return null;
};
export default LoginWithSSO;
