import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { PostUpdateDto } from '../dto/PostUpdateDto';
import { Post } from '../models/Post';

@Service()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  public findOneByIdOrFail(postId: number) {
    return this.findOneOrFail({ where: { id: postId } });
  }

  public findOneByIdAndUserIdOrFail(postId: number, userId: number) {
    return this.findOneOrFail({ where: { id: postId, userId } });
  }

  public findAllByGroupId(groupId: number) {
    const test = this.find({
      relations: ['user'],
      order: { type: 'DESC', createdAt: 'DESC' },
      where: { groupId },
    });
    return test;
  }

  public async updateById(postId: number, postDto: PostUpdateDto) {
    const { title, content, type } = postDto;
    const existPost = await this.findOneOrFail(postId);
    existPost.title = title;
    existPost.content = content;
    existPost.type = type;
    return this.save(existPost);
  }

  public increaseHit(post: Post) {
    const { id, hit } = post;
    this.update({ id }, { hit: hit + 1 });
  }

  public async deleteById(postId: number) {
    this.delete({ id: postId });
  }
}
