import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useLoader } from '@hooks';
import { groupHttpClient } from '@api';
import { SimpleGroupCard } from '@types';
import SimpleGroupCardList from './SimpleGroupCardList';
import { TextSwitchButton } from '@components';
import qs from 'qs';
import { ApplyState, GroupState, LeftOrRight, MentorOrMentee } from '@constants/enums';
import {
  APPLIED_GROUP,
  OWNED_GROUP,
  CONTINUED_APPLY_GROUP,
  FINISHED_APPLY_GROUP,
} from '@constants/consts';

interface MyGroups {
  MENTOR: SimpleGroupCard[];
  MENTEE: SimpleGroupCard[];
}

function MyGroupPage(): JSX.Element {
  const [role, setRole] = useState<MentorOrMentee>(MentorOrMentee.MENTEE);
  const [applyedGroups, setApplyedGroups] = useState<SimpleGroupCard[]>([]);
  const [ownGroups, setOwnGroups] = useState<SimpleGroupCard[]>([]);
  const [myGroups, setMyGroups] = useState<MyGroups>({ MENTOR: [], MENTEE: [] });
  const [toggleLoader, isLoading] = useLoader();

  const fetchApplyedGroups = async (state: ApplyState) => {
    const simpleGroupCardInfos = await groupHttpClient.getApplyedGroups(state);
    setApplyedGroups(simpleGroupCardInfos);
  };

  const fetchMyOwnGroups = async () => {
    const simpleGroupCardInfos = await groupHttpClient.getOwnSimpleGroups();
    setOwnGroups(simpleGroupCardInfos);
  };

  const fetchMyGroups = async () => {
    const menteeGroups = await groupHttpClient.getMyGroups(
      qs.stringify(
        {
          type: MentorOrMentee.MENTEE,
        },
        { addQueryPrefix: true },
      ),
    );
    const mentorGroups = await groupHttpClient.getMyGroups(
      qs.stringify(
        {
          type: MentorOrMentee.MENTOR,
        },
        { addQueryPrefix: true },
      ),
    );
    setMyGroups({
      MENTOR: mentorGroups,
      MENTEE: menteeGroups,
    });
  };

  useEffect(() => {
    const fetchDataAsMentee = async () => {
      try {
        await fetchApplyedGroups(ApplyState.PENDING);
        await fetchMyOwnGroups();
        await fetchMyGroups();
        toggleLoader(false);
      } catch (err) {
        console.error(err);
      }
    };

    toggleLoader(true);
    fetchDataAsMentee();
  }, []);

  const selectedMyGroups = (status: GroupState[]) => {
    return myGroups[role].filter((group) => status.includes(group.status as GroupState));
  };

  if (isLoading) return <></>;
  return (
    <Container>
      <Header>
        <TextSwitchButton
          defaultSide={LeftOrRight.LEFT}
          leftText="멘티"
          rightText="멘토"
          onLeftClick={() => setRole(MentorOrMentee.MENTEE)}
          onRightClick={() => setRole(MentorOrMentee.MENTOR)}
        />
      </Header>
      <GroupCardListContainer>
        {role === MentorOrMentee.MENTEE && (
          <>
            <SimpleGroupCardList
              title={APPLIED_GROUP}
              groups={applyedGroups}
              isClickable={false}
            ></SimpleGroupCardList>
            <SimpleGroupCardList
              title={OWNED_GROUP}
              groups={ownGroups}
              isClickable={true}
            ></SimpleGroupCardList>
          </>
        )}
        <SimpleGroupCardList
          title={CONTINUED_APPLY_GROUP}
          groups={selectedMyGroups([GroupState.DOING, GroupState.READY])}
          isClickable={true}
        ></SimpleGroupCardList>
        <SimpleGroupCardList
          title={FINISHED_APPLY_GROUP}
          groups={selectedMyGroups([GroupState.END])}
          isClickable={true}
        ></SimpleGroupCardList>
      </GroupCardListContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 32px;
  height: 60px;
`;

const GroupCardListContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 80vh;
`;

export default MyGroupPage;