import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CategoryRepository } from '@domains/category/repository/CategoryRepository';
import { UsingTechStackRepository } from '@domains/techstack/repository/UsingTechStackRepository';
import { ProfileRepository } from '@domains/user/repository/ProfileRepository';
import { GroupEnrollmentRepository } from '../repository/GroupEnrollmentRepository';
import { GroupEnrollment } from '../models/GroupEnrollment';

@Service()
export class GroupEnrollmentService {
  constructor(
    @InjectRepository()
    private readonly groupEnrollmentRepository: GroupEnrollmentRepository,
  ) {}

  public async addGroupEnrollment(groupId: number, userId: number) {
    const searchResult = await this.groupEnrollmentRepository.findOne({ where: { groupId, userId } });
    if(searchResult !== undefined){
      //throw Error('이미 추가된 생성자입니다.')
    }

    const groupEnrollment = new GroupEnrollment();
    groupEnrollment.groupId = groupId;
    groupEnrollment.userId = userId;
    groupEnrollment.type = 'OWNER';

    await this.groupEnrollmentRepository.save(groupEnrollment);
  }
}
