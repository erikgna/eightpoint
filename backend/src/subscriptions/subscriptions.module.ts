import { Module } from '@nestjs/common';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { SubscriptionsController } from 'src/subscriptions/subscriptions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SubscriptionsService, PrismaService],
  controllers: [SubscriptionsController]
})
export class SubscriptionsModule { }
