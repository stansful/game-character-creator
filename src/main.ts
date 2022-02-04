import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { Configuration } from './config/interfaces/configuration.interface';
import { ConfigurationTypes } from './config/enums/configurationTypes.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ whitelist: false }));

  const configService: ConfigService<Configuration> = app.get(ConfigService);
  const port = configService.get(ConfigurationTypes.PORT);

  await app.listen(port, () =>
    console.log(`Server on http://localhost:${port}`),
  );
}

bootstrap();
