import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../app/entities/notification';
import { NotificationsRepository } from '../../../../app/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';

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
