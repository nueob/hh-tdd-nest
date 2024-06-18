import { Injectable } from '@nestjs/common';

import { PointServicePort } from "../controller/port/point.servie.port";
import { PointRepositoryPort } from "./port/point.repository.port";

@Injectable()
export class PointServieImpl implements PointServicePort {
    constructor(
        private readonly pointRepositoryPort: PointRepositoryPort
    ) {}
}