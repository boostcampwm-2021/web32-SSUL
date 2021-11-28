import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PostRepository } from '../repository/PostRepository';
import { Post } from '../models/Post';
import { PostUpdateDto } from '../dto/PostUpdateDto';
import { PostResponse } from '../dto/PostResponse';

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

  public async createPost(post: Post): Promise<void> {
    await this.postRepository.insert(post);
  }

  public async updatePost(userId: number, post: PostUpdateDto): Promise<void> {
    const { id: postId } = post;
    await this.postRepository.findOneByPostIdOrFail(postId);
    await this.postRepository.findOneByWriterDataOrFail(postId, userId);
    await this.postRepository.updateByPostId(post);
  }

  public async deletePost(userId: number, postId: number): Promise<void> {
    await this.postRepository.findOneByPostIdOrFail(postId);
    await this.postRepository.findOneByWriterDataOrFail(postId, userId);
    await this.postRepository.deleteByPostId(postId);
  }

  public async increaseHit(postId: number): Promise<void> {
    const post = await this.postRepository.findOneByPostIdOrFail(postId);
    this.postRepository.increaseHit(post);
  }
}
