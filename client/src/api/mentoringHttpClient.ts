import {
  MentoringAcceptRequestDto,
  MentorInfoResponse,
  SimpleMentoringRequestResponse,
  MentoringRequestPostData,
  MentorListResponse,
  MentoringRequestResponse,
  RegisterMentorDto,
} from '@types';
import HttpClient from './HttpClient';

class MentoringHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/mentoring' });
  }

  public getFilterdMentorList = (query: string): Promise<MentorListResponse> =>
    this.httpClient.get(`/mentor/list${query}`);

  public getMentorId = (userId: number): Promise<MentorInfoResponse> => {
    return this.httpClient.get(`/mentor/${userId}`);
  };

  public registerMentor = (body: RegisterMentorDto): Promise<null> => {
    return this.httpClient.post(`/mentor`, body);
  };

  public getAllMentoringRequests = (): Promise<SimpleMentoringRequestResponse[]> => {
    return this.httpClient.get(`/request`);
  };

  public deleteMentoringRequests = (deleteQuery: string): Promise<null> => {
    return this.httpClient.delete(`/request${deleteQuery}`);
  };

  public postMentoringRequests = (
    MentoringRequestData: MentoringRequestPostData,
  ): Promise<null> => {
    return this.httpClient.post(`/request`, MentoringRequestData);
  };

  public getMentoringRequest = (mentorId: number): Promise<MentoringRequestResponse[]> => {
    return this.httpClient.get(`/request/${mentorId}`);
  };

  public rejectMentoringRequest = (requestId: number) => {
    return this.httpClient.post(`/request/reject/${requestId}`);
  };
  public acceptMentoringRequest = (body: MentoringAcceptRequestDto) => {
    return this.httpClient.post('/request/accept', body);
  };
}

export const mentoringHttpClient = new MentoringHttpClient();
