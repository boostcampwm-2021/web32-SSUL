import { IsDate, IsString } from 'class-validator';
import { Group } from '../../models/Group';

export class SimpleGroupInfoResponse {
  @IsString()
  name: string | null;
  @IsString()
  intro: string | null;
  @IsDate()
  startAt: Date | null;
  @IsDate()
  endAt: Date | null;

  static from(group: Group) {
    const dto = new SimpleGroupInfoResponse();

    dto.name = group.name;
    dto.intro = group.intro;
    dto.startAt = group.startAt;
    dto.endAt = group.endAt;
    return dto;
  }
}
