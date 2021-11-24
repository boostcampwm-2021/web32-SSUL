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
      const mockSession = getLoginCookie({ id: 1 });

      //when
      const response = await request(app).get('/api/group/own').set('Cookie', mockSession);

      //then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(3);
      const { id, name, maxUserCnt, curUserCnt } = response.body[0];
      expect(id).toBe(1);
      expect(name).toBe('testgroup1');
      expect(maxUserCnt).toBe(8);
      expect(curUserCnt).toBe(1);
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
      expect(name).toBe('testgroup1');
      expect(maxUserCnt).toBe(8);
      expect(curUserCnt).toBe(1);
    });
  });

  describe('GET /group/my/mentee', () => {
    test('멘티로 참여한 진행중 상태 조회 성공', async () => {
      //given
      const mockSession = getLoginCookie({ id: 2 });

      //when
      const response = await request(app)
        .get('/api/group/my/mentee')
        .set('Cookie', mockSession)
        .query({
          status: 'DOING',
        });

      //then
      expect(response.statusCode).toBe(200);
      const groups: SimpleGroupCardResponse[] = response.body;
      groups.forEach((group) => {
        expect(group.status).toBe('DOING');
      });
    });

    test('멘티로 참여한 완료 상태 조회 성공', async () => {
      //given
      const mockSession = getLoginCookie({ id: 2 });

      //when
      const response = await request(app)
        .get('/api/group/my/mentee')
        .set('Cookie', mockSession)
        .query({
          status: 'DONE',
        });

      //then
      expect(response.statusCode).toBe(200);
      const groups: SimpleGroupCardResponse[] = response.body;
      groups.forEach((group) => {
        expect(group.status).toBe('DONE');
      });
    });

    test('query에 status누락시 400 에러', async () => {
      //given
      const mockSession = getLoginCookie({ id: 2 });

      //when
      //no query
      const response = await request(app).get('/api/group/my/mentee').set('Cookie', mockSession);

      //then
      console.log(response.body);
      expect(response.statusCode).toBe(400);
    });
  });
});
