import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { CreateSubscriptionDto } from 'src/subscriptions/dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateSubscriptionDto, appId: string) {
        try {
            return await this.prisma.subscription.create({ data: { ...dto, appId, } });
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Failed to create subscription');
        }
    }

    async findAllActive(appId: string, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;

            const [data, total] = await Promise.all([
                this.prisma.subscription.findMany({
                    where: { appId, status: 'active' },
                    include: { subscriptionItems: true },
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                this.prisma.subscription.count({ where: { appId } })
            ]);

            return { data, total, page, lastPage: Math.ceil(total / limit) };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Failed to fetch subscriptions');
        }
    }
}
