import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SubscriptionItemsService } from './subscription-items.service';
import { SubscriptionItemsController } from './subscription-items.controller';

@Module({
  providers: [SubscriptionItemsService, PrismaService],
  controllers: [SubscriptionItemsController]
})
export class SubscriptionItemsModule { }
