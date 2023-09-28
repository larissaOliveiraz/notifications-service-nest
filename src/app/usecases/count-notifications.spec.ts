import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { CountNotificationsUseCase } from './count-notifications';
import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/content';

describe('Count Notifications', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let usecase: CountNotificationsUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    usecase = new CountNotificationsUseCase(notificationsRepository);
  });

  it('should be able to count the recipient notifications', async () => {
    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-01',
        content: new Content('Test notification'),
        category: 'test',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-01',
        content: new Content('Test notification'),
        category: 'test',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-02',
        content: new Content('Test notification'),
        category: 'test',
      }),
    );

    const { count } = await usecase.execute({ recipientId: 'recipient-01' });

    expect(count).toEqual(2);
  });
});
