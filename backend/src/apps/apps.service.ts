import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAppDto } from 'src/apps/dto/create-app.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppsService {
    constructor(private prisma: PrismaService) { }

    async getAppByApiKey(id: string) {
        try {
            const app = await this.prisma.app.findUnique({ where: { id } });
            if (!app) throw new NotFoundException('App with the provided API key not found');
            return app;
        } catch (error) {
            console.error(error);
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to get app by API key');
        }
    }

    async create(dto: CreateAppDto) {
        try {
            const existingApp = await this.prisma.app.findFirst({
                where: {
                    OR: [
                        { name: dto.name },
                        { developerEmail: dto.developerEmail }
                    ],
                },
            });
            if (existingApp) throw new BadRequestException('App with the same name or developer email already exists');
            return await this.prisma.app.create({ data: { ...dto, apiKey: uuidv4() } });
        } catch (error) {
            console.error(error)
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to create app');
        }
    }

    async getAnalytics(id: string) {
        try {
            const app = await this.prisma.app.findUnique({ where: { id } });
            if (!app) throw new NotFoundException('App not found');

            const subscriptions = await this.prisma.subscription.findMany({ where: { appId: app.id, status: 'active' } });

            const totalRevenue = subscriptions.reduce((sum, s) => sum + (s.amount ?? 0), 0);
            const count = subscriptions.length;

            return { totalRevenue, subscriptions: count };
        } catch (error) {
            console.error(error)
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to get analytics');
        }
    }
}
