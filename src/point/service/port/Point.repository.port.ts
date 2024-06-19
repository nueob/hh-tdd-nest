import { PointHistory } from 'src/point/domain/Point.model';

export abstract class PointRepositoryPort {
  abstract findPointHistories(
    userId: number,
  ): Promise<PointHistory[] | undefined>;
}
