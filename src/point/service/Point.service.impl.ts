import { Injectable } from '@nestjs/common';
import { PointServicePort } from '../controller/port/Point.service.port';
import { PointRepositoryPort } from './port/Point.repository.port';

@Injectable()
export class PointServiceImpl implements PointServicePort {
  constructor(private readonly pointRepositoryPort: PointRepositoryPort) {}
}
