import { Injectable } from '@nestjs/common';
import { UserPoint } from '../domain/Point.model';
import { UserRepositoryPort } from '../service/port/User.repository.port';
import { UserPointTable } from '../../database/userpoint.table';

@Injectable()
export class UserRepositoryImpl implements UserRepositoryPort {
  constructor(private readonly userDb: UserPointTable) {}

  findUser(userId: number): Promise<UserPoint> {
    return this.userDb.selectById(userId);
  }

  updateUserPoint(userId: number, point: number): Promise<UserPoint> {
    return this.userDb.insertOrUpdate(userId, point);
  }
}
