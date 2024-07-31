import { ReactElement } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import { useMediaQuery } from '@hooks/useMediaQuery';
import 'react-toastify/dist/ReactToastify.css';

interface Props {}

function NotificationWrapper({}: Props): ReactElement {
  const { desktopSize } = useMediaQuery();

  return (
    <ToastContainer
      position={'top-center'}
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={desktopSize ? false : true}
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={2}
      transition={Flip}
      closeButton={true}
      draggableDirection="x"
      draggablePercent={10}
    />
  );
}

export default NotificationWrapper;
