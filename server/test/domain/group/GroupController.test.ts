import { SimpleGroupCardResponse } from '@domains/group/dto/SimpleGroupCardResponse';
import { ApplyGroupState } from '@domains/group/models/ApplyGroup';
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

  describe('GET /own/simple', () => {
    test('조회성공', async () => {
      //given
      const mockSession = getLoginCookie({ id: 1 });

      //when
      const response = await request(app).get('/api/group/own/simple').set('Cookie', mockSession);

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

  describe('GET /applyed', () => {
    test('대기중 상태 조회 성공', async () => {
      //given
      const mockSession = getLoginCookie({ id: 3 });
      const applyedState = ApplyGroupState.PENDING;
      //when
      const response = await request(app)
        .get('/api/group/applyed')
        .query({ state: applyedState })
        .set('Cookie', mockSession);

      //then
      expect(response.statusCode).toBe(200);
      const { id, name } = response.body[0];
      expect(id).toBe(1); //pending state group
      expect(name).toBe('testgroup1');
    });

    test('거절 상태 조회 성공', async () => {
      //given
      const mockSession = getLoginCookie({ id: 3 });
      const applyedState = ApplyGroupState.DECLINED;
      //when
      const response = await request(app)
        .get('/api/group/applyed')
        .query({ state: applyedState })
        .set('Cookie', mockSession);

      //then
      expect(response.statusCode).toBe(200);
      const { id, name } = response.body[0];
      expect(id).toBe(2); //declined state group
      expect(name).toBe('testgroup2');
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

    test('query없을시 전부 조회', async () => {
      //given
      const mockSession = getLoginCookie({ id: 2 });

      //when
      //no query
      const response = await request(app).get('/api/group/my').set('Cookie', mockSession);

      //then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(3);
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

  // describe('GET /activity/:uid', () => {
  //   test('완료한 그룹이 있으면 참여했던 그룹 리스트 출력', async () => {
  //     //when
  //     const response = await request(app).get('/api/group/4');

  //     //then
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body.length).toBe(1);
  //     expect(response.body[0].name).toBe('testgroup3');
  //   });

  //   test('완료한 그룹이 없으면 빈 그룹 리스트 출력', async () => {
  //     //when
  //     const response = await request(app).get('/api/group/3');

  //     //then
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body.length).toBe(0);
  //   });

  //   test('잘못된 유저id인 경우 빈 그룹 리스트 출력', async () => {
  //     //when
  //     const response = await request(app).get('/api/group/9999');

  //     //then
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body.length).toBe(0);
  //   });
  // });
});
