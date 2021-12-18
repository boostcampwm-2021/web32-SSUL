import { PostContentDto } from '@domains/post/dto/PostContentDto';
import { PostType } from '@domains/post/models/Post';
import { PostRepository } from '@domains/post/repository/PostRepository';
import { group } from 'console';
import express from 'express';
import request from 'supertest';
import { getCustomRepository } from 'typeorm';
import appWrapper from '../../../src/app';
import { getLoginCookie } from '../../util/cookieSession';
import { generateString } from '../../util/string';
import { testConnection } from '../../util/testConnection';

describe('Post Controller 테스트', () => {
  let app: express.Application;
  let postRepository: PostRepository;

  const TEST_TITLE = '테스트 게시글 작성 제목';
  const TEST_CONTENT = '테스트 게시글 내용';

  beforeAll(async () => {
    await testConnection.create();
    app = await appWrapper.getInstance();
    postRepository = getCustomRepository(PostRepository);
  });

  afterAll(async () => {
    await testConnection.close();
  });

  afterEach(async () => {
    await postRepository.clear();
  });

  const setUpPost = async (userId: number, groupId: number) => {
    const postDto = new PostContentDto();
    postDto.title = TEST_TITLE;
    postDto.content = TEST_CONTENT;
    postDto.groupId = groupId;
    postDto.type = PostType.NORMAL;
    return await postRepository.save(postDto.toEntity(userId));
  };

  describe('[GET /post/:gid] 그룹 전체 게시글 조회', () => {
    test('전체 조회 성공', async () => {
      // given
      const userId = 2;
      const mockSession = getLoginCookie({
        id: userId,
      });
      const groupId = 1;
      await setUpPost(userId, groupId);

      // when
      const res = await request(app).get(`/api/post/${groupId}`).set('Cookie', [mockSession]);

      // then
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
      expect(res.body[0].title).toBe(TEST_TITLE);
      expect(res.body[0].content).toBe(TEST_CONTENT);
      expect(res.body[0].type).toBe(PostType.NORMAL);
    });

    test('인증 정보 없을 시 401 에러', async () => {
      // when
      const res = await request(app).get('/api/post/1');

      // then
      expect(res.statusCode).toBe(401);
    });

    test('본인 그룹이 아닐 시 401 에러', async () => {
      // given
      const mockSession = getLoginCookie({
        id: 1,
      });
      // when
      const res = await request(app).get('/api/post/4').set('Cookie', [mockSession]);

      // then
      expect(res.statusCode).toBe(401);
    });
  });

  describe('[POST /post] 그룹 게시글 생성', () => {
    test('정상적인 게시글 작성', async () => {
      // given
      const mockSession = getLoginCookie({
        id: 2,
      });
      const groupPostDto = {
        groupId: 1,
        title: TEST_TITLE,
        content: TEST_CONTENT,
        type: PostType.NORMAL,
      };

      // when
      const res = await request(app)
        .post('/api/post')
        .set('Cookie', [mockSession])
        .send(groupPostDto);

      // then
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(TEST_TITLE);
      expect(res.body.content).toBe(TEST_CONTENT);
      expect(res.body.type).toBe(PostType.NORMAL);
    });

    test('게시글 제목 길이 초과 시 400 에러', async () => {
      // given
      const mockSession = getLoginCookie({
        id: 2,
      });
      const groupPostDto = {
        groupId: 1,
        title: generateString(101),
        content: TEST_CONTENT,
        type: PostType.NORMAL,
      };

      // when
      const res = await request(app)
        .post('/api/post')
        .set('Cookie', [mockSession])
        .send(groupPostDto);

      // then
      expect(res.statusCode).toBe(400);
    });

    test('게시글 본문 길이 초과 시 400 에러', async () => {
      // given
      const mockSession = getLoginCookie({
        id: 2,
      });
      const groupPostDto = {
        groupId: 1,
        title: TEST_TITLE,
        content: generateString(1024),
        type: 'NORMAL',
      };

      // when
      const res = await request(app)
        .post('/api/post')
        .set('Cookie', [mockSession])
        .send(groupPostDto);

      // then
      expect(res.statusCode).toBe(400);
    });

    test('그룹에 소속되지 않은 사용자가 글을 생성하는 경우 401 에러', async () => {
      // given
      const mockSession = getLoginCookie({
        id: 1,
      });
      const groupPostDto = {
        groupId: 4,
        title: TEST_TITLE,
        content: TEST_CONTENT,
        type: 'NORMAL',
      };

      // when
      const res = await request(app)
        .post('/api/post')
        .set('Cookie', [mockSession])
        .send(groupPostDto);

      // then
      expect(res.statusCode).toBe(401);
    });
  });

  describe('[PATCH /post] 그룹 게시글 수정', () => {
    test('게시글 수정 성공', async () => {
      // given
      const userId = 2;
      const groupId = 1;
      const mockSession = getLoginCookie({
        id: userId,
      });
      const existPost = await setUpPost(userId, groupId);

      const CHANGED_TITLE = 'CHANGED';
      const postUpdateDto = {
        id: existPost.id,
        groupId,
        title: CHANGED_TITLE,
        content: TEST_CONTENT,
        type: PostType.NORMAL,
      };

      // when
      const res = await request(app)
        .patch('/api/post')
        .set('Cookie', [mockSession])
        .send(postUpdateDto);

      // then
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(CHANGED_TITLE);
    });

    test('작성자가 아닌 사용자가 글을 수정하는 경우 400 에러', async () => {
      // given
      const postOwnerId = 3;
      const userId = 2;
      const groupId = 1;
      const mockSession = getLoginCookie({
        id: userId,
      });
      const existPost = await setUpPost(postOwnerId, groupId);
      const groupPostUpdateDto = {
        id: existPost.id,
        groupId,
        title: TEST_TITLE,
        content: TEST_CONTENT,
        type: PostType.NORMAL,
      };

      // when
      const res = await request(app)
        .patch('/api/post')
        .set('Cookie', [mockSession])
        .send(groupPostUpdateDto);

      // then
      expect(res.statusCode).toBe(400);
    });
  });
  describe('[Delete /post] 그룹 게시글 삭제', () => {
    test('정상적인 게시글 삭제', async () => {
      // given
      const userId = 2;
      const groupId = 1;
      const mockSession = getLoginCookie({
        id: userId,
      });
      const existPost = await setUpPost(userId, groupId);

      // when
      const res = await request(app)
        .delete('/api/post')
        .query({
          gid: groupId,
          pid: existPost.id,
        })
        .set('Cookie', [mockSession]);

      // then
      expect(res.statusCode).toBe(200);
      const post = await postRepository.findOne(existPost.id);
      expect(post).toBe(undefined);
    });

    test('작성자가 아닌 사용자가 글을 삭제하는 경우 401 에러', async () => {
      // given
      const postOwnerId = 3;
      const userId = 2;
      const groupId = 1;
      const mockSession = getLoginCookie({
        id: userId,
      });
      const existPost = await setUpPost(postOwnerId, groupId);

      // when
      const res = await request(app)
        .delete('/api/post')
        .query({
          gid: groupId,
          pid: existPost.id,
        })
        .set('Cookie', [mockSession]);

      // then
      expect(res.statusCode).toBe(401);
    });
  });
});
