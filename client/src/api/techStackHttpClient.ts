import HttpClient from './HttpClient';
import { TechStackResponse, TechStackUpdateDto } from '@types';

class TechStackHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/techstack' });
  }

  public getTechStackList = (): Promise<TechStackResponse[]> => this.httpClient.get('/');

  public getMenteeTechStackList = (userId: number): Promise<TechStackResponse[]> => {
    return this.httpClient.get(`/mentee/${userId}`);
  };
  public getMentorTechStackList = (userId: number): Promise<TechStackResponse[]> => {
    return this.httpClient.get(`/mentor/${userId}`);
  };
  public putMenteeTechStack = (request: TechStackUpdateDto): Promise<null> => {
    return this.httpClient.put('/mentee', request);
  };
}

export const techStackHttpClient = new TechStackHttpClient();
