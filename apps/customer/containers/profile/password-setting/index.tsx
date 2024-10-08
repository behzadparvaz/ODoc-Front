import { useGetProfile } from '@api/user/user.rq';
import UserPasswordForm from '@com/_molecules/UserPasswordForm';
import { MainLayout } from '@com/Layout';
import { profileText } from '@com/texts/profileText';

const PasswordSettingContainer = () => {
  const { data, isLoading: profileDataLoding } = useGetProfile();
  const profileData: any = data;
  const profileInfo = profileData?.queryResult[0];
  return (
    <MainLayout
      hasBottomNavigation
      hasHeader
      hasBackButton
      title={profileText?.passwordSetting}
    >
      {profileDataLoding === false && <UserPasswordForm data={profileInfo} />}
    </MainLayout>
  );
};
export default PasswordSettingContainer;
