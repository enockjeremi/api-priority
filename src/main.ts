import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors();

  app.useGlobalGuards(
    new JwtAuthGuard(app.get(Reflector)),
    new RolesGuard(app.get(Reflector)),
  );
  app.setGlobalPrefix('api/v1');

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('API Priority')
    .setDescription('API de tareas.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
