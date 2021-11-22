import { TechStack } from '../models/TechStack';
import { MentorTechStack } from '../models/MentorTechStack';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(MentorTechStack)
export class MentorTechStackRepository extends Repository<MentorTechStack> {
  public findAll() {
    return this.find();
  }
}
