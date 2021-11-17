import { ErrorSpec } from './ErrorSpec';

export const ErrorCode = Object.freeze({
  TEST_ERROR: new ErrorSpec('T100', '테스트 에러 코드입니다.'),
  BAD_REQUEST: new ErrorSpec('U100', '사용자 입력 에러'),
  OAUTH_ERROR: new ErrorSpec('A200', '소셜로그인 인증 에러입니다.'),
});
