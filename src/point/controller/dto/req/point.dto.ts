import { IsInt, Min } from 'class-validator';

export class PointBody {
  /**
   * 충전할 포인트, 사용할 포인트 둘 다 0보다 커야 합니다.
   */
  @IsInt()
  @Min(1)
  amount: number;
}
