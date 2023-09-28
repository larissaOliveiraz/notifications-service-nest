import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { ReadNotificationUseCase } from './read-notification';
import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFoundException } from './exceptions/notification-not-found';

describe('Read Notification', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let usecase: ReadNotificationUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    usecase = new ReadNotificationUseCase(notificationsRepository);
  });

  it('should be able to read notification', async () => {
    const newNotification = makeNotification();

    await notificationsRepository.create(newNotification);

    const { notification } = await usecase.execute({
      notificationId: newNotification._id,
    });

    expect(notification.readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a non existing notification', async () => {
    await expect(() =>
      usecase.execute({
        notificationId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(NotificationNotFoundException);
  });
});
