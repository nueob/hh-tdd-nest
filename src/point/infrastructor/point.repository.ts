import { Injectable } from '@nestjs/common';

import { PointRepositoryPort } from "../service/port/point.repository.port";
import { UserPointTable } from 'src/database/userpoint.table';
import { PointHistoryTable } from 'src/database/pointhistory.table';

@Injectable()
export class PointRepositoryImpl implements PointRepositoryPort {
    constructor(
        private readonly userDb: UserPointTable,
        private readonly historyDb: PointHistoryTable,
    ) {}
}