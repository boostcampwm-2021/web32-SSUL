import { ApplyGroupState } from '@domains/group/models/ApplyGroup';
import { IsEnum } from 'class-validator';

export class ApplyedGroupQuery {
  @IsEnum(ApplyGroupState)
  state: ApplyGroupState;
}
