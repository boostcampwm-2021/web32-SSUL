import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterdMentor {
  @IsNumber()
  id: number;
  @IsNumber()
  mentorId: number | null;
  @IsString()
  name: string | null;
  @IsString()
  intro: string | null;
  @IsDate()
  createAt: Date;
  @IsArray()
  techStacks: string[];
}

export class FilterdPageMentorListResponse {
  @IsArray()
  mentors: FilterdMentor[];
  @IsNumber()
  totalPages: number;
}

export class FilterdPageMentorListParams {
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
