/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { VerticalLayout } from '@styles';
import GroupInfo from './GroupInfo';
import GroupBoard from './GroupBoard';
import SettingButton from './SettingButton';
import GroupPageModal from './Modal';
import { useAppSelector, useAppDispatch } from '@hooks';
import { selectGroupModalState } from '@store/util/Slice';
import { setGroupDetail } from '@store/group/detailSlice';
import { setPosts } from '@store/group/postSlice';
import { groupHttpClient, postHttpClient } from '@api';
import { useParams, useHistory } from 'react-router-dom';

interface Param {
  gid: string;
}

function GroupsPage(): JSX.Element {
  const history = useHistory();
  const { gid } = useParams<Param>();
  const dispatch = useAppDispatch();
  const modalType = useAppSelector(selectGroupModalState);

  const fetchGroupDetail = async () => {
    try {
      const groupDetailData = await groupHttpClient.getGroupDetail(Number(gid));
      dispatch(setGroupDetail(groupDetailData));
    } catch (e: any) {
      console.log(e.description);
      // TODO: 404 Page Redirect
      history.push('/');
    }
  };

  const fetchGroupPosts = async () => {
    try {
      const groupPostData = await postHttpClient.getGroupPosts(Number(gid));
      dispatch(setPosts(groupPostData));
    } catch (e: any) {
      // TODO: 404 Page Redirect
      console.log(e.description);
    }
  };

  useEffect(() => {
    fetchGroupDetail();
    fetchGroupPosts();
  }, []);

  return (
    <Container>
      <SettingButton />
      <GroupInfo />
      <GroupBoard />
      <GroupPageModal type={modalType} />
    </Container>
  );
}

const Container = styled(VerticalLayout)`
  position: relative;
  padding: 48px;
  height: max-content;
`;

export default GroupsPage;
