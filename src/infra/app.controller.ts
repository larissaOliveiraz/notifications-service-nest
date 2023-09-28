import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async findAll() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: any) {
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
