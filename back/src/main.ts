import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './moddlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(loggerGlobal);

  await app.listen(3000);
  console.log('Server listening on PORT 3000');
}
bootstrap();
