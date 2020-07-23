import { ExecutionContext, INestApplication } from '@nestjs/common';
import { AuthService } from '../src/auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { LocalAuthGuard } from '../src/auth/local-auth.guard';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  process.env.JWT_SECRET_PASS = '2k1I4M';
  process.env.JWT_TOKEN_EXPIRATION = '20s';

  const access_token = 'lxHJ0k';

  const authService = {
    login: () => ({ access_token }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideGuard(LocalAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = {
            username: '5lcHcV',
            userId: 532,
          };

          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/auth/login (POST)', () => {
    it('should return a valid access_token when valid user is supplied', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: '9To07J',
          password: '9e5n',
        })
        .expect(201)
        .expect({ access_token });
    });

    it('should return a 401 response code when invalid user is supplied', async () => {
      const authService = {
        validateUser: jest.fn().mockResolvedValue(undefined),
      };
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AuthModule],
      })
        .overrideProvider(AuthService)
        .useValue(authService)
        .compile();

      const app = moduleFixture.createNestApplication();
      await app.init();

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'john',
          password: 'changeme',
        })
        .expect({
          statusCode: 401,
          message: 'Unauthorized',
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
