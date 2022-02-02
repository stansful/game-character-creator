import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ApiConfiguration, ConfigTypes } from './config/apiConfiguration';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ whitelist: false }));

  const configService: ConfigService<ApiConfiguration> = app.get(ConfigService);
  const port = configService.get(ConfigTypes.PORT);

  await app.listen(port, () =>
    console.log(`Server on http://localhost:${port}`),
  );
}

bootstrap();
