import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification._id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
    };
  }

  static toDomain(notification: PrismaNotification): Notification {
    return new Notification(
      {
        recipientId: notification.recipientId,
        content: new Content(notification.content),
        category: notification.category,
        readAt: notification.readAt,
        cancelledAt: notification.cancelledAt,
        createdAt: notification.createdAt,
      },
      notification.id,
    );
  }
}
