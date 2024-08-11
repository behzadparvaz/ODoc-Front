import UserInfoForm from '@com/_molecules/UserInfoForm';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { generalTexts } from '@com/texts/generalTexts';

const AddUserModal = () => {
  return (
    <BottomModalContainer
      height={'560px'}
      hasCloseButton={true}
      title={generalTexts?.add}
    >
      <UserInfoForm isRegisterInOrderPage />
    </BottomModalContainer>
  );
};
export default AddUserModal;
