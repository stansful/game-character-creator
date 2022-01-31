import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ApiConfiguration, ConfigTypes } from './config/apiConfiguration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<ApiConfiguration> = app.get(ConfigService);
  const port = configService.get(ConfigTypes.PORT);

  await app.listen(port, () =>
    console.log(`Server on http://localhost:${port}`),
  );
}

bootstrap();
