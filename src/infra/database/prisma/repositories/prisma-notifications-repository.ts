import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Notification } from '@app/entities/notification';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification) {
    await this.prisma.notification.create({
      data: {
        recipientId: notification.recipientId,
        content: notification.content.value,
        category: notification.category,
      },
    });
  }
}
