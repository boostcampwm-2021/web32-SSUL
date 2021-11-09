import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { destructObject } from '@utils/Object';
import { GroupTechStackListDto } from '../dto/groupTechStackListDto';
import { UsingTechStackRepository } from '../repository/UsingTechStackRepository';

@Service()
export class UsingTechStackService {
  constructor(
    @InjectRepository()
    private readonly usingTechStackRepository: UsingTechStackRepository,
  ) {}

  public async getGroupsTechStackList(groupId: number) {
    const techStackList = await this.usingTechStackRepository.findUsingTechStackListByGroupId(
      groupId,
    );
    return Promise.all(
      techStackList.map((techStack) => {
        const { name } = destructObject(techStack) as GroupTechStackListDto;
        return name;
      }),
    );
  }
}
