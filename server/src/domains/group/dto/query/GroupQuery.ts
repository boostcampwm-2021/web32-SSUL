import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GroupQuery {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  category: number;

  @IsOptional()
  @IsString()
  techstack: string;
}
