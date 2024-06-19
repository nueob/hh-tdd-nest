import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { PointModule } from '../../src/point/point.module';

describe('PointController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PointModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET(/:id) 특정 유저의 포인트를 조회한다.', () => {
    test('특정 유저의 포인트를 조회한다.', async () => {
      //  when
      const userId = 1;
      // given
      const response = await request(app.getHttpServer()).get(
        `/point/${userId}`,
      );
      // then
      expect(response.status).toBe(200);
    });
  });
});
