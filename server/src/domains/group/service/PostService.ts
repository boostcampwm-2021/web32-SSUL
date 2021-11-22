import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PostRepository } from '../repository/PostRepository';
import { Post } from '../models/Post';
import { PostUpdateDto } from '../dto/PostDto';
import { UserIsNotWriterError } from '../error/UserIsNotWriterError';
import { GroupPostNotFoundError } from '../error/GroupPostNotFoundError';

@Service()
export class PostService {
  constructor(
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
    @InjectRepository()
    private readonly postRepository: PostRepository,
  ) {}

  public async getPostsByGroupId(groupId: number): Promise<Post[]> {
    return await this.postRepository.find({ where: { groupId } });
  }

  public async createPost(post: Post): Promise<void> {
    await this.postRepository.insert(post);
  }

  public async updatePost(userId: number, post: PostUpdateDto): Promise<void> {
    const { id: postId } = post;
    const postData = await this.postRepository.findOne({ where: { id: postId } });
    if (!postData) throw new GroupPostNotFoundError();

    const isWriter = await this.isWriter(postId, userId);
    if (!isWriter) throw new UserIsNotWriterError();

    const { title, content, type } = post;
    await this.postRepository.update({ id: postId }, { title, content, type });
  }

  public async deletePost(userId: number, postId: number): Promise<void> {
    const postData = await this.postRepository.findOne({ where: { id: postId } });
    if (!postData) throw new GroupPostNotFoundError();

    const isWriter = await this.isWriter(postId, userId);
    if (!isWriter) throw new UserIsNotWriterError();

    await this.postRepository.delete({ id: postId });
  }

  public async isWriter(postId: number, userId: number): Promise<boolean> {
    const post = await this.postRepository.findOne({ where: { id: postId, userId } });
    return post !== undefined;
  }

  public async increaseHit(postId: number): Promise<void> {
    const post = await this.postRepository.findOneOrFail({ where: { id: postId } });
    this.postRepository.update({ id: postId }, { hit: post.hit + 1 });
  }
}
