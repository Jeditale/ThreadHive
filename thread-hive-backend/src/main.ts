// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ThreadHive')
    .setDescription('The ThreadHive API')
    .setVersion('0.2')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name:'jwt',
        bearerFormat: 'JWT',  // Optional, just for clarity
        in:'header',
      },
      'jwt',  // This match the name of strategy
    )
    .addSecurityRequirements('jwt')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document ,{
    swaggerOptions: {
      persistAuthorization: true, // this
  },
  })

  await app.listen(3000);
}
bootstrap();
