import { useGetProfile } from '@api/user/user.rq';
import UserInfoForm from '@com/_molecules/UserInfoForm';
import { MainLayout } from '@com/Layout';

import { profileText } from '@com/texts/profileText';
const Profile = () => {
  const { data, isLoading: profileDataLoding } = useGetProfile();
  const profileData: any = data;
  const profileInfo = profileData?.queryResult[0];

  return (
    <MainLayout
      hasBottomNavigation
      hasHeader
      hasBackButton
      title={profileText?.userInfo}
    >
      {profileDataLoding === false && <UserInfoForm data={profileInfo} />}
    </MainLayout>
  );
};
export default Profile;
