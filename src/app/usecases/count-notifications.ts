import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface IRequest {
  recipientId: string;
}

@Injectable()
export class CountNotificationsUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipientId }: IRequest) {
    const count =
      await this.notificationsRepository.countManyByRecipientId(recipientId);

    return { count };
  }
}
