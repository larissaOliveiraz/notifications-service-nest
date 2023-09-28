import { randomUUID } from 'crypto';
import { Notification } from './notification';
import { Content } from './content';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Você recebeu uma nova solicitação de amizade'),
      category: 'social',
      recipientId: randomUUID(),
    });

    expect(notification).toBeTruthy();
  });
});
