import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './components';
import MainPage from './pages/MainPage';
import GroupRecruitPage from './pages/GroupRecruitPage';
import MentorRecruitPage from './pages/MentorRecruitPage';
import GroupsPage from './pages/GroupsPage';

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/recruit/group" component={GroupRecruitPage} exact />
        <Route path="/recruit/mentor" component={MentorRecruitPage} exact />
        <Route path="/groups" component={GroupsPage} exact />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
