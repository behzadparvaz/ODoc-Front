import BlockedLocationPermissionModal from '@com/_organisms/BlockedLocationPermissionModal';
import { setMapStateAction } from '@redux/map/mapActions';

export function positionError(error, openNotification) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      openNotification({
        message: 'دسترسی به موقعیت شما امکان پذیر نیست ',
        type: 'error',
        notifType: 'successOrFailedMessage',
      });
      break;

    case error.POSITION_UNAVAILABLE:
      openNotification({
        message: 'دسترسی به موقعیت شما امکان پذیر نیست',
        type: 'error',
        notifType: 'successOrFailedMessage',
      });
      break;

    case error.TIMEOUT:
      openNotification({
        message: 'خطا در دریافت موقعیت، لطفا مجددا تلاش نمایید',
        type: 'error',
        notifType: 'successOrFailedMessage',
      });
      break;

    case error.UNKNOWN_ERROR:
      openNotification({
        message: 'خطای دسترسی به شبکه',
        type: 'error',
        notifType: 'successOrFailedMessage',
      });
      break;
  }
}

export function setCurrentPosition(position, dispatch) {
  let viewport = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  dispatch(
    setMapStateAction({
      viewport,
    })
  );
}

export function setCurrentLocation(geoLocationState, dispatch, addModal, callbackFunction) {
  if (navigator) {
    if (geoLocationState === 'denied') {
      callbackFunction && callbackFunction();
      addModal({
        modal: BlockedLocationPermissionModal,
      });
    } else {
      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          callbackFunction && callbackFunction();
          setCurrentPosition(position, dispatch);
        },
        () => {
          callbackFunction && callbackFunction();
          addModal({
            modal: BlockedLocationPermissionModal,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    }
  }
}
