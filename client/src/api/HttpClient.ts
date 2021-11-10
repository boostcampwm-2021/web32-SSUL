import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

interface AxiosDefaultConfig {
  timeout?: number;
  baseURL?: string;
}

export default abstract class HttpClient {
  protected httpClient: AxiosInstance;

  public constructor(config: AxiosDefaultConfig) {
    this.httpClient = axios.create(config);
    this.initResponseInterceptor();
  }

  private initResponseInterceptor = () => {
    this.httpClient.interceptors.response.use(this.handleResponse, this.handleError);
  };
  private handleResponse = (response: AxiosResponse) => response.data;

  protected handleError = (error: AxiosError): Promise<never> => Promise.reject(error);
}
