import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { PostUpdateDto } from '../dto/PostDto';
import { Post } from '../models/Post';

@Service()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  public findOneByPostIdOrFail(postId: number) {
    return this.findOneOrFail({ where: { postId } });
  }

  public findOneByWriterDataOrFail(postId: number, userId: number) {
    return this.findOneOrFail({ where: { id: postId, userId } });
  }

  public findByGroupId(groupId: number) {
    return this.find({ where: { groupId } });
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
