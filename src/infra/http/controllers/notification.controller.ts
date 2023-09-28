import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDTO } from '../dto/create-notification';
import { SendNotificationUseCase } from '@app/usecases/send-notification';
import { NotificationViewModel } from '../viewmodels/notification-view-model';

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

    return NotificationViewModel.toHTTP(notification);
  }
}
