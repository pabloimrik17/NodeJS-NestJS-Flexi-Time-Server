import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

// Use Nest ValidationPipe instead of this.
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private readonly types: Type<any>[] = [
    String,
    Boolean,
    Number,
    Array,
    Object,
  ];

  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  private toValidate(metatype: Type<any>) {
    return !this.types.includes(metatype);
  }
}
