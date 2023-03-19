import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new DailyRotateFile({
          filename: `log/error_%DATE%.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD Thh',
        }),
        new DailyRotateFile({
          filename: `info/info_%DATE%.log`,
          level: 'info',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD Thh',
        }),
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
          ),
        }),
      ],
    }),
  });
  await app.listen(3000);
}
bootstrap();
