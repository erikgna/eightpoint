import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSubscriptionItemDto } from './dto/create-subscription-item.dto';

@Injectable()
export class SubscriptionItemsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateSubscriptionItemDto, subscriptionId: string) {
        try {
            const existingSubscription = await this.prisma.subscription.findUnique({ where: { id: subscriptionId } });
            if (!existingSubscription) throw new NotFoundException('Subscription not found');

            return await this.prisma.subscriptionItem.create({
                data: {
                    ...dto,
                    subscriptionId,
                },
            });
        } catch (error) {
            console.error(error);
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to create subscription item');
        }
    }

    async findAllBySubscription(subscriptionId: string, page = 1, limit = 10) {
        try {
            const existingSubscription = await this.prisma.subscription.findUnique({ where: { id: subscriptionId } });
            if (!existingSubscription) throw new NotFoundException('Subscription not found');

            const skip = (page - 1) * limit;

            const [data, total] = await Promise.all([
                this.prisma.subscriptionItem.findMany({
                    where: { subscriptionId },
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.subscriptionItem.count({ where: { subscriptionId } }),
            ]);

            return { data, total, page, lastPage: Math.ceil(total / limit) };
        } catch (error) {
            console.error(error);
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch subscription items');
        }
    }

    async delete(subscriptionId: string, itemId: string) {
        try {
            const existingSubscription = await this.prisma.subscription.findUnique({ where: { id: subscriptionId } });
            if (!existingSubscription) throw new NotFoundException('Subscription not found');

            const existing = await this.prisma.subscriptionItem.findUnique({ where: { id: itemId } });
            if (!existing) throw new NotFoundException('Subscription item not found');

            return await this.prisma.subscriptionItem.delete({ where: { id: itemId } });
        } catch (error) {
            console.error(error);
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete subscription item');
        }
    }
}
