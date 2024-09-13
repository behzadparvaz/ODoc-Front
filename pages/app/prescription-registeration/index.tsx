import { useEffect } from 'react';
import useModal from '@hooks/useModal';
import RXRegistration from '@com/_organisms/RXRegistration';

const OrderRegistrationPage = () => {
  const { addModal } = useModal();

  useEffect(() => {
    addModal({
      modal: RXRegistration,
    });
  }, []);

  return null;
};
export default OrderRegistrationPage;
