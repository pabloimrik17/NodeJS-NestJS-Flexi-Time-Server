import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  const swaggerDocumentOptions = new DocumentBuilder()
    .setTitle('Flexi Time Server')
    .addBearerAuth()
    .setDescription('Flexi Time Server API description')
    .setVersion('0.1.0') // TODO ConfigService reading package.json?
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
