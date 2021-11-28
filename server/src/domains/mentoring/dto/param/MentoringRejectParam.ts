import { IsNumber } from 'class-validator';

export class MentoringRejectParam {
  @IsNumber()
  id: number;
}
