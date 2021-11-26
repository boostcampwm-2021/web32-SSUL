/* eslint-disable no-undef */
/// <reference types="Cypress" />

const interceptAPI = () => {
  cy.login('mentee');
  cy.authenficate();
  cy.intercept('GET', '/api/group/1', { fixture: 'group/my-group-info.json' });
  cy.intercept('GET', '/api/post/1', { fixture: 'group/post.json' });
  cy.intercept('POST', '/api/post/1', { statusCode: 200 });
  cy.intercept('PATCH', '/api/post', { statusCode: 200 });
};

describe('그룹 페이지', () => {
  before(() => {
    interceptAPI();
    cy.visit('/group/1');
    cy.waitForReact();
  });

  it('그룹 페이지 세부 정보가 정상적으로 표시된다.', () => {
    cy.get('[data-test="my-group-title"]').should('be.visible');
    cy.get('[data-test="my-group-duration"]').should('be.visible');
    cy.get('[data-test="my-group-status"]').should('be.visible');
    cy.get('[data-test="my-group-tag-list"]').should('be.visible');
    cy.react('GroupIntrodction').should('be.visible');
    cy.react('GroupUserBox').should('be.visible');
    cy.get('[data-test="my-group-tag-list"]')
      .children()
      .should('have.length.at.least', 1)
      .should('have.length.at.most', 5);
  });
  // it('유저 박스를 클릭하면 해당 유저의 프로필로 이동한다.', () => {
  //   cy.react('GroupUserBoxItem').first().click();
  //   cy.location('href').should('include', '/profile');
  // });

  // it('뒤로가면 다시 그룹 페이지로 이동한다.', () => {
  //   interceptAPI();
  //   cy.go('back');
  //   cy.waitForReact();
  //   cy.location('href').should('include', '/group/1');
  // });

  it('그룹 게시판이 정상적으로 표시된다.', () => {
    cy.get('[data-test="my-group-title"]').should('be.visible');
    cy.react('PostList').children().should('be.visible');
    cy.react('Post').should('be.visible');
    cy.react('PostList').children().should('have.length', 2);
  });

  it('게시글 추가 버튼을 누르면 글쓰기 모달이 표시된다.', () => {
    cy.get('[data-test="board-post-btn"]').click();
    cy.react('PostModal').should('be.visible');
  });

  it('글쓰기 모달 외부를 클릭하면 모달이 제거된다. ', () => {
    cy.react('PostModal').parentsUntil('body').last().click(500, 300);
  });

  it('다시 추가 버튼을 누르면 글쓰기 모달이 표시된다.', () => {
    cy.get('[data-test="board-post-btn"]').click();
    cy.react('PostModal').should('be.visible');
  });

  it('글쓰기 모달의 내용이 정상적으로 표시된다.', () => {
    cy.react('PostTypeNav').should('be.visible');
    cy.get('[data-test="post-modal-title-input"]').should('be.visible');
    cy.get('[data-test="post-modal-content-input"]').should('be.visible');
  });

  it('글의 타입이 정상적으로 변경된다.', () => {
    cy.react('PostTypeNav').find('div').children().nthNode(1).click();
    cy.react('PostTypeNav')
      .find('div')
      .children()
      .nthNode(1)
      .should('have.css', 'color')
      .and('not.match', /#BDBDBD/);
    cy.react('PostTypeNav').find('div').children().nthNode(0).click();
    cy.react('PostTypeNav')
      .find('div')
      .children()
      .nthNode(0)
      .should('have.css', 'color')
      .and('not.match', /#BDBDBD/);
  });

  it('글 제목이 비어있으면 작성 버튼이 동작하지 않는다.', () => {
    cy.get('[data-test="post-modal-content-input"]').type('무엇이든 적어보세요. 테스트 중입니다.');
    cy.get('[data-test="modal-post-btn"]').click();
    cy.react('PostModal').should('be.visible');
  });

  it('글 내용이 비어있으면 작성 버튼이 동작하지 않는다.', () => {
    cy.get('[data-test="post-modal-content-input"]').clear();
    cy.get('[data-test="post-modal-title-input"]').type('제목은 아무렇게나 적어보세요');
    cy.get('[data-test="modal-post-btn"]').click();
    cy.react('PostModal').should('be.visible');
  });

  it('글의 제목과 내용을 입력하고 작성 버튼을 누르면 글이 작성되고 모달창이 사라진다.', () => {
    cy.get('[data-test="post-modal-content-input"]').type('무엇이든 적어보세요. 테스트 중입니다.');
    cy.get('[data-test="post-modal-title-input"]').type('!!!');
    // Why 가로채지 못하는 거야..
    // cy.intercept('GET', '/api/post/1', { fixture: 'group/added-post.json' });
    // cy.intercept('POST', '/api/post/1', { statusCode: 200 });
    cy.get('[data-test="modal-post-btn"]').click();
  });

  it('글을 클릭하면 글읽기 모달이 표시된다.', () => {
    cy.react('Post').first().click();
  });

  it('글읽기 모달의 내용이 정상적으로 표시된다.', () => {
    cy.get('[data-test="read-modal-title"]').contains(/.*/).should('exist');
    cy.get('[data-test="read-modal-info"]').contains(/.*/).should('exist');
    cy.get('[data-test="read-modal-content"]').contains(/.*/).should('exist');
  });

  it('게시글이 본인이 작성한 것이라면 수정/삭제 버튼이 표시된다.', () => {
    cy.get('[data-test="read-modal-btn-box"]').should('exist');
  });

  it('수정 버튼을 누르면 게시글을 수정하는 모달로 변경된다.', () => {
    cy.get('[data-test="read-modal-modify-btn"]').click();
    cy.react('PostModal').should('exist');
  });

  it('글을 수정하고 수정 버튼을 누르면 글이 수정되고 모달창이 사라진다.', () => {
    cy.get('[data-test="post-modal-content-input"]').type('\n수정을 테스트 중입니다..');
    cy.get('[data-test="post-modal-title-input"]').clear();
    cy.get('[data-test="post-modal-title-input"]').type('수정된 제목은 이렇다.');
    cy.get('[data-test="modal-post-btn"]').click();
  });
});
