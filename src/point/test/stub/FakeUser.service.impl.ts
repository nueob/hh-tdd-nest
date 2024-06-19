import { UserServicePort } from 'src/point/controller/port/User.service.port';
import { UserPoint } from 'src/point/domain/Point.model';

export class FakeUserServiceImpl implements UserServicePort {
  findUser(userId: number): Promise<UserPoint | undefined> {
    return Promise.resolve({
      id: userId,
      point: 0,
      updateMillis: Date.now(),
    });
  }
}
