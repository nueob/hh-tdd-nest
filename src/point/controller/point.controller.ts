import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { PointHistory, UserPoint } from '../domain/Point.model';
import { PointBody as PointDto } from './dto/req/Point.dto';
import { UserServicePort } from './port/User.service.port';
import { PointServicePort } from './port/Point.service.port';

@Controller('/point')
export class PointController {
  constructor(
    private readonly userServicePort: UserServicePort,
    private readonly pointServicePort: PointServicePort,
  ) {}

  /**
   * TODO - 특정 유저의 포인트를 조회하는 기능을 작성해주세요.
   * userId를 service로 넘겨 해당 user에 대한 포인트를 받습니다.
   */
  @Get(':id')
  async point(@Param('id') id): Promise<UserPoint> {
    const userId = Number.parseInt(id);

    return await this.userServicePort.findUser(userId);
  }

  /**
   * TODO - 특정 유저의 포인트 충전/이용 내역을 조회하는 기능을 작성해주세요.
   * - userId를 받아 service에 넘겨준 뒤 포인트 충전/이용내역을 받습니다.
   */
  @Get(':id/histories')
  async history(@Param('id') id): Promise<PointHistory[]> {
    const userId = Number.parseInt(id);

    return this.userServicePort.findPointHistories(userId);
  }

  /**
   * TODO - 특정 유저의 포인트를 충전하는 기능을 작성해주세요.
   */
  @Patch(':id/charge')
  async charge(
    @Param('id') id,
    @Body(ValidationPipe) pointDto: PointDto,
  ): Promise<UserPoint> {
    const userId = Number.parseInt(id);
    const amount = pointDto.amount;

    return this.pointServicePort.savePoint(userId, amount);
  }

  /**
   * TODO - 특정 유저의 포인트를 사용하는 기능을 작성해주세요.
   */
  @Patch(':id/use')
  async use(
    @Param('id') id,
    @Body(ValidationPipe) pointDto: PointDto,
  ): Promise<UserPoint> {
    const userId = Number.parseInt(id);
    const amount = pointDto.amount;
    return { id: userId, point: amount, updateMillis: Date.now() };
  }
}
