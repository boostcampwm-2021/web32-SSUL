import { TechStack } from '../models/TechStack';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(TechStack)
export class TechStackRepository extends Repository<TechStack> {
  public findAll() {
    return this.find();
  }
}
