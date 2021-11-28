import { GroupEnrollment } from '@domains/group/models/GroupEnrollment';
import { IsDateString, IsString } from 'class-validator';

export class GroupActivityResponse {
  @IsString()
  name: string;
  @IsDateString()
  startAt: Date | null;
  @IsDateString()
  endAt: Date | null;

  static from({ group }: GroupEnrollment) {
    const dto = new GroupActivityResponse();

    dto.name = group.name;
    dto.startAt = group.startAt;
    dto.endAt = group.endAt;
    return dto;
  }
}
