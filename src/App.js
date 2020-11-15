import React, { Component } from 'react'
import './App.css';
import Layout from './components/Layout/Layout';
import { Switch, Route } from 'react-router-dom';
import RankingList from './containers/RankingList/RankingList';
import RankingDetail from './containers/RankingDetail/RankingDetail';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './containers/Alerts/Alerts';
import { loadUser } from './store/actions/auth';
import store from './store/store';
import Logout from './containers/Auth/Logout/Logout';
import CreateRanking from './containers/CreateRanking/CreateRanking';
import PrivateList from './containers/RankingList/PrivateList/PrivateList';
import PrivateRoute from './components/Utils/PrivateRoute';
import { connect } from 'react-redux';
import EditRanking from './containers/EditRanking/EditRanking';
import UserDetail from './containers/Users/UserDetail/UserDetail';
import FollowingList from './containers/RankingList/FollowingList/FollowingList';
import CurrentProfile from './containers/Users/CurrentProfile/CurrentProfile';
import SearchPage from './containers/Search/SearchPage';
import { Redirect } from 'react-router-dom';

const alertOptions = {
  timeout: 3000,
  containerStyle: {
    zIndex: 1000
  }
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <AlertProvider
        template={AlertTemplate}
        {...alertOptions}>
        <Alerts />
        <Layout>
        </Layout>
        <div className={'Container'}>
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to="/rankings/hottest/days=3" />
            )} />
            <PrivateRoute isAuth={this.props.isAuth} path={'/create-ranking'} exact component={CreateRanking} />
            <Route path={'/rankings/:type/days=:days'} exact component={RankingList} />
            <Route path={'/rankings/:uuid'} exact component={RankingDetail} />
            <Route path={'/user/:username'} exact component={UserDetail} />
            <Route path={'/search/:query'} exact component={SearchPage} />
            <PrivateRoute isAuth={this.props.isAuth} path={'/private'} exact component={PrivateList} />
            <PrivateRoute isAuth={this.props.isAuth} path={'/rankings/:uuid/edit'} exact component={EditRanking} />
            <PrivateRoute isAuth={this.props.isAuth} path={'/followed'} exact component={FollowingList} />
            <PrivateRoute isAuth={this.props.isAuth} path={'/profile'} exact component={CurrentProfile} />
            <Route path={'/logout'} component={Logout}></Route>
          </Switch>
        </div>
      </AlertProvider>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(App);
