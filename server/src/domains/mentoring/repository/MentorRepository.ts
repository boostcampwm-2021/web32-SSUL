import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { Mentor } from '../models/Mentor';

@Service()
@EntityRepository(Mentor)
export class MentorRepository extends Repository<Mentor> {}
