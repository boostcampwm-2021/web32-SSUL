import { Service } from 'typedi';
import { TechStackRepository } from '../repository/TechStackRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { destructObject } from '@utils/Object';
import { GroupTechStackListDto } from '../dto/groupTechStackListDto';

@Service()
export class TechStackService {
  constructor(
    @InjectRepository()
    private readonly techStackRepository: TechStackRepository,
  ) {}

  public async getTechStackList() {
    const techStackList = await this.techStackRepository.findAll();
    return techStackList;
  }

  public async getGroupsTechStackList(groupId: number) {
    const techStackList = await this.techStackRepository.findTechStackListByGroupId(groupId);
    return Promise.all(
      techStackList.map((techStack) => {
        const { name } = destructObject(techStack) as GroupTechStackListDto;
        return name;
      }),
    );
  }
}
