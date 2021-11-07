import { BadRequestError } from 'routing-controllers';
import { Service } from 'typedi';
import { EntityRepository, Not, QueryFailedError, Repository } from 'typeorm';
import { Group } from '../models/Group';

@Service()
@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  public createGroup(group: Group) {
    return this.insert(group);
  }
}
