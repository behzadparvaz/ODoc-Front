import { Action } from 'redux';
import notificationTypes from './notificationTypes';

interface INotification {
  payload: {
    open?: boolean;
    type: 'error' | 'success' | 'info' | 'warning' | null;
    message: string;
    notifType: 'AddToCart' | 'successOrFailedMessage' | null;
    autoClose?: number;
    onClose?: () => void;
  };
}

export type OpenNotificationAction = INotification & Action<notificationTypes.Open_Notification>;

export const openNotificationAction = (
  message: INotification['payload']['message'],
  type: INotification['payload']['type'],
  notifType: INotification['payload']['notifType']
): OpenNotificationAction => ({
  type: notificationTypes.Open_Notification,
  payload: { message, type, open: true, notifType },
});

export type CloseNotificationAction = INotification & Action<notificationTypes.Close_Notification>;

export const closeNotificationAction = (): CloseNotificationAction => ({
  type: notificationTypes.Close_Notification,
  payload: {
    message: '',
    type: null,
    open: false,
    notifType: null,
  },
});

export type NotificationActions = OpenNotificationAction | CloseNotificationAction;
