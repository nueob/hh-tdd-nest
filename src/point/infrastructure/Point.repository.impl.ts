import { Injectable } from '@nestjs/common';
import { UserPointTable } from '../../database/userpoint.table';
import { PointRepositoryPort } from '../service/port/Point.repository.port';
import { PointHistoryTable } from '../../database/pointhistory.table';

@Injectable()
export class PointRepositoryImpl implements PointRepositoryPort {
  constructor(
    private readonly userDb: UserPointTable,
    private readonly historyDb: PointHistoryTable,
  ) {}
}
