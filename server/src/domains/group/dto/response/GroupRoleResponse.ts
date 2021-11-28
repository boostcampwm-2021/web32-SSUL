import { IsEnum } from 'class-validator';
import { GroupEnrollmentAs } from '../../models/GroupEnrollment';

export class GroupRoleResponse {
  @IsEnum(GroupEnrollmentAs)
  role: string;
}
