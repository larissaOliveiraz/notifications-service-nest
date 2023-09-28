import { randomUUID } from 'crypto';
import { SendNotificationUseCase } from './send-notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications';

describe('Send Notification', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let usecase: SendNotificationUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    usecase = new SendNotificationUseCase(notificationsRepository);
  });

  it('should be able to send a notification', async () => {
    const { notification } = await usecase.execute({
      recipientId: randomUUID(),
      content: 'Nova solicitação de amizade',
      category: 'social',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
