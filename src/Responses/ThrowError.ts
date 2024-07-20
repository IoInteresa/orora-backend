import { HttpStatus } from '../Constants';

class ThrowError extends Error {
  public statusCode: number;
  public data: string;

  constructor(statusCode: HttpStatus, data: string) {
    super(data);

    this.statusCode = statusCode;
    this.data = data;
  }
}

export default ThrowError;
