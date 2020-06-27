import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from './components/header/header'
import { fetchUser } from './redux/actions/index'
import { connect } from 'react-redux'
import Dashboard from './components/dashboard/dashboard';
import Landing from './components/landing/landing';
import SurveyNew from './components/survey-new/survey-new';
function App({ fetchUser }) {

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={Dashboard} />
        <Route exact path="/surveys/new" component={SurveyNew} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(fetchUser())
  }
}

export default connect(null, mapDispatchToProps)(App);
