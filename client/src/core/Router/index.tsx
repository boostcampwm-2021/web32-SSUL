import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Auth as AuthCallback } from '@components';
import ExceptionPage from '@pages/ExceptionPage';
import EvaluateGroupPage from '@pages/EvaluateGroupPage';
import ChatListPage from '@pages/ChatListPage';
import ChatPage from '@pages/ChatPage';
import { AuthGuardRoute, GroupBelongGuardRoute, GroupOwnerGuardRoute } from './routes';

const MainPage = lazy(() => import('@pages/MainPage'));
const GroupRecruitPage = lazy(() => import('@pages/GroupRecruitPage'));
const MentorRecruitPage = lazy(() => import('@pages/MentorRecruitPage'));
const GroupsPage = lazy(() => import('@pages/GroupsPage'));
const MyGroupPage = lazy(() => import('@pages/MyGroupPage'));
const GroupOwnerPage = lazy(() => import('@pages/GroupOwnerPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));
const GroupCreatePage = lazy(() => import('@pages/GroupCreatePage'));

function Router(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/recruit/group" component={GroupRecruitPage} exact />
        <Route path="/recruit/mentor" component={MentorRecruitPage} exact />
        <AuthGuardRoute path="/group/my" component={MyGroupPage} />
        <GroupOwnerGuardRoute path="/group/owner/:gid" component={GroupOwnerPage} />
        <AuthGuardRoute path="/group/create" component={GroupCreatePage} />
        <GroupBelongGuardRoute path="/group/evaluate" component={EvaluateGroupPage} />
        <GroupBelongGuardRoute path="/group/:gid" component={GroupsPage} exact />
        <Route path="/chat/list" component={ChatListPage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/profile/:id" component={ProfilePage} />
        <Route path="/auth/callback" component={AuthCallback} />
        <Route path="*" component={ExceptionPage} />
      </Switch>
    </Suspense>
  );
}

export default React.memo(Router);
