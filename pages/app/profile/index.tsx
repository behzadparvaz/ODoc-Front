import dynamic from 'next/dynamic';
const ProfileContainer = dynamic(() =>
  import('@containers/profile').then((mod) => mod.ProfileContainer),
);

const ProfilePage = () => {
  return <ProfileContainer />;
};
export default ProfilePage;
