import dynamic from 'next/dynamic';

const AuthRedirectContainer = dynamic(
  () => import('@containers/auth/signin-by-sso'),
  { ssr: false },
);

const RedirectPage = () => <AuthRedirectContainer />;

export default RedirectPage;
