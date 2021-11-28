import { IsEnum, IsOptional } from 'class-validator';
import { GroupState } from '../models/Group';
import { GroupEnrollmentAs } from '../models/GroupEnrollment';

export class EnrolledGroupQuery {
  @IsOptional()
  @IsEnum(GroupState)
  status: GroupState;

  @IsOptional()
  @IsEnum(GroupEnrollmentAs)
  type: GroupEnrollmentAs;
}
