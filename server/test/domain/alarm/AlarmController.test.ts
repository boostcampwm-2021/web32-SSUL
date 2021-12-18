import { getLoginCookie } from '@root/test/util/cookieSession';
import { testConnection } from '@root/test/util/testConnection';
import express from 'express';
import request from 'supertest';
import appWrapper from '../../../src/app';

describe('알림 컨트롤러', () => {
  let app: express.Application;
  beforeAll(async () => {
    await testConnection.create();
    app = await appWrapper.getInstance();
  });

  afterAll(async () => {
    await testConnection.close();
  });

  describe('GET /alarm', () => {
    test('알림 전체 목록 조회 성공', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 4 });

      // when
      const response = await request(app).get('/api/alarm').set('Cookie', [cookieSession]);

      // then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
    });

    test('알림 읽음 처리 성공', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 4 });

      // when
      let response = await request(app).patch('/api/alarm/2').set('Cookie', [cookieSession]);

      // then
      expect(response.statusCode).toBe(200);
      response = await request(app).get('/api/alarm').set('Cookie', [cookieSession]);
      expect(response.statusCode).toBe(200);
      expect(response.body[1].readChk).toBe(1);
    });

    test('사용자 본인의 알림이 아닌데 수정을 하면 400 에러', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 2 });

      // when
      const response = await request(app).patch('/api/alarm/2').set('Cookie', [cookieSession]);

      // then
      expect(response.statusCode).toBe(400);
    });

    test('알림 삭제 처리 성공', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 4 });

      // when
      let response = await request(app).delete('/api/alarm/2').set('Cookie', [cookieSession]);

      // then
      expect(response.statusCode).toBe(200);
      response = await request(app).get('/api/alarm').set('Cookie', [cookieSession]);
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
    });

    test('사용자 본인의 알림이 아닌데 삭제를 하면 400 에러', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 2 });

      // when
      const response = await request(app).delete('/api/alarm/3').set('Cookie', [cookieSession]);

      // then
      expect(response.statusCode).toBe(400);
    });
  });
});
