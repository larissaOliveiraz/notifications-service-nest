import { NotificationsRepository } from '@app/repositories/notifications-repository';

interface IRequest {
  recipientId: string;
}

export class CountNotificationsUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipientId }: IRequest) {
    const count =
      await this.notificationsRepository.countManyByRecipientId(recipientId);

    return { count };
  }
}
