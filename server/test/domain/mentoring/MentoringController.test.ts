import { timeStamp } from 'console';
import express from 'express';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import request from 'supertest';
import appWrapper from '../../../src/app';

describe('/mentoring', () => {
  let app: express.Application;
  beforeAll(async () => {
    app = await appWrapper.getInstance();
  });

  describe('[GET /mentor/:uid] 유저 id로 멘토링 id 가져옴', () => {
    //uid 1 is mentor , uid 2 is not mentor
    test('멘토 등록된 유저는 성공', async () => {
      //when
      const response = await request(app).get('/api/mentoring/mentor/1');
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
});
