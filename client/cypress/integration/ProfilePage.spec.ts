/* eslint-disable no-undef */
/// <reference types="Cypress" />

context('프로필 페이지', () => {
  const iterativeTask = () => {
    cy.ignoreAlarm();
    cy.intercept('GET', '/api/techstack', { fixture: 'techstack.json' });
  };

  before(() => {
    iterativeTask();
    cy.set();
    cy.intercept('GET', '/api/user/profile/ChanYangYu', { fixture: 'profile/profile-info.json' });
    cy.intercept('GET', '/api/user/intro/4', '');
    cy.intercept('GET', '/api/techstack/mentee/4', []);
    cy.intercept('GET', '/api/group/activity/4', { fixture: 'profile/group-activity.json' });
    cy.intercept('GET', '/api/mentoring/mentor/4', { forceNetworkError: true });
    cy.intercept('GET', '/api/techstack/mentor/4', { forceNetworkError: true });
    cy.visit('/profile/ChanYangYu');
    cy.waitForReact();
  });

  beforeEach(() => {
    iterativeTask();
  });

  describe('프로필 페이지 좌측 프로필 정보', () => {
    it('좌측 프로필 정보가 정상적으로 출력된다.', () => {
      cy.get('[data-test="github-id"]').contains('ChanYangYu');
      cy.get('[data-test="profile-image"]').should('be.visible');
      cy.react('FeverSharingBar').should('be.visible');
    });
  });

  describe('프로필 페이지 우측 유저 프로필 정보', () => {
    it('자기소개가 정상적으로 출력 및 편집할 수 있다.', () => {
      cy.intercept('PATCH', '/api/user/intro', { statusCode: 200 });
      cy.contains('자기소개').should('be.visible');
      cy.react('ProfileIntroBox').contains('편집').click();
      cy.get('[data-test="edit-intro"]').clear().type('hello guys');
      cy.contains('저장').click();
      cy.contains('hello guys').should('be.exist');
    });

    it('멘티 기술스택이 정상적으로 출력되며 편집할 수 있다.', () => {
      cy.intercept('PUT', '/api/techstack/mentee', { statusCode: 200 });
      cy.contains('기술스택').should('be.visible');
      cy.react('ProfileTechStackBox').contains('편집').click();
      cy.get('[data-test="tech-item"]').first().click();
      cy.get('[data-test="tech-item"]').first().click();
      cy.contains('확인').click();
      cy.get('[data-test="mentee-techstack"]').should('have.length', 2);
    });

    it('그룹 활동내역이 정상 출력된다.', () => {
      cy.get('[data-test="group-activity"]').should('have.length', 2);
    });

    it('멘토 신청후 멘토링 스택이 정상 출력된다.', () => {
      cy.intercept('POST', 'api/mentoring/mentor', { statusCode: 200 });
      cy.intercept('GET', '/api/mentoring/mentor/4', { mentorId: 1 });
      cy.get('[data-test="metor-apply"]').click();
      cy.get('[data-test="tech-item"]').first().click();
      cy.get('[data-test="tech-item"]').first().click();
      cy.contains('확인').click();
      cy.get('[data-test="mentor-techstack"]').should('have.length', 2);
    });

    it('멘토요청 리스트가 정상적으로 출력되며 수락', () => {
      cy.intercept('GET', '/api/mentoring/request/1', {
        fixture: 'profile/mentoring-request.json',
      });
      cy.get('[data-test="mentoring-request-list"]').should('be.exist');
      cy.get('[data-test="mentoring-request-list"]').click();
      cy.get('[data-test="request-container"]').should('have.length', 3);

      cy.intercept('POST', '/api/mentoring/request/accept', { statusCode: 200 });
      cy.intercept('GET', '/api/mentoring/request/1', {
        fixture: 'profile/accept-mentoring-request.json',
      });
      cy.contains('수락').first().click();
      cy.get('[data-test="request-container"]').should('have.length', 2);

      cy.intercept('POST', '/api/mentoring/request/reject/2', { statusCode: 200 });
      cy.intercept('GET', '/api/mentoring/request/1', {
        fixture: 'profile/reject-mentoring-request.json',
      });
      cy.contains('거절').first().click();
      cy.get('[data-test="request-container"]').should('have.length', 1);
    });
  });
});
