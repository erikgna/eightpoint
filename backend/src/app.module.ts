import { Module } from '@nestjs/common';
import { AppsModule } from 'src/apps/apps.module';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { PrismaService } from 'src/prisma.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { SubscriptionItemsModule } from './subscription-items/subscription-items.module';

@Module({
  imports: [AppsModule, SubscriptionsModule, SubscriptionItemsModule, ThrottlerModule.forRoot({
    throttlers: [{
      ttl: 60,
      limit: 15
    }
    ]
  })],
  providers: [PrismaService],
})
export class AppModule { }
