import React, { Component } from 'react'
import './App.css';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RankingList from './containers/RankingList/RankingList';
import RankingDetail from './containers/RankingDetail/RankingDetail';
import Auth from './containers/Auth/Auth';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Layout>
        </Layout>
        <Switch>
          <Route path={'/rankings'} exact component={RankingList} />
          <Route path={'/rankings/:uuid'} exact component={RankingDetail} />
          {/* ??? should split auth into Login or Register */}
          <Route path={'/auth'} component={Auth}></Route> 
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
