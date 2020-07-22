import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigEnv } from '../config/ConfigEnv';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

describe('Auth Controller', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
          imports: [ConfigModule.forRoot()],
          useFactory: async (configService: ConfigService<ConfigEnv>) => ({
            secret: configService.get('JWT_SECRET_PASS'),
            signOptions: {
              expiresIn: configService.get('JWT_TOKEN_EXPIRATION'),
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Login', () => {
    it('should return a access token based on the request user', async () => {
      const mockedRequest = {
        user: {
          username: '1E3',
          userId: 280,
        },
      };
      const authServiceLoginReturn = { access_token: 'Lz1' };
      const authServiceLoginSpy = jest
        .spyOn(authService, 'login')
        .mockResolvedValue(authServiceLoginReturn);

      expect(await controller.login(mockedRequest)).toBe(
        authServiceLoginReturn,
      );

      expect(authServiceLoginSpy).toBeCalledTimes(1);
      expect(authServiceLoginSpy).toBeCalledWith(mockedRequest.user);
    });
  });
});
