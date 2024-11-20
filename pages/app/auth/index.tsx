import dynamic from 'next/dynamic';
const AuthContainer = dynamic(() =>
  import('@containers/auth').then((mod) => mod.AuthContainer),
);

const AuthPage = () => {
  return <AuthContainer />;
};
export default AuthPage;
