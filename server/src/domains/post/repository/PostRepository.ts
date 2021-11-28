import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { PostUpdateDto } from '../dto/PostUpdateDto';
import { Post } from '../models/Post';
import { User } from '@domains/user/models/User';

@Service()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  public findOneByPostIdOrFail(postId: number) {
    return this.findOneOrFail({ where: { id: postId } });
  }

  public findOneByWriterDataOrFail(postId: number, userId: number) {
    return this.findOneOrFail({ where: { id: postId, userId } });
  }

  public findAllByGroupId(groupId: number) {
    const test = this.find({
      relations: ['user'],
      order: { type: 'DESC', createdAt: 'DESC' },
      where: { groupId },
    });
    test.then((data) => console.log(data));
    return test;
  }

  public updateByPostId(post: PostUpdateDto) {
    const { id, title, content, type } = post;
    this.update({ id }, { title, content, type });
  }

  public increaseHit(post: Post) {
    const { id, hit } = post;
    this.update({ id }, { hit: hit + 1 });
  }

  public deleteByPostId(postId: number) {
    this.delete({ id: postId });
  }
}
