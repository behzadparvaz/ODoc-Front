import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Landing = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace({
      pathname: routeList.homeRoute,
      query: window?.location?.search,
    });
  }, []);

  return <></>;
};

export default Landing;
