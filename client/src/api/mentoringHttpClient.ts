import { AcceptRequestInfo, MentorInfo, MentoringRequestData, RegisterMentorData } from '@types';
import HttpClient from './HttpClient';

class MentoringHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/mentoring' });
  }

  public getMentorId = (userId: number): Promise<MentorInfo> => {
    return this.httpClient.get(`/mentor/${userId}`);
  };

  public registerMentor = (registerData: RegisterMentorData): Promise<null> => {
    return this.httpClient.post(`/mentor`, registerData);
  };

  public getMentoringRequest = (mentorId: number): Promise<MentoringRequestData[]> => {
    return this.httpClient.get(`/request/${mentorId}`);
  };

  public rejectMentoringRequest = (requestId: number) => {
    return this.httpClient.post(`/request/reject/${requestId}`);
  };
  public acceptMentoringRequest = (requestData: AcceptRequestInfo) => {
    return this.httpClient.post('/request/accept', requestData);
  };
}

export const mentoringHttpClient = new MentoringHttpClient();
