import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { Content } from '../entities/content';

interface IRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface IResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  async execute({
    recipientId,
    content,
    category,
  }: IRequest): Promise<IResponse> {
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    return { notification };
  }
}
