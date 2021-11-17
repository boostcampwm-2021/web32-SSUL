import { ErrorSpec } from './ErrorSpec';

export const ErrorCode = Object.freeze({
  // basic
  BAD_REQUEST: new ErrorSpec('B100', '사용자 입력 에러'),
  // auth
  NOT_LOGGED_IN: new ErrorSpec('A000', '로그인이 필요합니다.'),
  OAUTH_ERROR: new ErrorSpec('A200', '소셜로그인 인증 에러입니다.'),
  // user type
  USER_NOT_MENTOR: new ErrorSpec('T000', '멘토 유저가 아닙니다.'),
  USER_NOT_OWNER: new ErrorSpec('T001', '그룹 소유자가 아닙니다.'),
});
