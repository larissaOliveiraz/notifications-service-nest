import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { Content } from '../entities/content';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface IRequest {
  recipientId: string;
  content: string;
  category: string;
}

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipientId, content, category }: IRequest) {
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
