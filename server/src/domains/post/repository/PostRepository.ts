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

  public findByGroupId(groupId: number) {
    return this.createQueryBuilder('post')
      .innerJoin(User, 'u', 'u.id = post.user_id')
      .select('post.id', 'id')
      .addSelect('post.group_id', 'groupId')
      .addSelect('post.user_id', 'userId')
      .addSelect('post.title', 'title')
      .addSelect('post.content', 'content')
      .addSelect('post.createdAt', 'createdAt')
      .addSelect('post.type', 'type')
      .addSelect('post.hit', 'hit')
      .addSelect('u.name', 'writer')
      .where('post.groupId = :groupId', { groupId: groupId })
      .orderBy('type', 'DESC')
      .addOrderBy('post.createdAt', 'DESC')
      .getRawMany();
  }

  public updateContentByPostId(post: PostUpdateDto) {
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
