import { Module } from '@nestjs/common';
import { PointController } from './controller/Point.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PointServicePort } from './controller/port/Point.service.port';
import { PointServiceImpl } from './service/Point.service.impl';
import { PointRepositoryPort } from './service/port/Point.repository.port';
import { PointRepositoryImpl } from './infrastructure/Point.repository.impl';

@Module({
  imports: [DatabaseModule],
  controllers: [PointController],
  providers: [
    { provide: PointServicePort, useClass: PointServiceImpl },
    { provide: PointRepositoryPort, useClass: PointRepositoryImpl },
  ],
})
export class PointModule {}
