import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class GroupService {
  constructor(
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
  ) {}

  public async getGroups() {
    const groups = await this.groupRepository.findAll();
    return groups;
  }
}
