import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { Post } from '../models/Post';

@Service()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  // public async findAllByGroupId(groupId: number) {
  //     return await this.fnid
  // }
}
