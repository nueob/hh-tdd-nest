import { UserPoint } from 'src/point/domain/Point.model';

export abstract class UserRepositoryPort {
  abstract findUser(userId: number): Promise<UserPoint | undefined>;
}
