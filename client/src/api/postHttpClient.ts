import HttpClient from './HttpClient';
import { GroupPostResponse, GroupPostRequestDto } from '@types';

class PostHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/post' });
  }

  public getGroupPosts = (groupId: number): Promise<GroupPostResponse[]> =>
    this.httpClient.get(`/${groupId}`);

  public createPost = (groupPostData: GroupPostRequestDto): Promise<null> =>
    this.httpClient.post('', groupPostData);

  public updatePost = (groupPostData: GroupPostRequestDto): Promise<null> =>
    this.httpClient.patch('', groupPostData);

  public deletePost = (postId: number, groupId: number): Promise<null> =>
    this.httpClient.delete(`?pid=${postId}&gid=${groupId}`);

  public increasePostHit = (postId: number): Promise<null> =>
    this.httpClient.patch(`/hit/${postId}`);
}

export const postHttpClient = new PostHttpClient();
