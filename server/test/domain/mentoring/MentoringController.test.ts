import express from 'express';
import request from 'supertest';
import appWrapper from '../../../src/app';
import { getLoginCookie } from '../../util/cookieSession';

describe('/mentoring', () => {
  let app: express.Application;
  beforeAll(async () => {
    app = await appWrapper.getInstance();
  });

  describe('[GET /mentor/:uid] 유저 id로 멘토링 id 가져옴', () => {
    //uid 4 is mentor
    test('멘토 등록된 유저는 성공', async () => {
      //when
      const response = await request(app).get('/api/mentoring/mentor/4');
      //then
      expect(response.statusCode).toBe(200);
      expect(response.body.mentorId).toBe(1);
    });

    test('멘토 등록X 유저는 실패', async () => {
      //when
      const response = await request(app).get('/api/mentoring/mentor/2');
      //then
      expect(response.statusCode).toBe(400);
    });
  });

  describe('[POST /mentor] 멘토 등록 신청', () => {
    test('멘토 등록 성공', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 5 });
      const mentorRegstDto = {
        userId: 5,
        techStacks: [
          { id: 1, name: 'react' },
          { id: 2, name: 'express' },
        ],
      };

      //when
      const res = await request(app)
        .post('/api/mentoring/mentor')
        .set('Cookie', [cookieSession])
        .send(mentorRegstDto);

      //then
      expect(res.statusCode).toBe(200);
    });

    test('본인이 아닐시 등록 실패', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 2 });
      const mentorRegstDto = {
        userId: 3,
        techStacks: [
          { id: 1, name: 'react' },
          { id: 2, name: 'express' },
        ],
      };

      //when
      const res = await request(app)
        .post('/api/mentoring/mentor')
        .set('Cookie', [cookieSession])
        .send(mentorRegstDto);

      //then
      expect(res.statusCode).toBe(401);
    });

    test('기술 스택 없을때 400 에러', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 2 });
      const mentorRegstDto = {
        userId: 2,
        techStacks: [],
      };

      //when
      const res = await request(app)
        .post('/api/mentoring/mentor')
        .set('Cookie', [cookieSession])
        .send(mentorRegstDto);

      //then
      expect(res.statusCode).toBe(400);
    });

    test('기술 스택 5개초과 400 에러', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 2 });
      const mentorRegstDto = {
        userId: 2,
        techStacks: ['java', 'javascript', 'express', 'nginx', 'react', 'vue.js'],
      };

      //when
      const res = await request(app)
        .post('/api/mentoring/mentor')
        .set('Cookie', [cookieSession])
        .send(mentorRegstDto);

      //then
      expect(res.statusCode).toBe(400);
    });
  });
});
