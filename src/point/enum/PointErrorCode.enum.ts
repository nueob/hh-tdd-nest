export class PointErrorCode {
  static readonly NO_EXISTS_USER = new PointErrorCode(
    '존재하지 않는 유저 입니다.',
  );

  private _message: string;

  constructor(message: string) {
    this._message = message;
  }

  get message(): string {
    return this._message;
  }
}
