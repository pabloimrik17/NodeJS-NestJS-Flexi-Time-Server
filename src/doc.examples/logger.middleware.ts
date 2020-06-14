import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    console.log('Request...');
    next();
  }
}
