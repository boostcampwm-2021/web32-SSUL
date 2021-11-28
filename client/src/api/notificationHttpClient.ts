import { NotificationData } from '@types';
import HttpClient from './HttpClient';

class NotificationHttpClient extends HttpClient {
  public constructor() {
    super({ baseURL: '/api/alarm' });
  }

  public getNotificationList = (): Promise<NotificationData[]> =>
    this.httpClient.get(`/`);

  public updateNotificationState = (alarmId: number): Promise<null> =>
    this.httpClient.patch(`/${alarmId}`);
  
  public deleteNotification = (alarmId: number): Promise<null> =>
    this.httpClient.delete(`/${alarmId}`);
}

export const notificationHttpClient = new NotificationHttpClient();
