import { IsNumber } from 'class-validator';

export class AlarmParams {
  @IsNumber()
  alarmId: number;
}
