import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import GroupInfoBox from './groupInfoBox';
import ParticipationRequestBox from './ParticipationRequestBox';
import { useParams } from 'react-router';
import { groupHttpClient } from '@api';
import { useAppDispatch } from '@hooks';
import { clearGroupAdminData, setGroupAdminData } from '@store/group/adminSlice';
import { formatDateToString } from '@utils/Date';

interface Param {
  gid: string;
}

function GroupOwnerPage(): JSX.Element {
  const { gid } = useParams<Param>();
  const [fetchState, setFetchState] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchGroupInfo = async () => {
      const groupId = Number(gid);
      const groupInfo = await groupHttpClient.getGroupAdminInfo(Number(gid));
      groupInfo.startAt = formatDateToString(groupInfo.startAt);
      groupInfo.endAt = formatDateToString(groupInfo.endAt);
      dispatch(setGroupAdminData({ groupId, ...groupInfo }));
      setFetchState(true);
    };

    fetchGroupInfo();

    return () => {
      dispatch(clearGroupAdminData());
    };
  }, []);
  return (
    <Container>
      {fetchState ? (
        <>
          <GroupInfoBox />
          <ParticipationRequestBox />
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px auto;
  width: 1100px;
`;

export default GroupOwnerPage;
