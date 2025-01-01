import { useRouter } from 'next/router';

import { Button } from '@com/_atoms/NewButton';
import { FailIcon } from '@com/icons';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import useModal from '@hooks/useModal';
import { routeList } from '@routes/routeList';
import { useQueryClient } from '@tanstack/react-query';

const LogoutModal = () => {
  const { removeLastModal } = useModal();
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    queryClient.clear();
    push(routeList?.logoutRoute);
  };

  return (
    <BottomModalContainer height={314} hasCloseButton={false}>
      <div className="flex flex-col items-center justify-center gap-y-4 p-4">
        <div className="w-[56px] h-[56px] flex justify-center items-center bg-red-50 rounded-full">
          <FailIcon />
        </div>

        <span className="text-md font-semibold leading-7">
          خروج از حساب کاربری
        </span>

        <span className="text-md font-normal leading-6 text-grey-600">
          آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
        </span>

        <div className="w-full flex gap-x-4">
          <Button
            variant="secondary"
            className="w-full"
            onClick={removeLastModal}
          >
            انصراف
          </Button>
          <Button variant="danger" className="w-full" onClick={handleLogout}>
            خروج
          </Button>
        </div>
      </div>
    </BottomModalContainer>
  );
};

export default LogoutModal;
