import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

class SimpleUserInfo {
  @IsString()
  avartalUrl: string;
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
  userInfo: SimpleUserInfo;
}
