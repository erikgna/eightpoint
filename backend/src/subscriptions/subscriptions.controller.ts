import { Body, Controller, Get, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { CreateSubscriptionDto } from 'src/subscriptions/dto/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly service: SubscriptionsService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Req() req, @Body() dto: CreateSubscriptionDto) {
        return this.service.create(dto, req.currentApp.id);
    }

    @Get()
    findAllActive(@Req() req, @Query('page') page = '1', @Query('limit') limit = '10') {
        const parsedPage = parseInt(page, 10);
        const parsedLimit = Math.min(parseInt(limit, 10), 100);
        return this.service.findAllActive(req.currentApp.id, parsedPage, parsedLimit);
    }
}
