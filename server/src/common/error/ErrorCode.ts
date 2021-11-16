import { ErrorSpec } from './ErrorSpec';

export const ErrorCode = Object.freeze({
  TEST_ERROR: new ErrorSpec(100, '테스트 에러 코드입니다.'),
  BAD_REQUEST: new ErrorSpec(101, '사용자 입력 에러'),
});
