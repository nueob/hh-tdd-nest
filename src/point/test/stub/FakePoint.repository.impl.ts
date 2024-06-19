import {
  PointHistory,
  TransactionType,
} from '../../../point/domain/Point.model';
import { PointRepositoryPort } from '../../../point/service/port/Point.repository.port';

export class FakePointRepositoryImpl implements PointRepositoryPort {
  findPointHistories(userId: number): Promise<PointHistory[]> {
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
