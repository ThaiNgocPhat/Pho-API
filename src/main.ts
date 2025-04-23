import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const port = process.env.PORT || 7777; // Thay 7777 bằng PORT từ môi trường Heroku
  app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
  });
}
bootstrap();
