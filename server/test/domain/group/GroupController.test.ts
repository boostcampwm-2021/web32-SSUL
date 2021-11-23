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
});
