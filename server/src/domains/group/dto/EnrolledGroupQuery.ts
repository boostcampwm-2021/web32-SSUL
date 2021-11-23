import { IsString } from 'class-validator';
import { GroupState } from '../models/Group';

export class EnrolledGroupQuery {
  @IsString()
  status: GroupState;
}
