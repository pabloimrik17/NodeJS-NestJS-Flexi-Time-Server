import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

      funccionPrueba(): void {
        console.log("HOLA");
                      }
}
