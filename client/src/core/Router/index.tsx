import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import GroupRecruitPage from '../../pages/GroupRecruitPage';
import MentorRecruitPage from '../../pages/MentorRecruitPage';
import GroupsPage from '../../pages/GroupsPage';

function Router(): JSX.Element {
  return (
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/recruit/group" component={GroupRecruitPage} exact />
      <Route path="/recruit/mentor" component={MentorRecruitPage} exact />
      <Route path="/groups" component={GroupsPage} exact />
      <Redirect to="/" />
    </Switch>
  );
}

export default Router;
