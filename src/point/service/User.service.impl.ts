import { Injectable } from '@nestjs/common';
import { UserServicePort } from '../controller/port/User.service.port';
import { UserRepositoryPort } from './port/User.repository.port';
import { PointHistory, UserPoint } from '../domain/Point.model';
import { PointRepositoryPort } from './port/Point.repository.port';
import { PointErrorCode } from '../enum/PointErrorCode.enum';

@Injectable()
export class UserServiceImpl implements UserServicePort {
  constructor(
    private readonly userRepositoryPort: UserRepositoryPort,
    private readonly pointRepositoryPort: PointRepositoryPort,
  ) {}

  /**
   * 1.userId를 통해 user를 찾습니다.
   *  - user가 없는 경우 error
   */
  async findUser(userId: number): Promise<UserPoint | undefined> {
    const user = await this.userRepositoryPort.findUser(userId);
    if (!user) throw new Error(PointErrorCode.NO_EXISTS_USER.message);

    return user;
  }
  /**
   * 1. userId를 통해 user를 찾습니다.
   *  - user가 없는 경우 error
   * 2. userId를 통해 point histories를 찾은 후 반환합니다.
   */
  async findPointHistories(
    userId: number,
  ): Promise<PointHistory[] | undefined> {
    const user = await this.userRepositoryPort.findUser(userId);
    if (!user) throw new Error(PointErrorCode.NO_EXISTS_USER.message);

    return this.pointRepositoryPort.findPointHistories(userId);
  }
}
