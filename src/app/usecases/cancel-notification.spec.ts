import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { CancelNotificationUseCase } from './cancel-notification';
import { Notification } from '@app/entities/notification';
import { randomUUID } from 'crypto';
import { Content } from '@app/entities/content';
import { NotificationNotFoundException } from './exceptions/notification-not-found';

describe('Cancel Notification', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let usecase: CancelNotificationUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    usecase = new CancelNotificationUseCase(notificationsRepository);
  });

  it('should be able to cancel a notification', async () => {
    const notification = new Notification({
      recipientId: randomUUID(),
      content: new Content('Test notification'),
      category: 'test',
    });

    await notificationsRepository.create(notification);

    await usecase.execute({
      notificationId: notification._id,
    });

    expect(notificationsRepository.notifications[0].cancelledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    await expect(() =>
      usecase.execute({
        notificationId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(NotificationNotFoundException);
  });
});
