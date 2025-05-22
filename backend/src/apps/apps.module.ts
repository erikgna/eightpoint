import { Module } from '@nestjs/common';
import { AppsService } from 'src/apps/apps.service';
import { PrismaService } from 'src/prisma.service';
import { AppsController } from 'src/apps/apps.controller';

@Module({
    providers: [AppsService, PrismaService],
    controllers: [AppsController]
})
export class AppsModule { }