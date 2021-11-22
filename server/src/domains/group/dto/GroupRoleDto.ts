export enum GroupEnrollmentAs {
  OWNER = 'OWNER',
  MENTOR = 'MENTOR',
  MENTEE = 'MENTEE',
}

export class GroupRoleDto {
  role: GroupEnrollmentAs;
}
