import Keygrip from 'keygrip';
import { Buffer } from 'safe-buffer';

export function createCookieSession(sessionName: string, data: any, key: string) {
  const cookie = Buffer.from(JSON.stringify({ user: data })).toString('base64');
  const setCookie = `${sessionName}=${cookie}`;
  const hash = Keygrip([key]).sign(setCookie);
  return `${setCookie}; ${sessionName}.sig=${hash};`;
}

export function getLoginCookie(sessionData: any) {
  return createCookieSession('session', sessionData, 'testsecret');
}
