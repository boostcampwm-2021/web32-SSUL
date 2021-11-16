import HttpClient from './HttpClient';
import { TechStack, UpdateTechStackRequest } from '@types';

class TechStackHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/techstack' });
  }

  public getTechStackList = (): Promise<TechStack[]> => this.httpClient.get('/');
  public getMenteeTechStackList = (userId: number): Promise<TechStack[]> =>{
    return this.httpClient.get(`/mentee/${userId}`);
  }
  public putMenteeTechStack =(request: UpdateTechStackRequest): Promise<null> =>{
    return this.httpClient.put('/mentee',request)
  } 
}

export const techStackHttpClient = new TechStackHttpClient();
