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
});
