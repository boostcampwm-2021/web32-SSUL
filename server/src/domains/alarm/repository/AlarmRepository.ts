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

  public async existByIdAndReceiverId(alarmId: number, receiverId: number): Promise<boolean> {
    return (await this.findOne({ where: { id: alarmId, receiverId } })) !== undefined;
  }
}
