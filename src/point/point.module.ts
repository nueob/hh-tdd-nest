import { Module } from '@nestjs/common';
import { PointController } from './controller/Point.controller';
import { DatabaseModule } from '../database/database.module';
import { PointServicePort } from './controller/port/Point.service.port';
import { PointServiceImpl } from './service/Point.service.impl';
import { PointRepositoryPort } from './service/port/Point.repository.port';
import { PointRepositoryImpl } from './infrastructure/Point.repository.impl';
import { UserServicePort } from './controller/port/User.service.port';
import { UserServiceImpl } from './service/User.service.impl';
import { UserRepositoryPort } from './service/port/User.repository.port';
import { UserRepositoryImpl } from './infrastructure/User.repository.impl';

@Module({
  imports: [DatabaseModule],
  controllers: [PointController],
  providers: [
    { provide: PointServicePort, useClass: PointServiceImpl },
    { provide: PointRepositoryPort, useClass: PointRepositoryImpl },
    { provide: UserServicePort, useClass: UserServiceImpl },
    { provide: UserRepositoryPort, useClass: UserRepositoryImpl },
  ],
})
export class PointModule {}
