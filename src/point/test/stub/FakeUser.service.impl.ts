import { UserServicePort } from 'src/point/controller/port/User.service.port';
import {
  PointHistory,
  TransactionType,
  UserPoint,
} from '../../domain/Point.model';

export class FakeUserServiceImpl implements UserServicePort {
  findUser(userId: number): Promise<UserPoint | undefined> {
    return Promise.resolve({
      id: userId,
      point: 0,
      updateMillis: Date.now(),
    });
  }
  findPointHistories(userId: number): Promise<PointHistory[] | undefined> {
    return Promise.resolve([
      {
        id: 1,
        userId,
        type: TransactionType.USE,
        amount: 100,
        timeMillis: Date.now(),
      },
    ]);
  }
}
