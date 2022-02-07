import { Injectable } from '@nestjs/common';
import { v4, V4Options } from 'uuid';

@Injectable()
export class UuidService {
  generateV4(options?: V4Options): string {
    return v4(options);
  }
}
