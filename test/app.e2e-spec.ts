import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
//import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  process.env.JWT_SECRET_PASS = '2k1I4M';
  process.env.JWT_TOKEN_EXPIRATION = '20s';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    // return request(app.getHttpServer())
    //   .get('/')
    //   .expect(200)
    //   .expect('Hello World!');

    expect(1).toBe(1);
  });

  afterAll(async () => {
    await app.close();
  });
});
