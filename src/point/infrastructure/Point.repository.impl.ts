import { Injectable } from '@nestjs/common';
import { PointRepositoryPort } from '../service/port/Point.repository.port';
import { PointHistoryTable } from '../../database/pointhistory.table';
import { PointHistory, TransactionType } from '../domain/Point.model';

@Injectable()
export class PointRepositoryImpl implements PointRepositoryPort {
  constructor(private readonly historyDb: PointHistoryTable) {}

  findPointHistories(userId: number): Promise<PointHistory[]> {
    return this.historyDb.selectAllByUserId(userId);
  }

  async insertPointHistories(
    userId: number,
    amount: number,
    action: TransactionType,
  ): Promise<void> {
    await this.historyDb.insert(userId, amount, action, Date.now());
  }
}
