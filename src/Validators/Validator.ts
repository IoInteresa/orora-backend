import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export default class Validator {
  async validate<T, V extends object>(
    data: T,
    dtoClass: new () => V
  ): Promise<boolean> {
    const dto = plainToClass(dtoClass, data);
    const errors = await validate(dto);

    return !!errors.length;
  }
}
