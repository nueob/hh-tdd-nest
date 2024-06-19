import { UserServiceImpl } from '../../../point/service/User.service.impl';
import { FakeUserRepositoryImpl } from '../stub/FakeUser.repository.impl';
import { PointErrorCode } from '../../../point/enum/PointErrorCode.enum';

describe('UserServiceImpl', () => {
  let userServiceImpl: UserServiceImpl;
  let fakeUserRepositoryImpl: FakeUserRepositoryImpl;

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setSystemTime();

    fakeUserRepositoryImpl = new FakeUserRepositoryImpl();
    userServiceImpl = new UserServiceImpl(fakeUserRepositoryImpl);
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
});
