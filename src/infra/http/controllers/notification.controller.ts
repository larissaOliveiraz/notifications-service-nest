import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationDTO } from '../dto/create-notification';
import { SendNotificationUseCase } from '@app/usecases/send-notification';
import { NotificationViewModel } from '../viewmodels/notification-view-model';
import { CancelNotificationUseCase } from '@app/usecases/cancel-notification';
import { GetNotificationsUseCase } from '@app/usecases/get-notifications';
import { CountNotificationsUseCase } from '@app/usecases/count-notifications';
import { ReadNotificationUseCase } from '@app/usecases/read-notification';
import { UnreadNotificationUseCase } from '@app/usecases/unread-notification';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private getNotifications: GetNotificationsUseCase,
    private countNotifications: CountNotificationsUseCase,
    private readNotification: ReadNotificationUseCase,
    private unreadNotification: UnreadNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
  ) {}

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

  @Get('/all/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getNotifications.execute({
      recipientId,
    });

    return notifications.map(NotificationViewModel.toHTTP);
  }

  @Get('/count/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countNotifications.execute({ recipientId });

    return { count };
  }

  @Patch('/:id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch('/:id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Patch('/:id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }
}
