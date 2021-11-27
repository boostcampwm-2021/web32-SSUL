import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AlarmRepository } from '@domains/alarm/repository/AlarmRepository';
import { AlarmListResponse } from '../dto/AlarmResponse';
import { Alarm } from '../models/Alarm';

@Service()
export class AlarmService {
  constructor(
    @InjectRepository()
    private readonly alarmRepository: AlarmRepository,
  ) {}

  public async getAlarms(userId: number): Promise<AlarmListResponse[]> {
    const alarms = await this.alarmRepository.findAllByReceiverId(userId);
    return alarms.map((alarm: Alarm) => AlarmListResponse.from(alarm));
  }

  //   public async checkReceiver
}
