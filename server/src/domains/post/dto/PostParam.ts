import { IsNumber } from 'class-validator';

export class PostParam {
  @IsNumber()
  pid: number;
}
