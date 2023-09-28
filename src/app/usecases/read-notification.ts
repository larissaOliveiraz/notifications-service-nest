import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { NotificationNotFoundException } from './exceptions/notification-not-found';

interface IRequest {
  notificationId: string;
}

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ notificationId }: IRequest) {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.read();

    await this.notificationsRepository.save(notification);

    return { notification };
  }
}
