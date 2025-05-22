import { Body, Controller, Delete, Get, Param, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubscriptionItemsService } from './subscription-items.service';
import { CreateSubscriptionItemDto } from './dto/create-subscription-item.dto';

@Controller('subscriptions/:subscriptionId/items')
export class SubscriptionItemsController {
    constructor(private readonly service: SubscriptionItemsService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Param('subscriptionId') subscriptionId: string, @Body() dto: CreateSubscriptionItemDto) {
        return this.service.create(dto, subscriptionId);
    }

    @Get()
    findAll(@Param('subscriptionId') subscriptionId: string) {
        return this.service.findAllBySubscription(subscriptionId);
    }

    @Delete(':itemId')
    remove(@Param('subscriptionId') subscriptionId: string, @Param('itemId') itemId: string) {
        return this.service.delete(subscriptionId, itemId);
    }

}
