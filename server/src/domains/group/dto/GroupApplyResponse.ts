import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApplyGroup } from '../models/ApplyGroup';

export class GroupApplyResponse {
  @IsNumber()
  id: number | null;
  @IsString()
  name: string | null;
  @IsString()
  githubId: string;
  @IsString()
  avatarUrl: string | null;
  @IsNumber()
  feverStack: number | null;
  @IsDate()
  createdAt: Date | null;

  static from(applyGroup: ApplyGroup) {
    const dto = new GroupApplyResponse();

    dto.id = applyGroup.id;
    dto.createdAt = applyGroup.createdAt;
    dto.name = applyGroup.user.name;
    dto.githubId = applyGroup.user.githubId;
    dto.avatarUrl = applyGroup.user.avatarUrl;
    dto.feverStack = applyGroup.user.feverStack;
    return dto;
  }
}
