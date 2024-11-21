import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
const LogoutContainer = dynamic(() =>
  import('@containers/auth').then((mod) => mod.LogoutContainer),
);

const Logout = () => {
  return <LogoutContainer />;
};

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
