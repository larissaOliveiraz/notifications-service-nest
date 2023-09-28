import { randomUUID } from 'crypto';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      recipientId: randomUUID(),
      content: 'Nova solicitação de amizade',
      category: 'social',
    });

    expect(notification).toBeTruthy();
  });
});
