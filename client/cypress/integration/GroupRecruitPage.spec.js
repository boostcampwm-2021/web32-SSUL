/* eslint-disable no-undef */

describe('그룹 검색', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/silent-refresh', { fixture: 'silent-refresh.json' });
    cy.intercept('GET','/api/category',{fixture: 'category.json'});
    cy.intercept('GET','/api/techstack',{fixture: 'techstack.json'});
    cy.intercept('GET','/api/group',{fixture: 'recruit/all.json'});
    cy.intercept('GET','/api/group/?page=1',{fixture: 'recruit/all.json'});
    cy.visit('/recruit/group');
    cy.waitForReact();
  });

  it('카테고리 선택 필터링 기능이 정상적으로 동작한다.', () => {
    cy.react('CategoryList').children().should('have.length', 8);
    cy.intercept('GET','/api/group/?page=1&category=1',{fixture: 'recruit/category-1.json'});
    cy.contains('대외활동').click();
    
    cy.react('GroupCardList').children().should('have.length', 5);
    cy.intercept('GET','/api/group/?page=1&category=3',{fixture: 'recruit/category-3.json'});
    cy.contains('스터디').click();
    cy.react('GroupCardList').children().should('have.length', 3);
    cy.contains('스터디').click();
  });

  it('그룹이름 검색 필터링 기능이 정상적으로 동작한다.', () => {
    cy.react('SearchFilterHeader').find('input').type('Android');
    cy.intercept('GET','/api/group/?page=1&name=Android',{fixture: 'recruit/name-android.json'});
    cy.get('[data-test="search-btn"]').first().click();

    cy.react('GroupCardList').children().should('have.length', 1);
    cy.react('SearchFilterHeader').find('input').clear().type('test');
    cy.intercept('GET','/api/group/?page=1&name=test',{fixture: 'recruit/name-test.json'});
    
    cy.get('[data-test="search-btn"]').first().click();
    cy.react('GroupCardList').children().should('have.length', 6);
    cy.react('SearchFilterHeader').find('input').clear();
    cy.get('[data-test="search-btn"]').first().click();
    cy.react('GroupCardList').children().should('have.length', 9);
  });

  it('기술스택 검색 필터링 기능이 정상적으로 동작한다.', () => {
    cy.intercept('GET','/api/group/?page=1&techstack=typescript',{fixture: 'recruit/techstack-typescript.json'});
    cy.react('SearchFilterTechSection').find('input').type('typescript');
    cy.react('SearchFilterTechSection').contains('typescript').click();
    cy.react('GroupCardList').children().should('have.length', 4);

    cy.get('[data-test="erase-btn"]').first().click();
    cy.react('SearchFilterTechSection').find('input').clear().type('C++');
    cy.intercept('GET','/api/group/?page=1&techstack=C%2B%2B',{fixture: 'recruit/techstack-C++.json'});
    cy.react('SearchFilterTechSection').contains('C++').click();

    cy.react('GroupCardList').children().should('have.length', 6);
    cy.get('[data-test="erase-btn"]').first().click();
    cy.react('SearchFilterTechSection').find('input').clear();
    cy.react('GroupCardList').children().should('have.length', 9);
  });
});

describe('그룹 카드', () => {
  it('그룹 카드의 내용이 정상적으로 출력된다.', () => {
    cy.react('GroupCardHeader').first().should('include.text', 'testgroup1');
    cy.react('GroupCardStatus').first().should('include.text', '이유찬');
    cy.react('GroupTechStackList').first().children().should('have.lengthOf.greaterThan', 3);

    cy.react('GroupCardHeader').last().should('include.text', 'Android');
    cy.react('GroupCardStatus').last().should('include.text', '유찬양');
    cy.react('GroupTechStackList').last().children().should('have.length', 1);
  });

  it('그룹 카드 상세보기 모달의 내용이 정상적으로 출력된다.', () => {
    cy.intercept('GET', '/api/group/role/14', { statusCode: 200 });
    cy.react('GroupApplyButton').last().find('button').click();   
    cy.react('GroupDetailHeader').should('include.text', 'Android');
    cy.react('GroupDetailStatus').should('include.text', '유찬양');
    cy.contains('신청').should('be.exist');
    cy.get('body').click('topLeft');
  });

  it('그룹 카드 상세보기 모달 하단이 조건에 따라 변경되어 출력된다.', () => {
    cy.intercept('GET', '/api/group/role/14', { type: 'OWNER' });
    cy.react('GroupApplyButton').last().find('button').click();
    cy.contains('그룹장인 그룹입니다.').should('be.exist');
    cy.get('body').click('topLeft');

    cy.intercept('GET', '/api/group/role/1', { type: 'MENTOR' });
    cy.react('GroupApplyButton').first().find('button').click();
    cy.contains('멘토인 그룹입니다.').should('be.exist');
    cy.get('body').click('topLeft');

    cy.intercept('GET', '/api/group/role/1', { type: 'MENTEE' });
    cy.react('GroupApplyButton').first().find('button').click();
    cy.contains('멘티인 그룹입니다.').should('be.exist');
    cy.get('body').click('topLeft');
  });
});
