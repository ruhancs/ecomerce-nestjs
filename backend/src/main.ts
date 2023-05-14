// migraçao typeorm
// npx typeorm migration:create ./src/migrations/create_table_user

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // validaçao dos dados recebidos do user
      whitelist: true, // lista de propriedades aceitaveis dto
      forbidNonWhitelisted: true, // recusa dados que nao estao na whitelist
      transform: true, // transforma dados da requisiçao de acordo com dto
    }),
  );
  await app.listen(3000);
}
bootstrap();
