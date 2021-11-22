import express from 'express';
import request from 'supertest';

import appWrapper from '../../../src/app';
import { getLoginCookie } from '../../util/cookieSession';

describe('그룹 컨트롤러', () => {
  let app: express.Application;

  beforeAll(async () => {
    app = await appWrapper.getInstance();
  });

  describe('GET /my', () => {
    test('조회성공', async () => {
      //given
      const mockSession = { id: 3 };

      //when
      const response = await request(app)
        .get('/api/group/my')
        .set('Cookie', getLoginCookie(mockSession));

      //then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });
});
