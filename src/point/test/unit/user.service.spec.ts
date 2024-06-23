import { UserServiceImpl } from '../../../point/service/User.service.impl';
import { FakeUserRepositoryImpl } from '../stub/FakeUser.repository.impl';
import { FakePointRepositoryImpl } from '../stub/FakePoint.repository.impl';
import { PointErrorCode } from '../../../point/enum/PointErrorCode.enum';
import { TransactionType } from '../../../point/domain/Point.model';

describe('UserServiceImpl', () => {
  let userServiceImpl: UserServiceImpl;
  let fakeUserRepositoryImpl: FakeUserRepositoryImpl;
  let fakePointRepositoryImpl: FakePointRepositoryImpl;

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setSystemTime();

    fakeUserRepositoryImpl = new FakeUserRepositoryImpl();
    fakePointRepositoryImpl = new FakePointRepositoryImpl();

    userServiceImpl = new UserServiceImpl(
      fakeUserRepositoryImpl,
      fakePointRepositoryImpl,
    );
  });

  describe('findUser: 유저 조회', () => {
    test('서비스에 있는 유저일 경우, 해당 유저 정보를 반환한다.', async () => {
      //given
      const userId = 1;
      //when
      const response = await userServiceImpl.findUser(userId);
      //then
      expect(response).toStrictEqual({ id: 1, point: 100, updateMillis: 0 });
    });
    /**
     * 실제 서비스일 경우, 존재하지 않은 회원에 대해 에러를 던져줘야 됩니다!
     */
    test('서비스에 없는 유저일 경우, Error를 반환한다.', async () => {
      //given
      const userId = 2;
      //when
      //then
      expect(userServiceImpl.findUser(userId)).rejects.toThrow(
        PointErrorCode.NO_EXISTS_USER.message,
      );
    });
  });

  describe('findPointHistories: 유저 포인트 내역 조회', () => {
    test('서비스에 있는 유저일 경우, 해당 유저 포인트 내역을 반환한다.', async () => {
      //given
      const userId = 1;
      //when
      const response = await userServiceImpl.findPointHistories(userId);
      //then
      expect(response).toStrictEqual([
        {
          id: 1,
          userId,
          type: TransactionType.USE,
          amount: 100,
          timeMillis: Date.now(),
        },
      ]);
    });
    /**
     * 실제 서비스일 경우, 존재하지 않은 회원에 대해 에러를 던져줘야 됩니다!
     */
    test('서비스에 없는 유저일 경우, Error를 반환한다.', async () => {
      //given
      const userId = 2;
      //when
      //then
      expect(userServiceImpl.findPointHistories(userId)).rejects.toThrow(
        PointErrorCode.NO_EXISTS_USER.message,
      );
    });
  });
});
