import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateNotificationValidator } from './create-notification-validator';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async findAll() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationValidator) {
    const { recipientId, content, category } = body;

    return this.prismaService.notification.create({
      data: {
        recipientId,
        content,
        category,
      },
    });
  }
}
