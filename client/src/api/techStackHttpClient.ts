import HttpClient from './HttpClient';
import { TechStack, UpdateTechStackData } from '@types';

class TechStackHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/techstack' });
  }

  public getTechStackList = (): Promise<TechStack[]> => this.httpClient.get('/');
  public getMenteeTechStackList = (userId: number): Promise<TechStack[]> =>{
    return this.httpClient.get(`/mentee/${userId}`);
  }
  public getMentorTechStackList = (userId: number): Promise<TechStack[]> =>{
    return this.httpClient.get(`/mentor/${userId}`);
  }
  public putMenteeTechStack =(request: UpdateTechStackData): Promise<null> =>{
    return this.httpClient.put('/mentee',request)
  } 
}

export const techStackHttpClient = new TechStackHttpClient();
