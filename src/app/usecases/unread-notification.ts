import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { NotificationNotFoundException } from './exceptions/notification-not-found';
import { Injectable } from '@nestjs/common';

interface IRequest {
  notificationId: string;
}

@Injectable()
export class UnreadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ notificationId }: IRequest) {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);

    return { notification };
  }
}
