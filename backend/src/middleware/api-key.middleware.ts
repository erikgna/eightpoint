import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
    constructor(private readonly prisma: PrismaService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const apiKey = (req.headers['x-api-key'] as string | undefined)?.trim();
            if (!apiKey) throw new UnauthorizedException('Missing API key');

            const app = await this.prisma.app.findUnique({ where: { apiKey } });
            if (!app) throw new UnauthorizedException('Invalid API key');

            (req as any).currentApp = app;
            next();
        } catch (error) {
            next(error instanceof UnauthorizedException ? error : new InternalServerErrorException('Unexpected authentication error'));
        }
    }
}
