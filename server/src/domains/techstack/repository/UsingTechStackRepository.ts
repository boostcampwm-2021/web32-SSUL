import { UsingTechStack } from '../models/UsingTechStack';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(UsingTechStack)
export class UsingTechStackRepository extends Repository<UsingTechStack> {
  public findAll() {
    return this.find();
  }
}
