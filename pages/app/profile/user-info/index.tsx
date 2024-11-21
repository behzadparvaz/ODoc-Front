import dynamic from 'next/dynamic';
const UserInfoContainer = dynamic(() =>
  import('@containers/profile').then((mod) => mod.UserInfoContainer),
);

const UserInfoPage = () => {
  return <UserInfoContainer />;
};

export default UserInfoPage;
