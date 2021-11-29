import { GroupEnrollment } from '@domains/group/models/GroupEnrollment';
import { IsNumber, IsString } from 'class-validator';

export class GroupUserDto {
  @IsNumber()
  userId: number;
  @IsString()
  githubId: string;
  @IsString()
  name: string;
  @IsString()
  avatarUrl: string;
  @IsString()
  type: string;

  static from(groupEnrollment: GroupEnrollment) {
    const dto = new GroupUserDto();
    dto.userId = groupEnrollment.userId;
    dto.githubId = groupEnrollment.user.githubId;
    dto.name = groupEnrollment.user.name;
    dto.avatarUrl = groupEnrollment.user.avatarUrl;
    dto.type = groupEnrollment.type;
    return dto;
  }
}
