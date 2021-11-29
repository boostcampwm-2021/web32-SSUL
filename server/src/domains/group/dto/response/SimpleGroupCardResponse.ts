import { User } from '@domains/user/models/User';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Group } from '../../models/Group';

class SimpleUserInfo {
  @IsString()
  avatarUrl: string;

  static from(user: User) {
    const dto = new SimpleUserInfo();
    dto.avatarUrl = user.avatarUrl;
    return dto;
  }
}

export class SimpleGroupCardResponse {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  maxUserCnt: number;

  @IsNumber()
  curUserCnt: number;

  @IsString()
  status: string;

  @ValidateNested()
  @Type(() => SimpleUserInfo)
  ownerInfo: SimpleUserInfo;

  static from(group: Group) {
    const dto = new SimpleGroupCardResponse();
    dto.id = group.id;
    dto.name = group.name;
    dto.maxUserCnt = group.maxUserCnt;
    dto.curUserCnt = group.curUserCnt;
    dto.status = group.status;
    dto.ownerInfo = SimpleUserInfo.from(group.ownerInfo);
    return dto;
  }
}
