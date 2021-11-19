import { NotLoggedInError } from '@error/NotLoggedInError';

export function isLoggedIn(request: any, response: any, next: (err?: any) => any): any {
  if (request.session.user) {
    next();
  } else {
    next(new NotLoggedInError());
  }
}
