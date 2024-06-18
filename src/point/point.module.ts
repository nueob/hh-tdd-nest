import { Module } from "@nestjs/common";

import { PointController } from "./controller/point.controller";
import { DatabaseModule } from "../database/database.module";
import { PointServicePort } from "./controller/port/point.servie.port";
import { PointServieImpl } from "./service/point.servie";
import { PointRepositoryPort } from "./service/port/point.repository.port";
import { PointRepositoryImpl } from "./infrastructor/point.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [PointController],
    providers: [
        {provide: PointServicePort, useClass: PointServieImpl},
        {provide: PointRepositoryPort, useClass: PointRepositoryImpl}
    ]
})
export class PointModule {}