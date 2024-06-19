import { PointServicePort } from 'src/point/controller/port/Point.service.port';
import { UserPoint } from 'src/point/domain/Point.model';

export class FakePointServiceImpl implements PointServicePort {
  savePoint(userId: number, amount: number): Promise<UserPoint> {
    return Promise.resolve({
      id: userId,
      point: amount,
      updateMillis: Date.now(),
    });
  }
}
