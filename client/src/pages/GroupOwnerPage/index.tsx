import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import GroupInfoBox from './groupInfoBox';
import ParticipationRequestBox from './ParticipationRequestBox';
import { useParams } from 'react-router';
import { groupOwnerHttpClient } from '@api';
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

  const fetchGroupInfo = async (groupId: number) => {
    const groupInfo = await groupOwnerHttpClient.getGroupAdminInfo(groupId);
    groupInfo.startAt = formatDateToString(groupInfo.startAt);
    groupInfo.endAt = formatDateToString(groupInfo.endAt);
    dispatch(setGroupAdminData({ groupId, ...groupInfo }));
  };

  const fetchApplyList = async (groupId: number) => {
    const requestList = await groupOwnerHttpClient.getApplyGroupList(groupId);
    dispatch(setGroupAdminData({ requestList }));
  };

  useEffect(() => {
    (async () => {
      const groupId = Number(gid);
      try {
        await Promise.all([fetchGroupInfo(groupId), fetchApplyList(groupId)]);
        setFetchState(true);
      } catch (e) {
        location.href = '/';
      }
    })();
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
