import { UserPoint } from 'src/point/domain/Point.model';

export abstract class UserServicePort {
  abstract findUser(userId: number): Promise<UserPoint | undefined>;
}
