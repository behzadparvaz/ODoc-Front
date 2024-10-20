import { NotificationTypes } from '@utilities/interfaces/notification';
import { Reducer } from 'redux';
import { NotificationActions } from './notificationActions';
import notificationTypes from './notificationTypes';

const INITIAL_STATE = {
  open: false,
  message: '',
  type: null,
  notifType: null,
};

const notificationReducer: Reducer<NotificationTypes, NotificationActions> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case notificationTypes.Open_Notification:
      return {
        ...action.payload,
      };
    case notificationTypes.Close_Notification:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
