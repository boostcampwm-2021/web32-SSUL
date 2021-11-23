import { SimpleGroupCardResponse } from '@domains/group/dto/SimpleGroupCardResponse';
import express from 'express';
import request from 'supertest';
import appWrapper from '../../../src/app';
import { getLoginCookie } from '../../util/cookieSession';

describe('그룹 컨트롤러', () => {
  let app: express.Application;
  const TEST_TITLE = '테스트 게시글 작성 제목';
  const TEST_CONTENT = '테스트 게시글 내용';

  beforeAll(async () => {
    app = await appWrapper.getInstance();
  });

  describe('GET /own', () => {
    test('조회성공', async () => {
      //given
      const mockSession = getLoginCookie({ id: 3 });

      //when
      const response = await request(app).get('/api/group/own').set('Cookie', mockSession);

      //then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
      const { id, name, maxUserCnt, curUserCnt } = response.body[1];
      expect(id).toBe(172);
      expect(name).toBe('owenr test group2');
      expect(maxUserCnt).toBe(12);
      expect(curUserCnt).toBe(2);
    });
  });

  describe('GET /pending-apply', () => {
    test('조회 성공', async () => {
      //given
      const mockSession = getLoginCookie({ id: 3 });

      //when
      const response = await request(app)
        .get('/api/group/pending-apply')
        .set('Cookie', mockSession);

      //then
      expect(response.statusCode).toBe(200);
      const { id, name, maxUserCnt, curUserCnt } = response.body[0];
      expect(id).toBe(1); //pending state group
      expect(name).toBe('프로그래밍 고수가 되는 길');
      expect(maxUserCnt).toBe(8);
      expect(curUserCnt).toBe(1);
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
    test('그룹장 역할 가져오기 성공', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 2 });

      //when
      const res = await request(app).get('/api/group/role/1').set('Cookie', [cookieSession]);

      //then
      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('OWNER');
    });

    test('멘토 역할 가져오기 성공', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 1 });

      //when
      const res = await request(app).get('/api/group/role/1').set('Cookie', [cookieSession]);

      //then
      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('MENTOR');
    });

    test('멘티 역할 가져오기 성공', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 4 });

      //when
      const res = await request(app).get('/api/group/role/1').set('Cookie', [cookieSession]);

      //then
      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('MENTEE');
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
