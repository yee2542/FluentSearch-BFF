import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

const EXCEPT_FIELD = ['password'];

@Injectable()
export class UserTrimPipe implements PipeTransform {
  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  private trim(values: any) {
    Object.keys(values).forEach(key => {
      if (!EXCEPT_FIELD.includes(key)) {
        if (this.isObj(values[key])) {
          values[key] = this.trim(values[key]);
        } else {
          if (typeof values[key] === 'string') {
            values[key] = values[key].trim();
          }
        }
      }
    });
    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (this.isObj(values) && type === 'body') {
      return this.trim(values);
    }
    throw new BadRequestException('Validation failed');
  }
}
