import { ErrorSpec } from './ErrorSpec';

export const ErrorCode = Object.freeze({
  // basic
  BAD_REQUEST: new ErrorSpec('B100', '사용자 입력 에러'),
  ENTITY_NOT_FOUND: new ErrorSpec('B101', ''),
  FORBIDDEN_ACCCES: new ErrorSpec('B102', '잘못된 접근입니다.'),
  // auth
  NOT_LOGGED_IN: new ErrorSpec('A000', '로그인이 필요합니다.'),
  NOT_AUTHORIZED: new ErrorSpec('A001', '잘못된 권한입니다.'),
  OAUTH_ERROR: new ErrorSpec('A200', '소셜로그인 인증 에러입니다.'),
  // user type
  USER_NOT_MENTOR: new ErrorSpec('T000', '멘토 유저가 아닙니다.'),
  USER_NOT_OWNER: new ErrorSpec('T001', '그룹 소유자가 아닙니다.'),
  USER_ALREADY_MENTOR: new ErrorSpec('T002', '이미 멘토등록된 유저입니다.'),
  // group
  DUP_ENROLLMENT: new ErrorSpec('G000', '이미 그룹에 등록된 유저입니다.'),
  GROUP_NOT_FOUND: new ErrorSpec('G001', '잘못된 그룹ID 입니다.'),
  GROUP_INVALID: new ErrorSpec('G002', '정상적이지 않은 그룹입니다.'),
  GROUP_ALREADY_APPLY: new ErrorSpec('G003', '이미 가입 신청한 상태입니다.'),
  GROUP_ALREADY_JOIN: new ErrorSpec('G004', '이미 속해 있는 그룹입니다.'),
  GROUP_ALREADY_DECLINED: new ErrorSpec('G005', '그룹 신청이 거절되었습니다.'),
  GROUP_NOT_INVOLVE: new ErrorSpec('G006', '그룹에 속해있지 않습니다.'),
  // group
  MENTORING_ALREADY_REQUEST: new ErrorSpec('M00', '이미 멘토링 신청을 한 상태입니다.'),
  MENTOR_NOT_FOUND: new ErrorSpec('M01', '잘못된 멘토ID 입니다.'),
  MENTORING_NOT_FOUND: new ErrorSpec('M02', '멘토링 요청 정보를 찾을 수 없습니다.'),
});
