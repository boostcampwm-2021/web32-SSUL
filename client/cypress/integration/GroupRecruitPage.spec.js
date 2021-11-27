/* eslint-disable no-undef */

describe('그룹 검색', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/silent-refresh', { fixture: 'silent-refresh.json' });
    cy.intercept('GET', '/api/category', { fixture: 'category.json' });
    cy.intercept('GET', '/api/techstack', { fixture: 'techstack.json' });
    cy.intercept('GET', '/api/group', { fixture: 'recruit/all.json' });
    cy.intercept('GET', '/api/group/?page=1', { fixture: 'recruit/all.json' });
    cy.visit('/recruit/group');
    cy.waitForReact();
  });

  it('카테고리 선택 필터링 기능이 정상적으로 동작한다.', () => {
    cy.react('CategoryList').children().should('have.length', 8);
    cy.intercept('GET', '/api/group/?page=1&category=1', { fixture: 'recruit/category-1.json' });
    cy.contains('대외활동').click();
    cy.waitForReact();
    cy.react('GroupCardHeader').first().contains('testgroup8');
    cy.react('GroupCardHeader').last().contains('testgroup96');

    cy.intercept('GET', '/api/group/?page=1&category=3', { fixture: 'recruit/category-3.json' });
    cy.contains('스터디').click();
    cy.waitForReact();
    cy.react('GroupCardHeader').first().contains('testgroup2');
    cy.react('GroupCardHeader').last().contains('testgroup90');
    cy.contains('스터디').click();
  });

  it('그룹이름 검색 필터링 기능이 정상적으로 동작한다.', () => {
    cy.react('SearchFilterHeader').find('input').type('group2');
    cy.intercept('GET','/api/group/?page=1&name=group2',{fixture: 'recruit/name-group2.json'});
    cy.get('[data-test="search-btn"]').first().click();
    cy.waitForReact();
    cy.react('GroupCardHeader').first().contains('testgroup2');
    cy.react('GroupCardHeader').last().contains('testgroup29');

    cy.react('SearchFilterHeader').find('input').clear().type('group9');
    cy.intercept('GET','/api/group/?page=1&name=group9',{fixture: 'recruit/name-group9.json'});
    cy.get('[data-test="search-btn"]').first().click();
    cy.waitForReact();
    cy.react('GroupCardHeader').first().contains('testgroup9');
    cy.react('GroupCardHeader').last().contains('testgroup99');

    cy.react('SearchFilterHeader').find('input').clear();
    cy.get('[data-test="search-btn"]').first().click();
  });

  it('기술스택 검색 필터링 기능이 정상적으로 동작한다.', () => {
    cy.intercept('GET','/api/group/?page=1&techstack=typescript',{fixture: 'recruit/techstack-typescript.json'});
    cy.react('SearchFilterTechSection').find('input').type('typescript');
    cy.react('SearchFilterTechSection').contains('typescript').click();
    cy.waitForReact();
    cy.react('GroupCardHeader').first().contains('testgroup1');
    cy.react('GroupCardHeader').last().contains('testgroup26');
    cy.get('[data-test="erase-btn"]').first().click();

    cy.react('SearchFilterTechSection').find('input').clear().type('C++');
    cy.intercept('GET','/api/group/?page=1&techstack=C%2B%2B',{fixture: 'recruit/techstack-C++.json'});
    cy.react('SearchFilterTechSection').contains('C++').click();
    cy.waitForReact();
    cy.react('GroupCardHeader').first().contains('testgroup2');
    cy.react('GroupCardHeader').last().contains('testgroup27');
    cy.get('[data-test="erase-btn"]').first().click();
  });
});

describe('그룹 카드', () => {
  it('그룹 카드의 내용이 정상적으로 출력된다.', () => {
    cy.react('GroupCardHeader').first().should('be.exist');
    cy.react('GroupCardStatus').first().should('be.exist');
    cy.react('GroupApplyButton').first().should('be.exist');
    cy.react('GroupTechStackList').first().children().should('have.lengthOf.greaterThan', 3);
  });

  it('그룹 카드 상세보기 모달의 내용이 정상적으로 출력된다.', () => {
    cy.intercept('GET', '/api/group/role/1', { statusCode: 200 });
    cy.react('GroupApplyButton').first().find('button').click();
    cy.react('GroupDetailHeader').should('be.exist');
    cy.react('GroupDetailTitle').should('be.exist');
    cy.react('GroupDetailStatus').should('be.exist');
    cy.react('GroupDetailFooter').should('be.exist');
    cy.contains('신청').should('be.exist');
    cy.get('body').click('topLeft');
  });

  it('그룹 카드 상세보기 모달 하단이 조건에 따라 변경되어 출력된다.', () => {
    cy.intercept('GET', '/api/group/role/12', { type: 'OWNER' });
    cy.react('GroupApplyButton').last().find('button').click();
    cy.contains('그룹장인 그룹입니다.').should('be.exist');
    cy.get('body').click('topLeft');

    cy.intercept('GET', '/api/group/role/12', { type: 'MENTOR' });
    cy.react('GroupApplyButton').last().find('button').click();
    cy.contains('멘토인 그룹입니다.').should('be.exist');
    cy.get('body').click('topLeft');

    cy.intercept('GET', '/api/group/role/12', { type: 'MENTEE' });
    cy.react('GroupApplyButton').last().find('button').click();
    cy.contains('멘티인 그룹입니다.').should('be.exist');
    cy.get('body').click('topLeft');
  });
});

describe('페이지네이션', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/group/?page=*', { fixture: 'recruit/all.json' });
  });

  it('다음 페이지 버튼을 누르면 다음 페이지의 요소 중 첫번째로 이동한다.', () => {
    cy.react('Pagination').children().should('have.length', 6);
    cy.get('[data-test="next-btn"]').should('be.exist');

    cy.get('[data-test="next-btn"]').click();
    cy.get('[data-test="selected-btn"]').contains('6');

    cy.get('[data-test="next-btn"]').click();
    cy.get('[data-test="selected-btn"]').contains('11');
    cy.get('[data-test="next-btn"]').should('not.be.exist');
  });

  it('이전 페이지 버튼을 누르면 다음 페이지의 요소 중 마지막으로 이동한다.', () => {
    cy.react('Pagination').children().should('have.length', 4);
    cy.get('[data-test="prev-btn"]').should('be.exist');

    cy.get('[data-test="prev-btn"]').click();
    cy.get('[data-test="selected-btn"]').contains('10');

    cy.get('[data-test="prev-btn"]').click();
    cy.get('[data-test="selected-btn"]').contains('5');
    cy.get('[data-test="prev-btn"]').should('not.be.exist');
  });

  it('페이지 번호를 클릭하면 해당 요소가 선택된다.', () => {
    cy.react('Pagination').children().first().click();
    cy.react('Pagination')
      .children()
      .first()
      .and((button) => {
        expect(button).to.have.css('background-color', 'rgb(0, 197, 170)');
      });
  });
});
