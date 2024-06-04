import { useGetProfile } from "@api/user/user.rq";
import UserPasswordForm from "@com/_molecules/UserPasswordForm";
import ProfileLayout from "@com/_template/ProfileLayout";
import { profileText } from "@com/texts/profileText";

const Profile = () => {

    const { data, isLoading: profileDataLoding } = useGetProfile()
    const profileData: any = data;
    const profileInfo = profileData?.queryResult[0];
    return (
        <ProfileLayout hasBackBtn className=" px-6 py-6" title={profileText?.passwordSetting}>
            {profileDataLoding === false && <UserPasswordForm data={profileInfo} />}
        </ProfileLayout>
    )
}
export default Profile