import { FakeUserRepositoryImpl } from '../stub/FakeUser.repository.impl';
import { FakePointRepositoryImpl } from '../stub/FakePoint.repository.impl';
import { PointServiceImpl } from '../../../point/service/Point.service.impl';
import { PointErrorCode } from '../../../point/enum/PointErrorCode.enum';

describe('PointServiceImpl', () => {
  let pointServiceImpl: PointServiceImpl;
  let fakePointRepositoryImpl = new FakePointRepositoryImpl();
  let fakeUserRepositoryImpl = new FakeUserRepositoryImpl();

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setSystemTime();

    fakePointRepositoryImpl = new FakePointRepositoryImpl();
    fakeUserRepositoryImpl = new FakeUserRepositoryImpl();

    pointServiceImpl = new PointServiceImpl(
      fakePointRepositoryImpl,
      fakeUserRepositoryImpl,
    );
  });

  describe('savePoint: 특정 유저 포인트 충전', () => {
    test('정상 요청', async () => {
      //given
      const userId = 1;
      const amount = 10;
      const user = await fakeUserRepositoryImpl.findUser(userId);
      
      fakePointRepositoryImpl.insertPointHistories = jest.fn();
      //when
      const response = await pointServiceImpl.savePoint(userId, amount);
      //then
      expect(response).toStrictEqual({
        id: userId,
        point: user.point + amount,
        updateMillis: Date.now(),
      });
      expect(fakePointRepositoryImpl.insertPointHistories).toHaveBeenCalled();
    });
    /**
     * 실제 서비스일 경우 유저가 없는 경우 error를 던져야합니다.
     */
    test('유저가 없는 경우 error', async () => {
      //given
      const userId = 2;
      const amount = 10;
      //when
      //then
      expect(pointServiceImpl.savePoint(userId, amount)).rejects.toThrow(
        PointErrorCode.NO_EXISTS_USER.message,
      );
    });
  });
  describe('usePoint: 특정 유저 포인트 사용', () => {
    test('정상 요청', async () => {
      //given
      const userId = 1;
      const amount = 10;
      const user = await fakeUserRepositoryImpl.findUser(userId);

      fakePointRepositoryImpl.insertPointHistories = jest.fn();
      //when
      const response = await pointServiceImpl.usePoint(userId, amount);
      //then
      expect(response).toStrictEqual({
        id: userId,
        point: user.point - amount,
        updateMillis: Date.now(),
      });
      expect(fakePointRepositoryImpl.insertPointHistories).toHaveBeenCalled();
    });
    /**
     * 실제 서비스에서 유저가 없는 경우에 에러를 던져야합니다.
     */
    test('유저가 없는 경우 error', async () => {
      //given
      const userId = 2;
      const amount = 10;
      //when
      //then
      expect(pointServiceImpl.usePoint(userId, amount)).rejects.toThrow(
        PointErrorCode.NO_EXISTS_USER.message,
      );
    });
    /**
     * 기존 포인트보다 더 많은 포인트를 사용할 순 없습니다.
     */
    test('기존 포인트보다 더 많은 포인트를 사용하려고 하는 경우 error', async () => {
      //given
      const userId = 1;
      const amount = 1000;
      //when
      //then
      expect(pointServiceImpl.usePoint(userId, amount)).rejects.toThrow(
        PointErrorCode.NOT_ENOUGH_POINT.message,
      );
    });
  });
});
