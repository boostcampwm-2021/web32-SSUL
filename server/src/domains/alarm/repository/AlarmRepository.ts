import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { Alarm } from '../models/Alarm';

@Service()
@EntityRepository(Alarm)
export class AlarmRepository extends Repository<Alarm> {
  public findAllByRecieverId(recieverId: number) {
    return this.find({ relations: ['sender', 'group'], where: { recieverId } });
  }
}
