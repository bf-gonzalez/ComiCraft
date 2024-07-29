import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


const corsOptions: CorsOptions= {
  origin: ["http://localhost:3001"],//Aca va la conexion con el front
  methods:['GET', 'POST', 'PUT', 'DELETE'],
};
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
  app.useGlobalPipes(new ValidationPipe);
  app.enableCors();
  await app.listen(3000);
  console.log('Server listening on PORT 3000');

}
bootstrap();
