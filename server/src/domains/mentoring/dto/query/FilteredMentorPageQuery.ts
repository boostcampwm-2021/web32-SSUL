import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilteredMentorPageQuery {
  @IsOptional()
  @IsNumber()
  page: number;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  techstack: string;
}
