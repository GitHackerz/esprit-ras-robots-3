import { Injectable, NestMiddleware } from '@nestjs/common';
import * as chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const statusCode = res.statusCode;
      let statusColor = chalk.green;
      if (statusCode >= 400) statusColor = chalk.red;
      else if (statusCode >= 300) statusColor = chalk.yellow;
      console.info(
        `Request URL: ${req.url} - Method: ${req.method} - Status: ${statusColor(statusCode)}`,
      );
    });
    next();
  }
}
