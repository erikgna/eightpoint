import { Body, Controller, Get, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { CreateSubscriptionDto } from 'src/subscriptions/dto/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Req() req, @Body() dto: CreateSubscriptionDto) {
        return this.subscriptionsService.create(dto, req.currentApp.id);
    }

    @Get()
    findAllActive(@Req() req, @Query('page') page = '1', @Query('limit') limit = '10') {
        const parsedPage = parseInt(page, 10);
        const parsedLimit = Math.min(parseInt(limit, 10), 100);
        return this.subscriptionsService.findAllActive(req.currentApp.id, parsedPage, parsedLimit);
    }
}
