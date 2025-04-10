import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  const configService = app.get(ConfigService);
  const API_GATEWAY_PORT = configService.get<number>('API_GATEWAY_PORT', 3000);
  await app.listen(API_GATEWAY_PORT);
}
bootstrap();
