import modalReducer from '@redux/modal/modalReducer';
import notificationReducer from '@redux/notification/notificationReducer';
import userReducer from '@redux/user/userReducer';

export interface RootState {
  user: ReturnType<typeof userReducer>;
  modals: ReturnType<typeof modalReducer>;
  notification: ReturnType<typeof notificationReducer>;
}
