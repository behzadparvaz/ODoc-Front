import { useGetProfile } from '@api/user/user.rq';
import UserInfoForm from '@com/_molecules/UserInfoForm';
import { MainLayout } from '@com/Layout';

const UserInfoContainer = () => {
  const { data, isLoading: profileDataLoding } = useGetProfile({
    enabled: true,
  });
  const profileData: any = data;
  const profileInfo = profileData?.queryResult[0];

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      title="اطلاعات شخصی"
    >
      {profileDataLoding === false && <UserInfoForm data={profileInfo} />}
    </MainLayout>
  );
};

export default UserInfoContainer;
