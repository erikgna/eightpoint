import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { ApiKeyMiddleware } from './middleware/api-key.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  });

  const prismaService = app.get(PrismaService);
  const apiKeyMiddleware = new ApiKeyMiddleware(prismaService);

  app.use('/subscriptions', apiKeyMiddleware.use.bind(apiKeyMiddleware));
  app.use('/apps/me', apiKeyMiddleware.use.bind(apiKeyMiddleware));
  app.use('/apps/analytics', apiKeyMiddleware.use.bind(apiKeyMiddleware));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
