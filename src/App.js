import React, { Component } from 'react'
import './App.css';
import Layout from './components/Layout/Layout';
import { Switch, Route } from 'react-router-dom';
import RankingList from './containers/RankingList/RankingList';
import RankingDetail from './containers/RankingDetail/RankingDetail';
import Login from './containers/Auth/Login/Login';
import Register from './containers/Auth/Register/Register';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './containers/Alerts/Alerts';
import { loadUser } from './store/actions/auth';
import store from './store/store';

const alertOptions = {
  timeout: 3000,
  position: 'top center'
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
        <Switch>
          <Route path={'/rankings'} exact component={RankingList} />
          <Route path={'/rankings/:uuid'} exact component={RankingDetail} />
          <Route path={'/login'} component={Login}></Route>
          <Route path={'/register'} component={Register}></Route>
        </Switch>
      </AlertProvider>
    );
  }
}

export default App;
