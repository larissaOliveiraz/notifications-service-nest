import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { SendNotificationUseCase } from 'src/app/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotificationUseCase],
})
export class HttpModule {}
