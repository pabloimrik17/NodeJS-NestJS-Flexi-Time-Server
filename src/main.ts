import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version as projectVersion } from '../package.json';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  const swaggerDocumentOptions = new DocumentBuilder()
    .setTitle('Flexi Time Server')
    .addBearerAuth()
    .setDescription('Flexi Time Server API description')
    .setVersion(projectVersion)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
