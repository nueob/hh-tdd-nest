import { Injectable } from '@nestjs/common';
import { PointServicePort } from '../controller/port/Point.service.port';
import { PointRepositoryPort } from './port/Point.repository.port';
import { TransactionType, UserPoint } from '../domain/Point.model';
import { UserRepositoryPort } from './port/User.repository.port';
import { PointErrorCode } from '../enum/PointErrorCode.enum';

@Injectable()
export class PointServiceImpl implements PointServicePort {
  constructor(
    private readonly pointRepositoryPort: PointRepositoryPort,
    private readonly userRepositoryPort: UserRepositoryPort,
  ) {}
  /**
   * 1. 유저가 존재하는 지 체크
   *  - 존재하지 않다면 error
   * 2. 1번에서 조회한 유저 정보로 이전 포인트를 보내 주며 포인트를 충전합니다.
   * 3. 포인트를 충전한 내역을 history에 저장합니다.
   * 4. 해당 유저의 충전된 정보를 반환합니다.
   */
  async savePoint(userId: number, amount: number): Promise<UserPoint> {
    const user = await this.userRepositoryPort.findUser(userId);
    if (!user) throw new Error(PointErrorCode.NO_EXISTS_USER.message);

    const point = user.point + amount;

    const [updatedUser] = await Promise.all([
      this.userRepositoryPort.updateUserPoint(userId, point),
      this.pointRepositoryPort.insertPointHistories(
        userId,
        amount,
        TransactionType.CHARGE,
      ),
    ]);

    return updatedUser;
  }
  usePoint(userId: number, amount: number): Promise<UserPoint | undefined> {
    return Promise.resolve(undefined);
  }
}
