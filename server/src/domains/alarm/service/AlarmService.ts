import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AlarmRepository } from '@domains/alarm/repository/AlarmRepository';
import { AlarmListResponse } from '../dto/AlarmResponse';
import { Alarm } from '../models/Alarm';
import { AlarmDto } from '../dto/AlarmDto';

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

  public async readAlarm(alarmId: number, userId: number): Promise<void> {
    await this.alarmRepository.checkReceiver(alarmId, userId);
    await this.alarmRepository.updateReadCheck(alarmId);
  }

  public async postAlarm(content: AlarmDto): Promise<number> {
    const alarm = await this.alarmRepository.save(content.toEntity());
    return alarm.id;
  }

  public async deleteAlarm(alarmId: number, userId: number): Promise<void> {
    await this.alarmRepository.checkReceiver(alarmId, userId);
    await this.alarmRepository.delete({ id: alarmId });
  }
}
