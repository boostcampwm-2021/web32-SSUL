import express from 'express';
import request from 'supertest';
import appWrapper from '../../../src/app';

describe('카테고리 api test', () => {
  let app: express.Application;
  beforeAll(async () => {
    app = await appWrapper.getInstance();
  });

  describe('GET /category', () => {
    test('카테고리 조회 성공', async () => {
      const res = await request(app).get('/api/category');
      expect(res.statusCode).toBe(200);
    });
  });
});
