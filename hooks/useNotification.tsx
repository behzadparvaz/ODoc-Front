import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRef, useCallback } from 'react';
import {
  closeNotificationAction,
  openNotificationAction,
  OpenNotificationAction,
} from '@redux/notification/notificationActions';
import { DangerIcon, TickSquareIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { RootState } from '@utilities/interfaces/redux';

const useNotification = () => {
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const { open } = useSelector((state: RootState) => state.notification);
  const openNotification = useCallback(
    (message, type, notifType) => {
      dispatch(openNotificationAction(message, type, notifType));
    },
    [dispatch],
  );

  const closeNotification = useCallback(() => {
    dispatch(closeNotificationAction());
  }, [dispatch]);

  return {
    openNotification({
      message,
      type,
      notifType,
      autoClose = 5000,
      onClose = () => {},
    }: OpenNotificationAction['payload']) {
      let icon = null;
      if (type === 'success') {
        icon = (
          <TickSquareIcon width={16} height={16} fill={colors?.teal[500]} />
        );
      } else if (type === 'error' || type === 'warning') {
        icon = <DangerIcon width={16} height={16} fill={colors?.orange[500]} />;
      }
      if (notifType === 'AddToCart' && open) {
        return toast.update(toastId.current, {
          type: toast.TYPE.SUCCESS,
          autoClose,
          icon: true,
          closeButton: true,
          hideProgressBar: true,
        });
      } else {
        return (toastId.current = toast(message, {
          position: 'top-center',
          autoClose,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          type: type,
          toastId: notifType,
          icon,
          closeButton: true,
          onOpen: () => openNotification(message, type, notifType),
          onClose: () => {
            toast.dismiss(toastId.current);
            onClose();
          },
        }));
      }
    },
    closeNotification() {
      toast.dismiss(toastId.current);
      closeNotification();
    },
  };
};

export default useNotification;
