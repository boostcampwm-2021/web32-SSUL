import express from 'express';
import request from 'supertest';
import appWrapper from '../../../src/app';
import { getLoginCookie } from '../../util/cookieSession';
import { generateString } from '../../util/string';

describe('그룹 컨트롤러', () => {
  let app: express.Application;
  const TEST_TITLE = '테스트 게시글 작성 제목';
  const TEST_CONTENT = '테스트 게시글 내용';

  beforeAll(async () => {
    app = await appWrapper.getInstance();
  });

  describe('GET /my', () => {
    test('조회성공', async () => {
      //given
      const mockSession = { id: 3 };

      //when
      const response = await request(app)
        .get('/api/group/own')
        .set('Cookie', getLoginCookie(mockSession));

      //then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('[POST /apply] 그룹 가입 신청', () => {
    test('그룹 가입 성공', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 3 });
      const applyInfo = { groupId: 2, userId: 3 };

      //when
      const res = await request(app)
        .post('/api/group/apply')
        .set('Cookie', [cookieSession])
        .send(applyInfo);

      //then
      expect(res.statusCode).toBe(200);
    });

    test('이미 신청한 그룹이었을 때 에러 발생', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 3 });
      const applyInfo = { groupId: 2, userId: 3 };

      //when
      const res = await request(app)
        .post('/api/group/apply')
        .set('Cookie', [cookieSession])
        .send(applyInfo);

      //then
      expect(res.statusCode).toBe(400);
    });
  });

  describe('[GET /role/:gid] 그룹에서의 역할 가져오기', () => {
    test('역할 가져오기 성공', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 4 });

      //when
      const res = await request(app).get('/api/group/role/1').set('Cookie', [cookieSession]);

      //then
      expect(res.statusCode).toBe(200);
    });

    test('현재 신청 중인 상태', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 4 });

      //when
      const res = await request(app).get('/api/group/role/5').set('Cookie', [cookieSession]);

      //then
      expect(res.statusCode).toBe(400);
    });
  });
});
