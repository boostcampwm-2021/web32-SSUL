import { getLoginCookie } from '@root/test/util/cookieSession';
import express from 'express';
import request from 'supertest';
import appWrapper from '../../../src/app';

describe('그룹 관리 컨트롤러', () => {
  let app: express.Application;

  beforeAll(async () => {
    app = await appWrapper.getInstance();
  });

  describe('[GET /api/group-owner/:gid] 그룹 id로 그룹 정보를 가져옴', () => {
    test('로그인한 유저가 그룹장인 경우 성공', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 1 });

      // when
      const response = await request(app).get('/api/group-owner/1').set('Cookie', [cookieSession]);

      // then
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('testgroup1');
    });

    test('로그인한 유저가 그룹장이 아닌경우 실패', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 4 });

      // when
      const response = await request(app).get('/api/group-owner/1').set('Cookie', [cookieSession]);

      // then
      expect(response.statusCode).toBe(401);
    });
  });

  describe('[GET /api/group-owner/apply/:gid] 그룹 id로 그룹 참가요청 리스트를 가져옴', () => {
    test('로그인한 유저가 그룹장인 경우 성공', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 1 });

      //when
      const response = await request(app)
        .get('/api/group-owner/apply/1')
        .set('Cookie', [cookieSession]);

      //then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toEqual(1);
    });

    test('로그인한 유저가 그룹장이 아닌경우 실패', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 4 });

      //when
      const response = await request(app)
        .get('/api/group-owner/apply/1')
        .set('Cookie', [cookieSession]);

      //then
      expect(response.statusCode).toBe(401);
    });
  });

  describe('[PATCH /api/group-owner/name] 그룹 제목을 수정함', () => {
    test('로그인한 유저가 그룹장인 경우 업데이트 성공', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 1 });
      const UpdateGroupNameDto = {
        gid: 1,
        name: 'group name test',
      };

      //when
      const response = await request(app)
        .patch('/api/group-owner/name')
        .set('Cookie', [cookieSession])
        .send(UpdateGroupNameDto);

      //then
      expect(response.statusCode).toBe(200);
    });

    test('로그인한 유저가 그룹장이 아닌경우 실패', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 4 });
      const UpdateGroupNameDto = {
        gid: 1,
        name: 'group name test',
      };
      //when
      const response = await request(app)
        .patch('/api/group-owner/name')
        .set('Cookie', [cookieSession])
        .send(UpdateGroupNameDto);

      //then
      expect(response.statusCode).toBe(401);
    });
  });

  describe('[PATCH /api/group-owner/date] 그룹 시작/종료일을 수정함', () => {
    test('로그인한 유저가 그룹장인 경우 업데이트 성공', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 1 });
      const UpdateGroupDateDto = {
        gid: 1,
        startAt: '2021-12-03',
        endAt: '2021-12-06',
      };

      //when
      const response = await request(app)
        .patch('/api/group-owner/date')
        .set('Cookie', [cookieSession])
        .send(UpdateGroupDateDto);

      //then
      expect(response.statusCode).toBe(200);
    });

    test('로그인한 유저가 그룹장이 아닌경우 실패', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 4 });
      const UpdateGroupDateDto = {
        gid: 1,
        startAt: '2021-12-03',
        endAt: '2021-12-06',
      };
      //when
      const response = await request(app)
        .patch('/api/group-owner/date')
        .set('Cookie', [cookieSession])
        .send(UpdateGroupDateDto);

      //then
      expect(response.statusCode).toBe(401);
    });
  });

  describe('[PATCH /api/group-owner/intro] 그룹 소개글을 수정함', () => {
    test('로그인한 유저가 그룹장인 경우 업데이트 성공', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 1 });
      const UpdateGroupIntroDto = {
        gid: 1,
        intro: 'group intro test',
      };

      //when
      const response = await request(app)
        .patch('/api/group-owner/intro')
        .set('Cookie', [cookieSession])
        .send(UpdateGroupIntroDto);

      //then
      expect(response.statusCode).toBe(200);
    });

    test('로그인한 유저가 그룹장이 아닌경우 실패', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 4 });
      const UpdateGroupIntroDto = {
        gid: 1,
        intro: 'group intro test',
      };
      //when
      const response = await request(app)
        .patch('/api/group-owner/intro')
        .set('Cookie', [cookieSession])
        .send(UpdateGroupIntroDto);

      //then
      expect(response.statusCode).toBe(401);
    });
  });

  describe('[PATCH /api/group-owner/decline/:aid] 그룹 참가 신청을 거절함', () => {
    test('로그인한 유저가 해당 참가요청 그룹의 그룹장이 아닌경우 실패', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 4 });

      //when
      const response = await request(app)
        .patch('/api/group-owner/decline/1')
        .set('Cookie', [cookieSession]);

      //then
      expect(response.statusCode).toBe(401);
    });

    test('로그인한 유저가 해당 참가요청 그룹의 그룹장인 경우 성공', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 1 });

      //when
      const response = await request(app)
        .patch('/api/group-owner/decline/1')
        .set('Cookie', [cookieSession]);

      //then
      expect(response.statusCode).toBe(200);
    });
  });

  describe('[PATCH /api/group-owner/accept/:aid] 그룹 참가 신청을 수락함', () => {
    test('로그인한 유저가 해당 참가요청 그룹의 그룹장이 아닌경우 실패', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 4 });

      //when
      const response = await request(app)
        .patch('/api/group-owner/accept/1')
        .set('Cookie', [cookieSession]);

      //then
      expect(response.statusCode).toBe(401);
    });

    test('로그인한 유저가 해당 참가요청 그룹의 그룹장인 경우 성공', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 1 });

      //when
      const response = await request(app)
        .patch('/api/group-owner/accept/1')
        .set('Cookie', [cookieSession]);

      //then
      expect(response.statusCode).toBe(200);
    });
  });
});
