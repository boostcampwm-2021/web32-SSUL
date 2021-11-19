import { UserIsNotMentorError } from '@domains/mentoring/error/UserIsNotMentorError';

export function isMentor(request: any, response: any, next: (err?: any) => any): any {
  if (request.session.role === 'MENTOR') {
    next();
  } else {
    next(new UserIsNotMentorError(request.session.id));
  }
}
