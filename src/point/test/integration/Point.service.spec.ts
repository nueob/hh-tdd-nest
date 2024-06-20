import { Test, TestingModule } from '@nestjs/testing';
import { PointController } from '../../controller/Point.controller';
import { UserServicePort } from '../../controller/port/User.service.port';
import { PointServicePort } from '../../controller/port/Point.service.port';
import { UserRepositoryPort } from '../../service/port/User.repository.port';
import { PointRepositoryPort } from '../../service/port/Point.repository.port';
import { PointServiceImpl } from '../../service/Point.service.impl';
import { UserServiceImpl } from '../../service/User.service.impl';
import { PointRepositoryImpl } from '../../infrastructure/Point.repository.impl';
import { UserRepositoryImpl } from '../../infrastructure/User.repository.impl';
import { DatabaseModule } from '../../../database/database.module';

describe('PointServiceImpl', () => {
  let pointServicePort: PointServicePort;
  let userServicePort: UserServicePort;

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setSystemTime();

    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [PointController],
      providers: [
        { provide: PointServicePort, useClass: PointServiceImpl },
        { provide: PointRepositoryPort, useClass: PointRepositoryImpl },
        { provide: UserServicePort, useClass: UserServiceImpl },
        { provide: UserRepositoryPort, useClass: UserRepositoryImpl },
      ],
    }).compile();

    pointServicePort = module.get<PointServicePort>(PointServicePort);
    userServicePort = module.get<UserServicePort>(UserServicePort);
  });

  describe('통합 테스트', () => {
    describe('savePoint: 포인트를 충전한다.', () => {
      test('포인트 충전 시 기존 포인트 + 충전하고자 한 포인트 값이 반환 된다.', async () => {
        //given
        const userId = 1;
        const user = await userServicePort.findUser(userId);
        const amount = 100;
        //when
        const response = await pointServicePort.savePoint(userId, amount);
        //then
        expect(response.point).toEqual(amount + user.point);
      });
    });
    describe('usePoint: 포인트를 사용한다.', () => {
      test('포인트 사용 시 기존 포인트 - 사용하고자 한 포인트 값이 반환 된다.', async () => {
        //given
        const userId = 1;
        const amount = 100;
        // 포인트 충전
        await pointServicePort.savePoint(userId, 300);
        const user = await userServicePort.findUser(userId);
        //when
        const response = await pointServicePort.usePoint(userId, amount);
        //then
        expect(response.point).toEqual(user.point - amount);
      });
    });
  });
  describe('동시성 테스트', () => {
    test('같은 유저가 동시에 포인트 충전을 3번 요청 했을 때, 모두 적용된다.', async () => {
      //given
      const userId = 1;
      const amount1 = 10;
      const amount2 = 20;
      const amount3 = 30;
      //when
      await Promise.all([
        pointServicePort.savePoint(userId, amount1),
        pointServicePort.savePoint(userId, amount2),
      ]);
      //then
      const userPoint = await userServicePort.findUser(userId);
      expect(userPoint.point).toEqual(amount1 + amount2 + amount3);
    });
    test('같은 유저가 동시에 포인트 충전/사용 요청 했을 때, 모두 적용된다.', async () => {
      //given
      const userId = 1;
      const amount1 = 10;
      const amount2 = 20;
      const amount3 = 30;
      await pointServicePort.savePoint(userId, 300);
      const user = await userServicePort.findUser(userId);
      //when
      await Promise.all([
        pointServicePort.savePoint(userId, amount1),
        pointServicePort.savePoint(userId, amount2),
        pointServicePort.usePoint(userId, amount3),
      ]);
      //then
      const userPoint = await userServicePort.findUser(userId);
      expect(userPoint.point).toEqual(user.point + amount1 + amount2 - amount3);
    });
  });
});
