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

function Router(): JSX.Element {
  return (
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/recruit/group" component={GroupRecruitPage} exact />
      <Route path="/recruit/mentor" component={MentorRecruitPage} exact />
      <Route path="/group/status" component={GroupStatusPage} />
      <Route path="/group/owner" component={GroupOwnerPage} />
      <Route path="/group/create" component={GroupCreatePage} />
      <Route path="/group/evaluate" component={EvaluateGroupPage} />
      <Route path="/group/:id" component={GroupsPage} exact />
      <Route path="/chat/list" component={ChatListPage} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/profile/:id" component={ProfilePage} />
      <Route path="/auth/callback" component={AuthCallback} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Router;
