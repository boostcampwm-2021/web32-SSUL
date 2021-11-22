import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PostRepository } from '../repository/PostRepository';
import { Post } from '../models/Post';
import { PostContentDto } from '../dto/PostDto';

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
}
