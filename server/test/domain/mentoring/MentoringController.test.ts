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
      const cookieSession = getLoginCookie({ id: 1 });
      const mentorRegstDto = {
        userId: 1,
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

  describe('[GET /mentor/list] 필터링된 멘토 리스트 가져오기', () => {
    //uid 1 is mentor , uid 2 is not mentor
    test('페이지 번호로 조회하기', async () => {
      //when

      const res = await request(app).get('/api/mentoring/mentor/list').query({
        page: 1,
      });
      //then
      expect(res.statusCode).toBe(200);
      const { mentors } = res.body;
      expect(mentors.length).toBeGreaterThanOrEqual(1);
      expect(res.body.totalPages).toBe(1);
    });

    test('선택한 기술스택을 가진 멘토만 조회되는지 테스트', async () => {
      //when
      const techStackName = 'javascript';
      const response = await request(app).get('/api/mentoring/mentor/list').query({
        techstack: techStackName,
      });
      //then
      expect(response.statusCode).toBe(200);

      const { mentors } = response.body;
      expect(mentors.length).toBeGreaterThanOrEqual(1);

      mentors.forEach((mentor: any) => {
        const mentorTechStacks = mentor.techStacks;
        const isIncludeTechStackList = mentorTechStacks.some((techstack: any) =>
          techStackName.includes(techstack.name),
        );
        expect(isIncludeTechStackList).toBe(true);
      });
    });

    test('선택한 이름을 가진 멘토만 조회되는지 테스트', async () => {
      //when
      const name = '유';
      const response = await request(app).get('/api/mentoring/mentor/list').query({
        name,
      });
      //then
      expect(response.statusCode).toBe(200);
      const { mentors } = response.body;

      expect(mentors.length).toBeGreaterThanOrEqual(1);
      mentors.forEach((mentor: any) => {
        const mentorName = mentor.user.name;
        const isIncludeMentorName = mentorName.includes(name);
        expect(isIncludeMentorName).toBe(true);
      });
    });
  });

  describe('[GET /request] 모든 멘토링 요청 리스트를 정상적으로 가져오는지 테스트', () => {
    //uid 1 is mentor , uid 2 is not mentor
    test('전체 조회 테스트', async () => {
      //when
      const res = await request(app).get('/api/mentoring/request');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('[POST /request] 멘토링 요청 테스트', () => {
    //userId 31 is owner , mentorId 33,34,35 is mentor
    test('정상 요청 테스트', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 31 });
      const mentorRequestDto = {
        mentorId: 35,
        groupId: 6,
      };
      //when
      const res = await request(app)
        .post('/api/mentoring/request')
        .set('Cookie', [cookieSession])
        .send(mentorRequestDto);
      //then
      expect(res.statusCode).toBe(200);
    });

    test('로그인 되어 있지 않은 유저가 요청을 보냈을 때 테스트', async () => {
      //given
      const mentorRequestDto = {};
      //when
      const res = await request(app).post('/api/mentoring/request').send(mentorRequestDto);
      //then
      expect(res.statusCode).toBe(401);
    });

    test('유효하지 않은 멘토 id일때', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 31 });
      const mentorRequestDto = {
        mentorId: 37,
        groupId: 6,
      };
      //when
      const res = await request(app)
        .post('/api/mentoring/request')
        .set('Cookie', [cookieSession])
        .send(mentorRequestDto);
      //then
      expect(res.statusCode).toBe(400);
    });

    test('유효하지 않은 그룹 id일때', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 31 });
      const mentorRequestDto = {
        mentorId: 37,
        groupId: 9,
      };
      //when
      const res = await request(app)
        .post('/api/mentoring/request')
        .set('Cookie', [cookieSession])
        .send(mentorRequestDto);
      //then
      expect(res.statusCode).toBe(400);
    });

    test('이미 멘토링 신청 내역이 존재할 때', async () => {
      //given
      const cookieSession = getLoginCookie({ id: 31 });
      const mentorRequestDto = {
        mentorId: 33,
        groupId: 6,
      };
      //when
      const res = await request(app)
        .post('/api/mentoring/request')
        .set('Cookie', [cookieSession])
        .send(mentorRequestDto);
      //then
      expect(res.statusCode).toBe(400);
    });
  });
});
