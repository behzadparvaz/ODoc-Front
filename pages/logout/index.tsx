import { logoutUser } from '@redux/user/userActions';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import useStorage from '@hooks/useStorage';
import request from '@api/request';
import { useQueryClient } from 'react-query';
import { resetMapStateAction } from '@redux/map/mapActions';
import { routeList } from '@routes/routeList';

interface Props {}

function Logout({ }: Props): ReactElement {
  const dispatch = useDispatch();
  const router = useRouter();
  const { removeItem, clearStorage } = useStorage();
  const queryClient = useQueryClient();

  useEffect(() => {
    dispatch(logoutUser());
    dispatch(resetMapStateAction());
    request.setToken(null);
    clearStorage();
    removeItem('persist:root', 'local');
    Cookies.remove('token');
    queryClient.clear();
    router.replace(routeList?.loginRoute);
  }, [dispatch]);

  return null;
}

export default Logout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  Cookies.remove('token');
  ctx.res.setHeader('Set-Cookie', [
    `user=deleted; Max-Age=0`,
    `token=deleted; Max-Age=0`,
    `tokenMS=deleted; Max-Age=0`,
    `store=deleted; Max-Age=0`,
    `utm_source=deleted; Max-Age=0`,
    `tatoken=deleted; Max-Age=0`,
  ]);
  return {
    props: {},
  };
};
