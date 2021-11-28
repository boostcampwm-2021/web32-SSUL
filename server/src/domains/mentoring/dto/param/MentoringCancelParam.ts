import { IsNumber } from 'class-validator';

export class MentoringCancelParam {
  @IsNumber()
  mentor: number;
  @IsNumber()
  group: number;
}
