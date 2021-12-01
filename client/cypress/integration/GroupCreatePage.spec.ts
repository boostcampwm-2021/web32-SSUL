/* eslint-disable no-undef */

context('그룹생성 페이지',() =>{
  const interceptAPI = () =>{
    cy.intercept('GET', '/api/auth', {statusCode: 200});

  }
  before(() => {
    interceptAPI();
    cy.set();
    cy.ignoreAlarm();
    cy.visit('/group/create');
    cy.waitForReact();
  });

  beforeEach(() => {
    cy.ignoreAlarm();
  })

  describe('카테고리 선택', () => {
    it('카테고리를 선택하지 않고 다음버튼을 누르는 경우 하단에 메세지가 뜬다.', () => {
      cy.react('CustomButton').contains('다음').click();
      cy.contains('필수 입력사항을 입력해주세요!');
    });
  
    it('카테고리가 정상적으로 출력되어야 한다.', () => {
      cy.react('CategoryItem').should('have.length', '8');
    });
  
    it('카테고리 클릭시 선택되어야 한다.', () => {
      cy.react('CategoryItem').first().click();
      cy.react('CategoryItem', { props: { clicked: true } }).contains('대외활동');
    });
  
    it('카테고리 선택 후 다음버튼 클릭시 인원선택 화면으로 이동한다', () => {
      cy.react('CustomButton').contains('다음').click();
      cy.contains('그룹의 정원');
    });
  
    it('이전 버튼으로 돌아올 경우 이전 상태값이 저장되어 있다.', () => {
      cy.react('CustomButton').contains('이전').click();
      cy.react('CategoryItem', { props: { clicked: true } }).contains('대외활동');
      cy.react('CustomButton').contains('다음').click();
    });
  });
  
  describe('그룹 정원 선택', () => {
    it('그룹 정원의 최소값은 1, 최댓값은 30 이다.', () => {
      cy.get('input[type=range]').invoke('val', 0).trigger('change');
      cy.contains('1');
  
      cy.get('input[type=range]').invoke('val', 40).trigger('change');
      cy.contains('30');
    });
  
    it('다음버튼 클릭시 그룹 정보 입력 화면으로 이동한다', () => {
      cy.react('CustomButton').contains('다음').click();
      cy.react('GroupInfoInput').should('exist');
    });
  
    it('이전 버튼으로 돌아올 경우 이전 상태값이 저장되어 있다.', () => {
      cy.react('CustomButton').contains('이전').click();
      cy.contains('30');
      cy.react('CustomButton').contains('다음').click();
    });
  });
  
  describe('그룹 정보 입력', () => {
    it('그룹정보를 입력하지 않고 다음버튼을 누르는 경우 하단에 메세지가 뜬다.', () => {
      cy.react('CustomButton').contains('다음').click();
      cy.contains('필수 입력사항을 입력해주세요!');
  
      cy.get('[data-test=group-name]').type('Group Title');
      cy.react('CustomButton').contains('다음').click();
      cy.contains('필수 입력사항을 입력해주세요!');
  
      cy.get('[data-test=group-name]').clear();
      cy.get('[data-test=group-intro]').type('Group Intro');
      cy.react('CustomButton').contains('다음').click();
      cy.contains('필수 입력사항을 입력해주세요!');
  
      cy.get('[data-test=group-name]').type('Group Title');
    });
  
    it('다음버튼 클릭시 시작,종료일 선택 화면으로 이동한다', () => {
      cy.react('CustomButton').contains('다음').click();
      cy.react('AntDatePicker').should('exist');
    });
  
    it('이전 버튼으로 돌아올 경우 이전 상태값이 저장되어 있다.', () => {
      cy.react('CustomButton').contains('이전').click();
      cy.react('GroupInfoInput').first().should('have.value', 'Group Title');
      cy.react('GroupInfoInput').last().should('have.value', 'Group Intro');
      cy.react('CustomButton').contains('다음').click();
    });
  });
  
  describe('시작일, 종료일 입력', () => { 
    it('날짜를 입력하지 않고 다음버튼을 누르는 경우 하단에 메세지가 뜬다.', () => {
      cy.react('CustomButton').contains('다음').click();
      cy.contains('필수 입력사항을 입력해주세요!');
    });
  
    it('날자를 입력하면 시작일과 종료일이 표시된다.', () => {
      cy.react('AntDatePicker').click();
      cy.get('.ant-picker-cell').not('.ant-picker-cell-disabled').first().click();
      cy.get('.ant-picker-cell').not('.ant-picker-cell-disabled').last().click();
  
      cy.get('input').first().should('not.have.value',undefined);
      cy.get('input').last().should('not.have.value',undefined);
    });
  
    it('다음버튼 클릭시 기술스택 선택 화면으로 이동한다', () => {
      cy.react('CustomButton').contains('다음').click();
    });
  
    it('이전 버튼으로 돌아올 경우 이전 상태값이 저장되어 있다.', () => {
      cy.react('CustomButton').contains('이전').click();
      cy.get('input').first().should('not.have.value',undefined);
      cy.get('input').last().should('not.have.value',undefined);
      cy.react('CustomButton').contains('다음').click();
    });
  });
  
  describe('그룹 기술스택 입력', () => {
    it('그룹 기술스택 입력에서는 완료버튼이 존재해야 한다.', () => {
      cy.contains('완료');
    });
  
    it('기술스택을 입력하지 않고 완료 버튼을 누르는 경우 하단에 메세지가 뜬다.', () => {
      cy.react('CustomButton').contains('완료').click();
      cy.contains('필수 입력사항을 입력해주세요!');
    });
  
    it('기술스택은 최대 10개만 출력되어야 한다.', () => {
      cy.react('TechStackList').children().should('have.length', 10);
    });
  
    it('기술스택은 검색을 할 수 있다.', () => {
      cy.get('[data-test=search-bar]').type('javascript');
      cy.get('[data-test=tech-item]').should('have.length', 1);
      cy.get('[data-test=search-bar]').clear();
      cy.get('[data-test=tech-item]').should('have.length', 10);
    });
  
    it('기술스택을 선택할 경우 선택된 기술스택이 표시된다.', () => {
      cy.get('[data-test=tech-item]').first().click();
      cy.get('[data-test=tech-item]').first().next().click();
      cy.get('[data-test=tech-item]').first().click();
    });
  
    it('선택된 기술스택은 제거할 수 있어야한다.', () => {
      cy.get('[data-test=erase-button]').first().click();
      cy.get('[data-test=erase-button]').last().click();
    });
  
    it('기술선택 후 완료버튼을 누르면 그룹생성 페이지를 벗어난다.', () => {
      cy.intercept('POST', 'api/group', { statusCode: 200 });
      cy.set();
      cy.react('CustomButton').contains('완료').click();
      cy.url().should('not.include', '/group/create');
    });
  });  
})


