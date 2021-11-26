import { IsEnum } from 'class-validator';
import { ApplyGroupState } from '../models/ApplyGroup';

export class ApplyedGroupQuery {
  @IsEnum(ApplyGroupState)
  state: ApplyGroupState;
}
