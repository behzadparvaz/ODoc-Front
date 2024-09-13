import ProfileNavigation from '@com/_organisms/ProfileNavigation';
import { MainLayout } from '@com/Layout';
import { profileText } from '@com/texts/profileText';

const Profile = () => {
  return (
    <MainLayout hasBottomNavigation title={profileText?.profile}>
      <ProfileNavigation />
    </MainLayout>
  );
};
export default Profile;
