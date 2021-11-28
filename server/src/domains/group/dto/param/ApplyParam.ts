import { IsNumber } from 'class-validator';

export class ApplyParam {
  @IsNumber()
  aid: number;
}
