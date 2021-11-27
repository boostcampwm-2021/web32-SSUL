import {
  AcceptRequestInfo,
  MentorInfo,
  MentoringRequest,
  MentoringRequestData,
  MentoringRequestPostData,
  MentorListResponse,
  RegisterMentorData,
} from '@types';
import HttpClient from './HttpClient';

class MentoringHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/mentoring' });
  }

  public getFilterdMentorList = (query: string): Promise<MentorListResponse> =>
    this.httpClient.get(`/mentor/list${query}`);

  public getMentorId = (userId: number): Promise<MentorInfo> => {
    return this.httpClient.get(`/mentor/${userId}`);
  };

  public registerMentor = (registerData: RegisterMentorData): Promise<null> => {
    return this.httpClient.post(`/mentor`, registerData);
  };

  public getAllMentoringRequests = (): Promise<MentoringRequest[]> => {
    return this.httpClient.get(`/request`);
  };

  public postMentoringRequests = (
    MentoringRequestData: MentoringRequestPostData,
  ): Promise<null> => {
    return this.httpClient.post(`/request`, MentoringRequestData);
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
