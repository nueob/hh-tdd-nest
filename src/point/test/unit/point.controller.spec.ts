import { PointController } from '../../controller/Point.controller';
import { FakeUserServiceImpl } from '../stub/FakeUser.service.impl';

/**
 * 컨트롤러 단위 테스트로는 해당 API response가 잘 넘어오는 지를 중점으로 작성하였습니다.
 * 에러를 예상하여 던지는 곳은 service라고 판단하여 해당 테스트들은 service 단위테스트에서 진행하겠습니다!
 */
describe('PointController', () => {
  let pointController: PointController;

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setSystemTime();

    pointController = new PointController(new FakeUserServiceImpl());
  });

  describe('/point GET API', () => {
    test('특정 유저의 포인트를 조회한다.', async () => {
      //  when
      const userId = 1;
      // given
      const response = await pointController.point(userId);
      // then
      expect(response).toStrictEqual({
        id: userId,
        point: 0,
        updateMillis: Date.now(),
      });
    });
  });
});
