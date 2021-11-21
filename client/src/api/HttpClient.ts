import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

interface AxiosDefaultConfig {
  timeout?: number;
  baseURL?: string;
}

interface CustomError {
  status: number;
  code: string;
  description: string;
  error: AxiosError;
}

export default abstract class HttpClient {
  protected httpClient: AxiosInstance;

  public constructor(config: AxiosDefaultConfig) {
    this.httpClient = axios.create(config);
    this._initResponseInterceptor();
  }

  private _initResponseInterceptor = () => {
    this.httpClient.interceptors.response.use(this._handleResponse, this._handleError);
  };
  private _handleResponse = (response: AxiosResponse) => response.data;

  protected _handleError = (error: AxiosError): Promise<never> =>
    Promise.reject(this._toCustomError(error));

  private _toCustomError = (error: AxiosError): CustomError => {
    const { status, errorSpec } = error.response?.data;
    const responseError: CustomError = {
      status,
      code: errorSpec.code,
      description: errorSpec.description,
      error,
    };
    return responseError;
  };
}
