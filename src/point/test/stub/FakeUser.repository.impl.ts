import { UserPoint } from 'src/point/domain/Point.model';
import { UserRepositoryPort } from 'src/point/service/port/User.repository.port';

export class FakeUserRepositoryImpl implements UserRepositoryPort {
  findUser(userId: number): Promise<UserPoint> {
    if (userId === 2) return null;

    return Promise.resolve({
      id: userId,
      point: 100,
      updateMillis: Date.now(),
    });
  }
  updateUserPoint(userId: number, point: number): Promise<UserPoint> {
    return Promise.resolve({ id: userId, point, updateMillis: Date.now() });
  }
}
