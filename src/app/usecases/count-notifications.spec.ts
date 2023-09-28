import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { CountNotificationsUseCase } from './count-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count Notifications', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let usecase: CountNotificationsUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    usecase = new CountNotificationsUseCase(notificationsRepository);
  });

  it('should be able to count the recipient notifications', async () => {
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-02' }),
    );

    const { count } = await usecase.execute({ recipientId: 'recipient-01' });

    expect(count).toEqual(2);
  });
});
