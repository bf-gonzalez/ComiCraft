import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('ComiCraft API')
    .setDescription('Proyecto final')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)  

  app.use(loggerGlobal);

  await app.listen(3000);
  console.log('Server listening on PORT 3000');

}
bootstrap();
