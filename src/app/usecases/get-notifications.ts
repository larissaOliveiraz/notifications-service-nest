import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface IRequest {
  recipientId: string;
}

@Injectable()
export class GetNotificationsUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipientId }: IRequest) {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
