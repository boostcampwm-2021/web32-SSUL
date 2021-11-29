import { IsNumber } from 'class-validator';

export class GroupParam {
  @IsNumber()
  gid: number;
}
