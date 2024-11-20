import dynamic from 'next/dynamic';
const PasswordSettingContainer = dynamic(() =>
  import('@containers/profile').then((mod) => mod.PasswordSettingContainer),
);
const PasswordSettingPage = () => {
  return <PasswordSettingContainer />;
};
export default PasswordSettingPage;
