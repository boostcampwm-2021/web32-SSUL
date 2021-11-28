import { GroupState } from '@domains/group/models/Group';
import { GroupEnrollmentAs } from '@domains/group/models/GroupEnrollment';
import { IsEnum, IsOptional } from 'class-validator';

export class EnrolledGroupQuery {
  @IsOptional()
  @IsEnum(GroupState)
  status: GroupState;

  @IsOptional()
  @IsEnum(GroupEnrollmentAs)
  type: GroupEnrollmentAs;
}
