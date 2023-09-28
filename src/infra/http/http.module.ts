import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { SendNotificationUseCase } from '@app/usecases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { GetNotificationsUseCase } from '@app/usecases/get-notifications';
import { CountNotificationsUseCase } from '@app/usecases/count-notifications';
import { ReadNotificationUseCase } from '@app/usecases/read-notification';
import { UnreadNotificationUseCase } from '@app/usecases/unread-notification';
import { CancelNotificationUseCase } from '@app/usecases/cancel-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotificationUseCase,
    GetNotificationsUseCase,
    CountNotificationsUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    CancelNotificationUseCase,
  ],
})
export class HttpModule {}
