import { IsDate, IsDateString, IsString } from 'class-validator';
import { GroupEnrollment } from '../models/GroupEnrollment';

export class GroupActivityDto {
  @IsString()
  name: string;
  @IsDateString()
  startAt: Date | null;
  @IsDateString()
  endAt: Date | null;

  static from({ group }: GroupEnrollment) {
    const dto = new GroupActivityDto();

    dto.name = group.name;
    dto.startAt = group.startAt;
    dto.endAt = group.endAt;
  }
}
