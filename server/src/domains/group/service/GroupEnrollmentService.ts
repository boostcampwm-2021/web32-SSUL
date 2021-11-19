import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { GroupEnrollmentRepository } from '../repository/GroupEnrollmentRepository';
import { GroupEnrollmentAs } from '../models/GroupEnrollment';
import { DuplicateEnrollmentError } from '../error/DuplicateEnrollmentError';

@Service()
export class GroupEnrollmentService {
  constructor(
    @InjectRepository()
    private readonly groupEnrollmentRepository: GroupEnrollmentRepository,
  ) {}

  public async addGroupEnrollment(groupId: number, userId: number, type: GroupEnrollmentAs) {
    const searchResult = await this.groupEnrollmentRepository.findOne({ where: { groupId, userId } });
    if(searchResult !== undefined){
      throw new DuplicateEnrollmentError();
    }
    await this.groupEnrollmentRepository.insert({groupId, userId, type});
  }
}
