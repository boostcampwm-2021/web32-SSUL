import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { GroupEnrollment } from '../models/GroupEnrollment';

@Service()
@EntityRepository(GroupEnrollment)
export class GroupEnrollmentRepository extends Repository<GroupEnrollment> {
}
