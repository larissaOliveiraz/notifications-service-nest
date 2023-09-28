import { NotificationsRepository } from '@app/repositories/notifications-repository';

interface IRequest {
  recipientId: string;
}

export class GetNotificationsUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipientId }: IRequest) {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
