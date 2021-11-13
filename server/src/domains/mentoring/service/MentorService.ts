import { Profile } from '@domains/user/models/Profile';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Mentor } from '../models/Mentor';
import { MentorRepository } from '../repository/MentorRepository';

@Service()
export class MentorService {
  constructor(
    @InjectRepository()
    private readonly mentorRepository: MentorRepository,
  ) {}

  public async createMentor(userId: number) {
    const mentor: Mentor = new Mentor();
    mentor.userId = userId;

    return await this.mentorRepository.save(mentor);
  }
}
