import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { SendNotificationUseCase } from '@app/usecases/send-notification';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotificationUseCase],
})
export class HttpModule {}
