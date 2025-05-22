import { Body, Controller, Get, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAppDto } from 'src/apps/dto/create-app.dto';
import { AppsService } from 'src/apps/apps.service';

@Controller('apps')
export class AppsController {
    constructor(private readonly appsService: AppsService) { }

    @Get('me')
    getAppByApiKey(@Req() req) {
        return this.appsService.getAppByApiKey(req.currentApp.id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() dto: CreateAppDto) {
        return this.appsService.create(dto);
    }

    @Get('analytics')
    getAnalytics(@Req() req) {
        return this.appsService.getAnalytics(req.currentApp.id);
    }
}
