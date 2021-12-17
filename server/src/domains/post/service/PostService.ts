import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PostRepository } from '../repository/PostRepository';
import { Post } from '../models/Post';
import { PostUpdateDto } from '../dto/PostUpdateDto';
import { PostResponse } from '../dto/PostResponse';
import { NotAuthorizedError } from '@common/error/NotAuthorizedError';

@Service()
export class PostService {
  constructor(
    @InjectRepository()
    private readonly postRepository: PostRepository,
  ) {}

  public async getPostsByGroupId(groupId: number): Promise<PostResponse[]> {
    const posts = await this.postRepository.findAllByGroupId(groupId);
    return posts.map((post) => PostResponse.from(post));
  }

  public async createPost(post: Post): Promise<Post> {
    return await this.postRepository.save(post);
  }

  public async updatePost(userId: number, postUpdateDto: PostUpdateDto): Promise<Post> {
    const { id: postId } = postUpdateDto;
    await this.postRepository.findOneByIdOrFail(postId);
    await this.postRepository.findOneByIdAndUserIdOrFail(postId, userId);
    return await this.postRepository.updateById(postId, postUpdateDto);
  }

  public async deletePost(userId: number, postId: number): Promise<void> {
    const existPost = await this.postRepository.findOneByIdOrFail(postId);
    if (existPost.userId !== userId) {
      throw new NotAuthorizedError();
    }
    await this.postRepository.deleteById(existPost.id);
  }

  public async increaseHit(postId: number): Promise<void> {
    const post = await this.postRepository.findOneByIdOrFail(postId);
    this.postRepository.increaseHit(post);
  }
}
