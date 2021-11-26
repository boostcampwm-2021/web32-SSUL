import { SimpleGroupCardResponse } from '@domains/group/dto/SimpleGroupCardResponse';
import { GroupState } from '@domains/group/models/Group';
import { GroupEnrollmentAs } from '@domains/group/models/GroupEnrollment';
import express from 'express';
import request from 'supertest';
import appWrapper from '../../../src/app';
import { getLoginCookie } from '../../util/cookieSession';

describe('그룹 컨트롤러', () => {
  let app: express.Application;
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

  describe('GET /group/my', () => {
    test('멘티로 참여한 진행중 상태 조회 성공', async () => {
      //given
      const mockSession = getLoginCookie({ id: 2 });

      //when
      const response = await request(app).get('/api/group/my').set('Cookie', mockSession).query({
        status: GroupState.DOING,
        type: GroupEnrollmentAs.MENTEE,
      });

      //then
      expect(response.statusCode).toBe(200);
      const groups: SimpleGroupCardResponse[] = response.body;
      groups.forEach((group) => {
        expect(group.status).toBe(GroupState.DOING);
      });
    });

    test('멘티로 참여한 완료 상태 조회 성공', async () => {
      //given
      const mockSession = getLoginCookie({ id: 2 });

      //when
      const response = await request(app).get('/api/group/my').set('Cookie', mockSession).query({
        status: GroupState.END,
        type: GroupEnrollmentAs.MENTEE,
      });

      //then
      expect(response.statusCode).toBe(200);
      const groups: SimpleGroupCardResponse[] = response.body;
      groups.forEach((group) => {
        expect(group.status).toBe(GroupState.END);
      });
    });

    test('query에 status누락시 400 에러', async () => {
      //given
      const mockSession = getLoginCookie({ id: 2 });

      //when
      //no query
      const response = await request(app).get('/api/group/my').set('Cookie', mockSession);

      //then
      expect(response.statusCode).toBe(400);
    });

    test('멘토로 참여한 진행 중 상태 조회 성공', async () => {
      //given
      const mockSession = getLoginCookie({ id: 4 });

      //when
      const response = await request(app).get('/api/group/my').set('Cookie', mockSession).query({
        status: GroupState.DOING,
        type: GroupEnrollmentAs.MENTOR,
      });

      //then
      expect(response.statusCode).toBe(200);
      const { id, status } = response.body[0];
      expect(id).toBe(2);
      expect(status).toBe(GroupState.DOING);
    });
    test('멘토로 참여한 진행 완료 상태 그룹 조회 성공', async () => {
      //given
      const mockSession = getLoginCookie({ id: 4 });

      //when
      const response = await request(app).get('/api/group/my').set('Cookie', mockSession).query({
        status: GroupState.END,
        type: GroupEnrollmentAs.MENTOR,
      });

      //then
      expect(response.statusCode).toBe(200);
      const { id, status } = response.body[0];
      expect(id).toBe(3);
      expect(status).toBe(GroupState.END);
    });
  });

  describe('[POST /apply] 그룹 가입 신청', () => {
    test('그룹 가입 성공', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 3 });
      const applyInfo = { groupId: 3, userId: 3 };

      //when
      const res = await request(app)
        .post('/api/group/apply')
        .set('Cookie', [cookieSession])
        .send(applyInfo);

      //then
      expect(res.statusCode).toBe(200);
    });

    test('이미 신청한 그룹이었을 때 에러 발생', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 3 });
      const applyInfo = { groupId: 3, userId: 3 };

      //when
      const res = await request(app)
        .post('/api/group/apply')
        .set('Cookie', [cookieSession])
        .send(applyInfo);

      //then
      expect(res.statusCode).toBe(400);
    });
  });

  describe('[GET /role/:gid] 그룹에서의 역할 가져오기', () => {
    test('그룹장 역할 가져오기 성공', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 2 });
      const groupId = 4;

      //when
      const res = await request(app)
        .get(`/api/group/role/${groupId}`)
        .set('Cookie', [cookieSession]);

      //then
      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('OWNER');
    });

    test('멘토 역할 가져오기 성공', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 4 });
      const groupId = 1;

      //when
      const res = await request(app)
        .get(`/api/group/role/${groupId}`)
        .set('Cookie', [cookieSession]);

      //then
      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('MENTOR');
    });

    test('멘티 역할 가져오기 성공', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 2 });
      const groupId = 1;

      //when
      const res = await request(app)
        .get(`/api/group/role/${groupId}`)
        .set('Cookie', [cookieSession]);

      //then
      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('MENTEE');
    });

    test('현재 신청 중인 상태', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 3 });
      const groupId = 1;
      //when
      const res = await request(app)
        .get(`/api/group/role/${groupId}`)
        .set('Cookie', [cookieSession]);

      //then
      expect(res.statusCode).toBe(400);
    });
  });
});
