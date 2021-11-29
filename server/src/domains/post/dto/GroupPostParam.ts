import { IsNumber } from 'class-validator';

export class GroupPostParam {
  @IsNumber()
  gid: number;
  @IsNumber()
  pid: number;
}
