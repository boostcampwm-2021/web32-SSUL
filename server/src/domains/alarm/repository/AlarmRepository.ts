import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { Alarm } from '../models/Alarm';

@Service()
@EntityRepository(Alarm)
export class AlarmRepository extends Repository<Alarm> {
  public findAllByReceiverId(receiverId: number) {
    return this.find({ relations: ['sender', 'group'], where: { receiverId } });
  }

  public updateReadCheck(alarmId: number) {
    return this.update({ id: alarmId }, { readChk: true });
  }

  public checkReceiver(alarmId: number, receiverId: number) {
    return this.findOneOrFail({ where: { id: alarmId, receiverId } });
  }
}
