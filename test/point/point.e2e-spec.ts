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

  describe('GET(/:id/histories) 특정 유저의 포인트 충전/이용 내역을 조회한다.', () => {
    test('특정 유저의 포인트 충전/이용 내역이 있을 경우, 해당 내역을 배열로 반환한다.', async () => {
      //  when
      const userId = 1;
      // given
      const response = await request(app.getHttpServer()).get(
        `/point/${userId}/histories`,
      );
      // then
      expect(response.status).toBe(200);
    });
  });
});
