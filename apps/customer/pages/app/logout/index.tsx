import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import { LogoutContainer } from '@containers';

const LogoutPage = () => {
  return <LogoutContainer />;
};

export default LogoutPage;

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
