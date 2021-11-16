import { MentorInfoResponse } from '@types';
import HttpClient from './HttpClient';

class MentoringHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/mentoring' });
  }

  public getMentorId = (userId: number): Promise<MentorInfoResponse> => {
    return this.httpClient.get(`/mentor/${userId}`);
  };
}

export const mentoringHttpClient = new MentoringHttpClient();
