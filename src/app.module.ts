import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PruebaModule } from './modules/prueba/prueba.module';

@Module({
  imports: [AuthModule, UsersModule, PruebaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(): any {
    //consumer.apply(LoggerMiddleware)
    //.forRoutes(CatsController);
    //.forRoutes("cats")
    //.forRoutes({ path: "cats", method: RequestMethod.GET })
  }
}
