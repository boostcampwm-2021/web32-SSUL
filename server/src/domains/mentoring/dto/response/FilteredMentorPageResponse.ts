import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

class FilteredMentor {
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

export class FilteredMentorPageResponse {
  @IsArray()
  mentors: FilteredMentor[];
  @IsNumber()
  totalPages: number;
}
