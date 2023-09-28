import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { GetNotificationsUseCase } from './get-notifications';

describe('Get Notifications', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let usecase: GetNotificationsUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    usecase = new GetNotificationsUseCase(notificationsRepository);
  });

  it('should be able to get notifications from the recipient', async () => {
    await notificationsRepository.create(makeNotification());
    await notificationsRepository.create(makeNotification());
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-02' }),
    );

    const { notifications } = await usecase.execute({
      recipientId: 'recipient-01',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-01' }),
        expect.objectContaining({ recipientId: 'recipient-01' }),
      ]),
    );
  });
});
