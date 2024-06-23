import { PointHistory, TransactionType } from 'src/point/domain/Point.model';

export abstract class PointRepositoryPort {
  abstract findPointHistories(
    userId: number,
  ): Promise<PointHistory[] | undefined>;
  abstract insertPointHistories(
    userId: number,
    amount: number,
    action: TransactionType,
  ): Promise<void>;
}
