import { Notification } from '@app/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
    };
  }
}
