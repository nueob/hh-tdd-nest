import { UserPoint } from 'src/point/domain/Point.model';

export abstract class PointServicePort {
  abstract savePoint(
    userId: number,
    amount: number,
  ): Promise<UserPoint | undefined>;
  abstract usePoint(
    userId: number,
    amount: number,
  ): Promise<UserPoint | undefined>;
}
