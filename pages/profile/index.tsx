import ProfileNavigation from "@com/_organisms/ProfileNavigation";
import ProfileLayout from "@com/_template/ProfileLayout";
import { profileText } from "@com/texts/profileText";

const Profile = () => {
    return (
        <ProfileLayout title={profileText?.profile}>
            <ProfileNavigation />
        </ProfileLayout>
    )
}
export default Profile