import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundException } from './exceptions/notification-not-found';

interface IRequest {
  notificationId: string;
}

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ notificationId }: IRequest) {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);

    return { notification };
  }
}
