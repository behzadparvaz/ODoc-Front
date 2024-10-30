'use client';
import request from '@api/request';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LandingContainer = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   router.replace(`${routeList.homeRoute}${window?.location?.search || ''}`);
  // }, []);

  // return <></>;

  return <p>landing</p>;
};

export default LandingContainer;
