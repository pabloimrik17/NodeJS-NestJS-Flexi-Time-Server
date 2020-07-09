import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
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
