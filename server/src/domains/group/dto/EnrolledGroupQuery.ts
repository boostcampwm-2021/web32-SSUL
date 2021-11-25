import { IsEnum, IsString } from 'class-validator';
import { GroupState } from '../models/Group';
import { GroupEnrollmentAs } from '../models/GroupEnrollment';

export class EnrolledGroupQuery {
  @IsString()
  status: GroupState;

  @IsEnum(GroupEnrollmentAs)
  type: GroupEnrollmentAs;
}
