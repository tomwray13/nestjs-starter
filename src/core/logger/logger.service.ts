import { Injectable, LoggerService as NestLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLogger {
  private readonly logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    const { combine, timestamp, printf, colorize, json } = winston.format;

    // Determine if the application is running in development mode
    const isDevelopment =
      this.configService.get(`environment`) === 'development';

    // Choose a format based on the environment
    const logFormat = isDevelopment
      ? combine(
          colorize(),
          timestamp(),
          printf(({ level, message, timestamp, context, meta, trace }) => {
            return `${timestamp} ${level}: [${context}] ${message} ${
              meta ? JSON.stringify(meta) : ''
            } ${trace ? JSON.stringify(trace) : ''}`;
          }),
        )
      : combine(timestamp(), json());

    this.logger = winston.createLogger({
      level: 'info',
      format: logFormat,
      transports: [
        new winston.transports.Console(),
        // Add other transports like file or cloud-based logging solutions
      ],
    });
  }

  log(message: any, context?: string, meta?: any) {
    this.logger.info(message, {
      context,
      meta,
    });
  }

  error(message: any, trace?: string, context?: string, meta?: any) {
    this.logger.error(message, {
      context,
      trace,
      meta,
    });
  }

  warn(message: any, context?: string, meta?: any) {
    this.logger.warn(message, {
      context,
      meta,
    });
  }

  debug(message: any, context?: string, meta?: any) {
    this.logger.debug(message, {
      context,
      meta,
    });
  }

  verbose(message: any, context?: string, meta?: any) {
    this.logger.verbose(message, {
      context,
      meta,
    });
  }
}
