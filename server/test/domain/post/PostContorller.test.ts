import express from 'express';
import request from 'supertest';
import appWrapper from '../../../src/app';
import { getLoginCookie } from '../../util/cookieSession';
import { generateString } from '../../util/string';

describe('Post Controller 테스트', () => {
  let app: express.Application;
  const TEST_TITLE = '테스트 게시글 작성 제목';
  const TEST_CONTENT = '테스트 게시글 내용';

  beforeAll(async () => {
    app = await appWrapper.getInstance();
  });

  describe('[GET /post/:gid] 그룹 전체 게시글 조회', () => {
    test('전체 조회 성공', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 2 });

      // when
      const res = await request(app).get('/api/post/1').set('Cookie', [cookieSession]);

      // then
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });

    test('인증 정보 없을 시 401 에러', async () => {
      // when
      const res = await request(app).get('/api/post/1');

      // then
      expect(res.statusCode).toBe(401);
    });

    test('본인 그룹이 아닐 시 401 에러', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 1 });
      // when
      const res = await request(app).get('/api/post/4').set('Cookie', [cookieSession]);

      // then
      expect(res.statusCode).toBe(401);
    });
  });

  describe('[POST /post] 그룹 게시글 생성', () => {
    test('정상적인 게시글 작성', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 2 });
      const groupPostDto = {
        groupId: 1,
        title: TEST_TITLE,
        content: TEST_CONTENT,
        type: 'NORMAL',
      };

      // when
      const res = await request(app)
        .post('/api/post')
        .set('Cookie', [cookieSession])
        .send(groupPostDto);

      // then
      expect(res.statusCode).toBe(200);
    });

    test('게시글 제목 길이 초과 시 400 에러', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 2 });
      const groupPostDto = {
        groupId: 1,
        title: generateString(101),
        content: TEST_CONTENT,
        type: 'NORMAL',
      };

      // when
      const res = await request(app)
        .post('/api/post')
        .set('Cookie', [cookieSession])
        .send(groupPostDto);

      // then
      expect(res.statusCode).toBe(400);
    });

    test('게시글 본문 길이 초과 시 400 에러', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 2 });
      const groupPostDto = {
        groupId: 1,
        title: TEST_TITLE,
        content: generateString(1024),
        type: 'NORMAL',
      };

      // when
      const res = await request(app)
        .post('/api/post')
        .set('Cookie', [cookieSession])
        .send(groupPostDto);

      // then
      expect(res.statusCode).toBe(400);
    });

    test('그룹에 소속되지 않은 사용자가 글을 생성하는 경우 401 에러', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 1 });
      const groupPostDto = {
        groupId: 4,
        title: TEST_TITLE,
        content: TEST_CONTENT,
        type: 'NORMAL',
      };

      // when
      const res = await request(app)
        .post('/api/post')
        .set('Cookie', [cookieSession])
        .send(groupPostDto);

      // then
      expect(res.statusCode).toBe(401);
    });
  });

  describe('[PATCH /post] 그룹 게시글 수정', () => {
    test('정상적인 게시글 수정', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 2 });
      const groupPostUpdateDto = {
        id: 2,
        groupId: 1,
        title: TEST_TITLE,
        content: TEST_CONTENT,
        type: 'NORMAL',
      };

      // when
      const res = await request(app)
        .patch('/api/post')
        .set('Cookie', [cookieSession])
        .send(groupPostUpdateDto);

      // then
      expect(res.statusCode).toBe(200);
    });

    test('작성자가 아닌 사용자가 글을 수정하는 경우 400 에러', async () => {
      // given
      const cookieSession = getLoginCookie({ id: 2 });
      const groupPostUpdateDto = {
        id: 1,
        groupId: 1,
        title: TEST_TITLE,
        content: TEST_CONTENT,
        type: 'NORMAL',
      };

      // when
      const res = await request(app)
        .patch('/api/post')
        .set('Cookie', [cookieSession])
        .send(groupPostUpdateDto);

      // then
      expect(res.statusCode).toBe(400);
    });

    describe('[Delete /post] 그룹 게시글 삭제', () => {
      test('정상적인 게시글 삭제', async () => {
        // given
        const cookieSession = getLoginCookie({ id: 2 });

        // when
        const res = await request(app)
          .delete('/api/post?gid=1&pid=2')
          .set('Cookie', [cookieSession]);

        // then
        expect(res.statusCode).toBe(200);
      });

      test('작성자가 아닌 사용자가 글을 삭제하는 경우 400 에러', async () => {
        // given
        const cookieSession = getLoginCookie({ id: 2 });

        // when
        const res = await request(app)
          .delete('/api/post?gid=1&pid=1')
          .set('Cookie', [cookieSession]);

        // then
        expect(res.statusCode).toBe(400);
      });
    });
  });
});
