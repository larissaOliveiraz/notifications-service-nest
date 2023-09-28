import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFoundException } from './exceptions/notification-not-found';
import { UnreadNotificationUseCase } from './unread-notification';

describe('Unread Notification', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let usecase: UnreadNotificationUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    usecase = new UnreadNotificationUseCase(notificationsRepository);
  });

  it('should be able to unread notification', async () => {
    const newNotification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(newNotification);

    const { notification } = await usecase.execute({
      notificationId: newNotification._id,
    });

    expect(notification.readAt).toEqual(null);
  });

  it('should not be able to unread a non existing notification', async () => {
    await expect(() =>
      usecase.execute({
        notificationId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(NotificationNotFoundException);
  });
});
