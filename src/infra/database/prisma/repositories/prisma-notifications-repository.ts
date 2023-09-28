import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Notification } from '@app/entities/notification';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification) {
    const data = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data,
    });
  }
}
