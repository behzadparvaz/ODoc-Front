import { useGetProfile } from '@api/user/user.rq';
import Button from '@com/_atoms/Button';
import Spinner from '@com/_atoms/Spinner';
import AddFamilyMembers from '@com/_organisms/AddFamilyMembers';
import { MainLayout } from '@com/Layout';
import { generalTexts } from '@com/texts/generalTexts';
import { profileText } from '@com/texts/profileText';
import useModal from '@hooks/useModal';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

const FamilyMembersContainer = () => {
  const { data, isLoading: profileDataLoding } = useGetProfile({
    enabled: true,
  });
  const profileData: any = data;
  const profileInfo = profileData?.queryResult[0];
  const { push } = useRouter();
  const { addModal } = useModal();

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      title={profileText?.familyMembers}
      hasBottomNavigation
    >
      {profileDataLoding === false ? (
        <div className="p-4">
          {profileInfo ? (
            profileInfo?.familyMembers?.length ? (
              <div className="w-full flex flex-col">
                {profileInfo?.familyMembers?.map((item) => {
                  return (
                    <div
                      key={item?.id}
                      className="w-full border overflow-hidden mb-4 border-grey-200 rounded-base"
                    >
                      <div className="text-left border-b px-4 py-2 bg-grey-50 flex justify-between border-grey-200">
                        <div>{item?.fisrtname + ' ' + item?.lastName}</div>
                      </div>
                      <div className="w-full flex flex-col gap-y-3 py-2 px-4">
                        <div>شماره ملی:{item?.nationalCode}</div>
                        <div>شماره تلفن:{item?.phoneNumber}</div>
                      </div>
                    </div>
                  );
                })}

                <Button
                  buttonType="contained"
                  variant="primary"
                  className="mt-4"
                  size="large"
                  handleClick={() =>
                    addModal({
                      modal: AddFamilyMembers,
                      props: {
                        data: profileInfo?.familyMembers,
                      },
                    })
                  }
                >
                  <p>{generalTexts.add}</p>
                </Button>
              </div>
            ) : (
              <div className="pt-36 flex flex-col items-center">
                <p className="text-center text-md text-red-600">
                  در حال حاضر فردی تحت کفالت شما نیست
                </p>
                <Button
                  buttonType="contained"
                  variant="primary"
                  className="mt-4"
                  size="large"
                  handleClick={() =>
                    addModal({
                      modal: AddFamilyMembers,
                    })
                  }
                >
                  <p>{generalTexts.add}</p>
                </Button>
              </div>
            )
          ) : (
            <div className="pt-36 flex flex-col items-center">
              <p className="text-center text-md text-red-600">
                برای ثبت افراد تحت تکفل ابتدا اطلاعات کاربری خود را تکمیل کنید!
              </p>
              <Button
                buttonType="contained"
                variant="primary"
                className="mt-4"
                size="large"
                handleClick={() => push(routeList?.profileUserInfoRoute)}
              >
                <p>{profileText.registerUserInfo}</p>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center" />
      )}
    </MainLayout>
  );
};
export default FamilyMembersContainer;
