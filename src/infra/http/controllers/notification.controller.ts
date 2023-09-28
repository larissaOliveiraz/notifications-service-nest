import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDTO } from '../dtos/create-notification';
import { SendNotificationUseCase } from '@app/use-cases/send-notification';

@Controller('notifications')
export class NotificationController {
  constructor(private sendNotification: SendNotificationUseCase) {}

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}
