import { MentorInfoResponse, RegisterMentorRequest } from '@types';
import HttpClient from './HttpClient';

class MentoringHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/mentoring' });
  }

  public getMentorId = (userId: number): Promise<MentorInfoResponse> => {
    return this.httpClient.get(`/mentor/${userId}`);
  };

  public registerMentor = (registerData: RegisterMentorRequest): Promise<null> => {
    return this.httpClient.post(`/mentor`, registerData);
  };
}

export const mentoringHttpClient = new MentoringHttpClient();
