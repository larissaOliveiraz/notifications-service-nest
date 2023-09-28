import { Notification } from '@app/entities/notification';

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    return {
      id: notification._id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
    };
  }
}
