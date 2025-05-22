import { Body, Controller, Get, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAppDto } from 'src/apps/dto/create-app.dto';
import { AppsService } from 'src/apps/apps.service';

@Controller('apps')
export class AppsController {
    constructor(private readonly service: AppsService) { }

    @Get('me')
    getAppByApiKey(@Req() req) {
        return this.service.getAppByApiKey(req.currentApp.id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() dto: CreateAppDto) {
        return this.service.create(dto);
    }

    @Get('analytics')
    getAnalytics(@Req() req) {
        return this.service.getAnalytics(req.currentApp.id);
    }
}
