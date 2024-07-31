import { OpenNotificationAction } from "@redux/notification/notificationActions";

export type NotificationTypes = {
  open?: OpenNotificationAction['payload']['open'];
  message: OpenNotificationAction['payload']['message'];
  type: OpenNotificationAction['payload']['type'];
  notifType: OpenNotificationAction['payload']['notifType'];
};
