import { IsNumber, IsOptional } from 'class-validator';

export class MentoringRequestParam {
  @IsOptional()
  @IsNumber()
  mid: number;
}
