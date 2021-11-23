import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PostRepository } from '../repository/PostRepository';
import { Post } from '../models/Post';
import { PostUpdateDto } from '../dto/PostUpdateDto';

@Service()
export class PostService {
  constructor(
    @InjectRepository()
    private readonly postRepository: PostRepository,
  ) {}

  public async getPostsByGroupId(groupId: number): Promise<Post[]> {
    return await this.postRepository.findByGroupId(groupId);
  }

  public async createPost(post: Post): Promise<void> {
    await this.postRepository.insert(post);
  }

  public async updatePost(userId: number, post: PostUpdateDto): Promise<void> {
    const { id: postId } = post;
    await this.postRepository.findOneByPostIdOrFail(postId);
    await this.postRepository.findOneByWriterDataOrFail(postId, userId);
    await this.postRepository.updateContentByPostId(post);
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
