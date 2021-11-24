import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from '@pages/MainPage';
import GroupRecruitPage from '@pages/GroupRecruitPage';
import MentorRecruitPage from '@pages/MentorRecruitPage';
import GroupsPage from '@pages/GroupsPage';
import GroupStatusPage from '@pages/GroupStatusPage';
import GroupOwnerPage from '@pages/GroupOwnerPage';
import EvaluateGroupPage from '@pages/EvaluateGroupPage';
import ChatListPage from '@pages/ChatListPage';
import ChatPage from '@pages/ChatPage';
import ProfilePage from '@pages/ProfilePage';
import { Auth as AuthCallback } from '@components';
import GroupCreatePage from '../../pages/GroupCreatePage';
import { AuthGuardRoute, GroupBelongGuardRoute, GroupOwnerGuardRoute } from './routes';

function Router(): JSX.Element {
  return (
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/recruit/group" component={GroupRecruitPage} exact />
      <Route path="/recruit/mentor" component={MentorRecruitPage} exact />
      <Route path="/group/status" component={GroupStatusPage} />
      <GroupOwnerGuardRoute path="/group/owner/:gid" component={GroupOwnerPage} />
      <AuthGuardRoute path="/group/create" component={GroupCreatePage} />
      <GroupBelongGuardRoute path="/group/evaluate" component={EvaluateGroupPage} />
      <GroupBelongGuardRoute path="/group/:gid" component={GroupsPage} exact />
      <Route path="/chat/list" component={ChatListPage} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/profile/:id" component={ProfilePage} />
      <Route path="/auth/callback" component={AuthCallback} />
      <Redirect to="/" />
    </Switch>
  );
}

export default React.memo(Router);
