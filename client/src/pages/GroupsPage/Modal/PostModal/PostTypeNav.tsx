import React from 'react';
import styled from '@emotion/styled';
import { PostTypeEnum } from '@constants/enums';

interface PostTypeButton {
  type: string;
  content: string;
  color: string;
}

interface Props {
  selectedType: string;
  handlePostNavItemClick: (type: string) => () => void;
}

const typeButtons: PostTypeButton[] = [
  { type: PostTypeEnum.NORMAL, content: '일반', color: 'Green' },
  { type: PostTypeEnum.NOTICE, content: '공지', color: 'Red' },
];

function PostTypeNav({ selectedType, handlePostNavItemClick }: Props): JSX.Element {
  const typeButtonItems = typeButtons.map((item, idx) =>
    item.type === selectedType ? (
      <SelectedTypeButton color={item.color} key={idx}>
        {item.content}
      </SelectedTypeButton>
    ) : (
      <NoSelectedTypeButton key={idx} onClick={handlePostNavItemClick(item.type)}>
        {item.content}
      </NoSelectedTypeButton>
    ),
  );

  return (
    <Container>
      <TypeButtonBar>{typeButtonItems}</TypeButtonBar>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 4px;
`;
const TypeButtonBar = styled.div``;

type TypeButtonProps = {
  color?: string;
};

const TypeButton = styled.span<TypeButtonProps>`
  font-size: 0.825rem;
  font-weight: 600;
  margin-right: 6px;
  cursor: pointer;
`;

const SelectedTypeButton = styled(TypeButton)`
  color: ${(props) => {
    const { children } = props;
    switch (children) {
      case '일반':
        return props.theme.Green;
      case '공지':
        return props.theme.Red;
    }
  }};
`;

const NoSelectedTypeButton = styled(TypeButton)`
  color: ${(props) => props.theme.Gray4};
`;
export default PostTypeNav;
